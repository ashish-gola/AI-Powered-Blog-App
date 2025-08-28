import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.json({ success: true, token });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ message: error.message });
    }
};