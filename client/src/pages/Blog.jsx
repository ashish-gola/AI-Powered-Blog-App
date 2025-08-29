import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
    const {id} = useParams();

    const {axios} = useAppContext();


    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
       try {
           const { data } = await axios.get(`/api/blog/${id}`);
           if (data.success) {
               setData(data.blog);
           } else {
               toast.error(data.message);
           }
       } catch (error) {
           toast.error(error.response?.data?.message || 'Failed to fetch blog');
       }
    }

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/blog/comments/${id}`);
        if (data.success) {
            setComments(data.comments);
        } else {
            toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch comments');
      }
    }
    
    const addComment = async (e) => {
       e.preventDefault();
       try {
           const { data } = await axios.post(`/api/blog/add-comment`, { blogId: id, name, content });
           if (data.success) {
            toast.success(data.message || 'Comment added successfully');
            setName('');
            setContent('');
            fetchComments(); // Refresh comments after adding
           } else {
            toast.error(data.message);
           }
       } catch (error) {
           toast.error(error.response?.data?.message || 'Failed to add comment');
       }
    }

    useEffect(() => {
       fetchBlogData();
       fetchComments();
    }, [id]);

  return data ? (
   <div className='relative'>
    <img src={assets.gradientBackground} alt="" className='absolute top-0 -z-10 opacity-50' />
    <Navbar />

    <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'
        >
          {data.title}
        </motion.h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michael Brown</p>
    </div>

    <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt='' className='rounded-3xl mb-5'></img>

        <div className='rich-text max-w-5xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4'>
                {comments.length > 0 ? comments.map((item, index)=>(
                    <div key={index} className='relative bg-primary/5 border border-primary/20 rounded p-4 max-w-xl text-gray-600'>
                        <div className='flex items-center gap-2 mb-2'>
                            <img src={assets.user_icon} alt='User Icon' className='w-6' />
                            <p className='font-medium'>{item.name}</p>
                        </div>
                        <p className='text-sm max-w-md ml-8'>{item.content}</p>
                        <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                    </div>
                )) : (
                    <p className='text-gray-500 text-sm'>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>

        <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Leave a Comment</p>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Your Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />
                <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Your Comment' required className='w-full border border-gray-300 p-2 rounded outline-none h-48'></textarea>
                <button type='submit' className='bg-primary text-white p-2 px-8 rounded hover:scale-105 transition-all cursor-pointer'>Submit</button>
            </form>
        </div>

        <div className='my-24 max-w-3xl mx-auto'>
            <p className='font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
                <img src={assets.facebook_icon} alt='Facebook' className='w-8 h-8 mr-4 cursor-pointer' />
                <img src={assets.twitter_icon} alt='Twitter' className='w-8 h-8 mr-4 cursor-pointer' />
                <img src={assets.googleplus_icon} alt='Google Plus' className='w-8 h-8 cursor-pointer' />
            </div>
        </div>
    </div>
    <Footer />
    </div>
  ) : (
  <Loader />
  )
}

export default Blog