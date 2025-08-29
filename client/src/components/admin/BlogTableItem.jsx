import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

    const {title, createdAt } = blog;
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext();

    const togglePublish = async () => {
      try {
        const { data } = await axios.put(`/api/blog/toggle-publish`, { id: blog._id });
        if (data.success) {
          toast.success(data.message);
          await fetchBlogs(); // Refresh the blog list
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    const deleteBlog = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this blog?');
      if (!confirmed) return; 
        try {
          const { data } = await axios.delete(`/api/blog/delete`, {
            data: { id: blog._id }
          });
          if (data.success) {
            toast.success(data.message);
            fetchBlogs(); // Refresh the blog list
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
    };


  return (
    <tr className='border-y border-gray-300'>
      <th className='py-4 px-2'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>
        {blog.isPublished ? 'Published' : 'Unpublished'}</p>
      </td>
      <td className='px-2 py-4 flex text-xs gap-3'>
        <button 
          onClick={togglePublish}
          className='border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-100 transition-colors'
        >
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img 
          onClick={deleteBlog}
          src={assets.cross_icon} 
          className='w-8 hover:scale-110 transition-all cursor-pointer' 
          alt='Delete'
        />
      </td>
    </tr>
  )
}

export default BlogTableItem
