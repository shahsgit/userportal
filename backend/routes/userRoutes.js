import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import { userLogin, logoutUser, addUser } from "../controllers/userControllers.js";
router.route('/login').post(authenticate, userLogin);
router.route('/logout').post(authenticate, logoutUser);
router.route('/add').post(addUser);


export default router;