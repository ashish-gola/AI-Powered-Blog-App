import React from 'react'
import { assets } from '../../assets/assets';

const CommentTableItem = ({comment, fetchComments}) => {
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);

  return (
    <tr className='border-b border-gray-300'>
        <td className='px-6 py-4'>
            <div className='space-y-2'>
                <div><span className='font-medium text-gray-600'>Blog:</span> {blog.title}</div>
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
                        src={assets.tick_icon} 
                        alt='Approve comment'
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    /> : 
                    <p className='text-xs border border-gray-600 bg-green-100 text-green-600 rounded-full px-2 py-1'>Approved</p>
                }
                <img 
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
