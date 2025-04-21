import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:8800/images');
      setGallery(res.data.reverse());
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setIsUploading(true); 
    try {
      await axios.post('http://localhost:8800/upload', formData);
      setImage(null);
      fetchImages(); 
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false); 
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">📷 Image Gallery</h1>

      <form
        onSubmit={handleUpload}
        className="max-w-md mx-auto bg-white p-6 rounded shadow mb-10"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center"
          disabled={isUploading}
        >
          {isUploading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
          ) : (
            'Upload Image'
          )}
        </button>
      </form>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((img) => (
          <div key={img.id} className="bg-white rounded shadow overflow-hidden">
            <img
              src={`http://localhost:8800/uploads/${img.photo}`}
              alt=""
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
