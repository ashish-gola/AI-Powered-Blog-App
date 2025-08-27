import React, { useEffect, useRef, useState} from 'react'
import { assets } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    // AI content generation logic would go here
    console.log('Generate AI content');
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    const blogData = {
      title,
      subTitle,
      content: quillRef.current ? quillRef.current.root.innerHTML : '',
      category,
      isPublished,
      image
    };
    
    console.log('Blog Data:', blogData);
    // Submit logic would go here
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            ['clean']
          ]
        }
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p className='font-medium mb-2'>Upload thumbnail</p>
        <label htmlFor='image'>
          <img 
            src={!image ? assets.upload_area : URL.createObjectURL(image)} 
            alt='Upload Area' 
            className='mt-2 h-16 rounded cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400'
          />
          <input 
            type='file' 
            id='image' 
            accept='image/*'
            className='hidden' 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </label>

        <p className='mt-4 font-medium mb-2'>Blog Title</p>
        <input 
          type='text' 
          placeholder='Enter blog title' 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-2 w-full rounded focus:border-primary' 
        />

        <p className='mt-4 font-medium mb-2'>Sub Title</p>
        <input 
          type='text' 
          placeholder='Enter blog subtitle' 
          required 
          value={subTitle} 
          onChange={(e) => setSubTitle(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-2 w-full rounded focus:border-primary' 
        />

        <p className='mt-4 font-medium mb-2'>Category</p>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className='border border-gray-300 outline-none max-w-lg mt-2 p-2 w-full rounded focus:border-primary'
        >
          <option value="Technology">Technology</option>
          <option value="Startup">Startup</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Finance">Finance</option>
        </select>

        <p className='mt-4 font-medium mb-2'>Blog Description</p>
        <div className='max-w-lg h-80 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} className='h-64'></div>
          <button 
            type='button' 
            onClick={generateContent} 
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 transition-colors cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        <div className='mt-6 flex items-center gap-4'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input 
              type='checkbox' 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)}
              className='w-4 h-4 text-primary'
            />
            <span>Publish immediately</span>
          </label>
        </div>

        <div className='mt-6 flex gap-4'>
          <button 
            type='submit' 
            className='bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors'
          >
            {isPublished ? 'Publish Blog' : 'Save as Draft'}
          </button>
          <button 
            type='button' 
            className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors'
            onClick={() => {
              setTitle('');
              setSubTitle('');
              setCategory('Startup');
              setImage(false);
              setIsPublished(false);
              if (quillRef.current) quillRef.current.setContents([]);
            }}
          >
            Reset
          </button>
        </div>

      </div>
    </form>
  )
}

export default AddBlog
