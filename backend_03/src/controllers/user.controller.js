import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  console.log("email: ", email);
  console.log("req.body:", req.body); // ✅ Added for debugging
  console.log("req.files:", req.files); // ✅ Added for debugging to check file upload

  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [
      { email },
      { username }
    ]
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }

  // ✅ Corrected: Added optional chaining to prevent error if file not sent
  const avatarLocalPath = req.files?.avatar?.[0]?.path; 
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path || null; // ✅ Safe fallback

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null; // ✅ Avoid error if coverImage is missing

  if (!avatar?.url) { // ✅ Safer check
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Error creating user");
  }

  return res.status(201).json(new ApiResponse(200, "User created successfully", createdUser));
});

export { registerUser };
