import User from '../models/userSchema.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/jsonWebToken.js';

const userLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            generateToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;
        } else {
            res.status(401).json({ message: 'Invalid Password. Please Try again' });
            return;
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

const addUser = asyncHandler(async (req, res) => {
    const { username, password, email, isAdmin } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, email, isAdmin });
    const savedUser = await user.save();
  
    res.status(201).json(savedUser);
  });

export {userLogin, logoutUser, addUser};