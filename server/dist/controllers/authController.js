import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
export const signupController = async (req, res, next) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
        return res.status(400).send('User already exisits. Please sign in');
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
    }
    catch (error) {
        console.log(error);
    }
};
export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).send('Email not found!');
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(401).send('Password is incorrect!');
        res.status(200).json({
            success: true,
            message: 'User login successful!',
            user: {
                'userId': user._id,
                'username': user.username,
                'email': user.email,
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
