import React, {useEffect, useState} from 'react'
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
 const [comments, setComments] = useState([]);
 const [filter, setFilter] = useState("All");
 const [loading, setLoading] = useState(true);

 const { axios } = useAppContext();

 const fetchComments = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get('/api/admin/comments');
    console.log('Comments API response:', data); // Debug log
    if (data.success) {
      setComments(data.comments);
      console.log('Comments set:', data.comments); // Debug log
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error fetching comments:', error); // Debug log
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
 }

 useEffect(()=>{
   fetchComments();
 }, [])

 const filteredComments = comments.filter((comment)=>{
   if(filter === "Approved") return comment.isApproved === true;
   if(filter === "Not Approved") return comment.isApproved === false;
   return true; // Show all comments
 });

  return (
    <div className='flex-1 pt-5 px-5 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='text-2xl font-semibold text-gray-800'>Comments ({comments.length})</h1>
        <div className='flex gap-4'>
          <button 
            onClick={() => setFilter('All')} 
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors
            ${filter === 'All' ? 'text-primary border-primary bg-primary/10' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
          >
            All
          </button>
          
          <button 
            onClick={() => setFilter('Approved')} 
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors
            ${filter === 'Approved' ? 'text-primary border-primary bg-primary/10' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
          >
            Approved
          </button>

          <button 
            onClick={() => setFilter('Not Approved')} 
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors
            ${filter === 'Not Approved' ? 'text-primary border-primary bg-primary/10' : 'text-gray-700 border-gray-300 hover:border-gray-400'}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading comments...</div>
        </div>
      ) : (
        <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
                <th scope='col' className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.length > 0 ? (
                filteredComments.map((comment, index) => (
                  <CommentTableItem 
                    key={comment._id} 
                    comment={comment} 
                    index={index + 1} 
                    fetchComments={fetchComments} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-gray-500">
                    {filter === 'All' ? 'No comments found' : `No ${filter.toLowerCase()} comments found`}
                    <br />
                    <small className="text-gray-400">
                      Total comments in database: {comments.length}
                    </small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Comments
