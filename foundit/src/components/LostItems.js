import React, { useEffect, useState } from 'react';
import { fetchLostItems } from '../api';

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    // Fetch lost items from the backend
    const fetchItems = async () => {
      try {
        const items = await fetchLostItems();
        setLostItems(items);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Lost Items</h1>
      {lostItems.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <img src={item.image} alt={item.title} />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default LostItems;
