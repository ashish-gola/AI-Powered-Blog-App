import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

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
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const DashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        };

        res.json({ success: true, dashboard: DashboardData });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: 'Comment approved successfully' });
    } catch (error) {
        console.error('Error approving comment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}