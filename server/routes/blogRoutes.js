import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();


blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.delete('/delete', auth, deleteBlogById);
blogRouter.put('/toggle-publish', auth, togglePublish);

blogRouter.post('/add-comment', addComment);
blogRouter.get('/comments/:blogId', getBlogComments);

// AI content generation route
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;