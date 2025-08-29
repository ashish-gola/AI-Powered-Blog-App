import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Home from './pages/Home'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'
import ListBlog from './pages/admin/ListBlog'
import Layout from './pages/admin/Layout'
import Login from './components/admin/Login'
import { useAppContext } from './context/AppContext'
import 'quill/dist/quill.snow.css';
import {Toaster } from 'react-hot-toast';

const App = () => {
  const { token } = useAppContext();

  return (
      <div>
        <Toaster /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/admin" element={token ? <Layout /> : <Login />}>
            <Route index element={<Dashboard />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        </Routes>
      </div>
  )
}

export default App
