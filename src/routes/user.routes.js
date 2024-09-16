import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    //.fields can take multiple fields
    // unlike array which take multiple files 
    // in a single field
    // fields - array of fields
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser);

//secured routes
router.route('/logout').post(verifyJWT, logoutUser);
// verifyJWT - middleware -that runs before logoutUser
// next() - we write next in middlewware so that it 
// runs the next method after the middleware

router.route("/refresh-token").post(refreshAccessToken);


export default router