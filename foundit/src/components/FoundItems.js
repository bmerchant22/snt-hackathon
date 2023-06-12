import React, { useEffect, useState } from 'react';
import { fetchFoundItems } from '../api';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    // Fetch found items from the backend
    const fetchItems = async () => {
      try {
        const items = await fetchFoundItems();
        setFoundItems(items);
      } catch (error) {
        console.error('Error fetching found items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Found Items</h1>
      {foundItems.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <img src={item.image} alt={item.title} />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FoundItems;
