import React, { useEffect, useRef, useState} from 'react'
import { assets, blogCategories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const AddBlog = () => {

  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      
      // Validation
      if (!image) {
        toast.error('Please upload a thumbnail image');
        return;
      }
      
      if (!title.trim()) {
        toast.error('Please enter a blog title');
        return;
      }
      
      const description = quillRef.current.root.innerHTML;
      if (!description || description === '<p><br></p>') {
        toast.error('Please write a blog description');
        return;
      }
      
      setIsAdding(true);

      const blog = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        description,
        category,
        isPublished
      };

      const formData = new FormData();
      formData.append('image', image);
      formData.append('blog', JSON.stringify(blog));

      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success('Blog added successfully!');
        // Reset form
        setImage(false);
        setTitle('');
        setSubTitle('');
        setCategory('Startup');
        setIsPublished(false);
        quillRef.current.setContents([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write blog description here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });
    }
  }, []);

  return (
    <div className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-auto'>
      <div className='bg-white w-full max-w-4xl mx-auto p-6 md:p-10 m-4 md:m-10 shadow-lg rounded-lg'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Add New Blog</h1>
          <p className='text-gray-600'>Create and publish your blog post</p>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-6'>

        <p className='font-medium mb-2'>Upload thumbnail *</p>
        <label htmlFor='image' className='block'>
          <div className='relative group'>
            <img 
              src={!image ? assets.upload_area : URL.createObjectURL(image)} 
              alt='Upload Area' 
              className={`mt-2 h-32 w-full max-w-lg object-cover rounded-lg cursor-pointer border-2 border-dashed transition-all ${
                !image 
                  ? 'border-gray-300 hover:border-gray-400' 
                  : 'border-primary/50 hover:border-primary'
              }`}
            />
            {image && (
              <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
                <span className='text-white text-sm font-medium'>Click to change</span>
              </div>
            )}
          </div>
          <input 
            type='file' 
            id='image' 
            accept='image/*'
            className='hidden' 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </label>

        <p className='mt-6 font-medium mb-2'>Blog Title *</p>
        <input 
          type='text' 
          placeholder='Enter blog title' 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-3 w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all' 
        />

        <p className='mt-6 font-medium mb-2'>Sub Title</p>
        <input 
          type='text' 
          placeholder='Enter blog subtitle (optional)' 
          value={subTitle} 
          onChange={(e) => setSubTitle(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-3 w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all' 
        />

        <p className='mt-6 font-medium mb-2'>Blog Description *</p>
        <div className='max-w-lg h-80 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} className='h-64 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all'></div>
          <button 
            type='button' 
            onClick={generateContent} 
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 transition-colors cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        <p className='mt-6 font-medium mb-2'>Blog Category *</p>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-3 w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white'
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className='mt-4 flex items-center gap-3'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input 
              type='checkbox' 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
              className='w-4 h-4 cursor-pointer accent-primary' 
            />
            <span className='text-gray-700 font-medium'>Publish Now</span>
          </label>
        </div>

        <div className='mt-6 flex gap-4'>
          <button 
            disabled={isAdding} 
            type='submit' 
            className='bg-primary text-white px-8 py-2.5 rounded-lg hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium'
          >
            {isAdding ? 'Adding...' : 'Add Blog'}
          </button>
          
          <button 
            type='button' 
            onClick={() => {
              setImage(false);
              setTitle('');
              setSubTitle('');
              setCategory('Startup');
              setIsPublished(false);
              if (quillRef.current) {
                quillRef.current.setContents([]);
              }
            }}
            className='border border-gray-300 text-gray-700 px-8 py-2.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer font-medium'
          >
            Reset
          </button>
        </div>

        </form>
      </div>
    </div>
  )
}

export default AddBlog
