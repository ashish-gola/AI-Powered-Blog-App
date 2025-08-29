import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';


export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile || isPublished === undefined) {
            return res.status(400).json({ success: false, message: "Please provide all required fields." });
        }


        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to ImageKit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blog"
        });

        //optimization through Imagekit URL transformation
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width: '1280'}
            ]
        });


        const imageUrl = optimizedImageUrl;

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: imageUrl,
            isPublished
        });

        res.json({ success: true, message: "Blog added successfully." });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog ) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        await Comment.deleteMany({ blog: id });

        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog publication status updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        await Comment.create({ blog: blogId, name, content, isApproved: true });
        res.status(201).json({ success: true, message: "Comment added successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
