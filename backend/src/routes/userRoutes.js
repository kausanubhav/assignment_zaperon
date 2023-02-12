import express from "express"
import { checkLoggedIn, loginUser, logoutUser, registerUser } from "../controllers/userController.js"

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", loginUser)
router.get('/loggedIn',checkLoggedIn)
router.delete('/logout',logoutUser)


export default router
