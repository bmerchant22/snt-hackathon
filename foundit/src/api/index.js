import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update with your actual API base URL

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrl; // Assuming the server returns the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const reportLostItem = async (title, description, image) => {
  const imageUrl = await uploadImage(image);

  const data = {
    title,
    description,
    imageUrl,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/report-lost-item`, data);
    return response.data;
  } catch (error) {
    console.error('Error reporting lost item:', error);
    throw error;
  }
};

const reportFoundItem = async (title, description, image) => {
  const imageUrl = await uploadImage(image);

  const data = {
    title,
    description,
    imageUrl,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/report-found-item`, data);
    return response.data;
  } catch (error) {
    console.error('Error reporting found item:', error);
    throw error;
  }
};

export { reportLostItem, reportFoundItem };
