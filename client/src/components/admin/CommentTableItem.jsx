import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext();

    const approveComment = async () => {
        try {
            const { data } = await axios.put('/api/admin/approve-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments(); // Refresh the comments list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteComment = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this comment?');
        if (!confirmed) return;
        
        try {
            const { data } = await axios.delete('/api/admin/delete-comment', { id: _id });
            if (data.success) {
                toast.success(data.message);
                fetchComments(); // Refresh the comments list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

  return (
    <tr className='border-b border-gray-300'>
        <td className='px-6 py-4'>
            <div className='space-y-2'>
                <div><span className='font-medium text-gray-600'>Blog:</span> {blog?.title || 'Blog not found'}</div>
                <div><span className='font-medium text-gray-600'>Name:</span> {comment.name}</div>
                <div><span className='font-medium text-gray-600'>Comment:</span> {comment.content}</div>
            </div>
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-4'>
            <div className='flex items-center gap-4'>
                {
                    !comment.isApproved ?
                    <img 
                        onClick={approveComment}
                        src={assets.tick_icon} 
                        alt='Approve comment'
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    /> : 
                    <p className='text-xs border border-gray-600 bg-green-100 text-green-600 rounded-full px-2 py-1'>Approved</p>
                }
                <img 
                    onClick={deleteComment}
                    src={assets.bin_icon} 
                    alt='Delete comment' 
                    className='w-5 hover:scale-110 transition-all cursor-pointer'
                />
            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem
