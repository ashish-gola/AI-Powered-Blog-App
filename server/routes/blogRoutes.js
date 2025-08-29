import express from 'express';
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();


blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', auth, getAllBlogs);
blogRouter.get('/:blogId', auth, getBlogById);
blogRouter.delete('/:delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('/add-comment', auth, addComment);
blogRouter.get('/comments', auth, getBlogComments);

export default blogRouter;