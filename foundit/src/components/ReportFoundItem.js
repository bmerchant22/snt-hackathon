import React, { useState } from 'react';

const ReportFoundItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log('Report Found Item submitted');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Image:', image);
  };

  return (
    <div>
      <h2>Report Found Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportFoundItem;
