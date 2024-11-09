"use client";
import { useState } from 'react';


const Layout = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image) return alert('Please select an image to upload.');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        alert('Image uploaded successfully!');
        console.log('Image URL:', data.secure_url);
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <form className="w-1/2 mx-auto" onSubmit={handleUpload} encType="multipart/form-data">
        <input type="file" name="image" id="image" className="hidden" onChange={handleImageChange} />
        <label htmlFor="image" className="block text-center text-xl font-bold">
          Upload Image
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full">
          Upload
        </button>
      </form>
    </>
  );
};

export default Layout;
