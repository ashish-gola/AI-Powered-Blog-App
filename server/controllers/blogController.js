import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';


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