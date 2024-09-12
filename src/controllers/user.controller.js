import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  //check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  const { fullName, email, userName, password } = req.body;
  console.log("email: ", email);

  // if (fullName === "") {
  //     throw new ApiError(400, "fullname is required")
  // }

  if (
    [fullName, email, userName, password].some((field) => fileld?.trim() === "")
  ) {
    throw new ApiError(200, "All fields are required");
  }

  // if you want to take multiple objects to check
  // user, you can use "$or"
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //multer gives access to req.files
  // gives path of avatar file
  // we need its first property
  // 1st prop ke andar ek object milta ha jo optional ha
  // we may get it or not
  // we write avatar[0]
  // which give .path - gives proper path to the file
  // jo multer ne upload kia ha
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  // _id automatically given by mongoDB
  // .select - kya nhi chahiye -> "-field1 -field2"
  const createdUser = User.findById(user._id).select("-password -refreshToken");

  if (createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //   return res.status(201).json({createdUser})

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd succesfully"));
});

export { registerUser };
