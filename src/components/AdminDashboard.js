import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard({ token, username, onLogout }) {
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [image, setImage] = useState(null);
  const [postDate, setPostDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('information', information);
    formData.append('image', image);
    formData.append('postDate', postDate);

    try {
      await axios.post('http://localhost:5000/api/content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Post created successfully');
      setTitle('');
      setInformation('');
      setImage(null);
      setPostDate('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>
      <h3 className="text-xl font-bold mb-4">Create New Post</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={information}
          onChange={(e) => setInformation(e.target.value)}
          placeholder="Information"
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Create Post</button>
      </form>
      <button
        onClick={onLogout}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;