import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index: true, //helps for faster access
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //Cloudinary URL
      required: true,
    },

    coverImage: {
      type: String, //Cloudinary URL
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//pre_hook middleware
//events-available => validate, save, remove, updateOne, deleteOne, deleteMany, findOneAndDelete, findOneAndRemove, findOneAndUpdate, insertMany, init, validate, remove, save
//don't write callback function with arrow function
// () => {} - in arrow func we don't have this reference
// and we need the context here
userSchema.pre("save", async function (next) {
  // 10 is the number of rounds
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  await bcrypt.compare(password, this.password);
};

// JWT Tokens
userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
