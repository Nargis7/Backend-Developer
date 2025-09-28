import mongoose, {Schema} from "mongoose";
import jswt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName:{
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary public_id
      required: true,
    },
    coverImage: {
      type: String, //cloudinary public_id
    },
    watchHistory:  [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      }
    ],
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    refreshToken: {
      type: String,
    },
  },
  {
     timestamps: true
     }
  
)

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next(); //if password is not modified
  this.password = await bcrypt.hash(this.password, 10); //rounds
  next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = async function () {
  return jswt.sign(
    { 
      _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '1d'
  }
  );
}

userSchema.methods.generateAccessToken = function () {
  return jswt.sign(
    { 
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      avatar: this.avatar, 
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
  }
  );
}

export const User = mongoose.model('User', userSchema);