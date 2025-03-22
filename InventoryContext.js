import React, { createContext, useState, useContext } from 'react';

// Create Context
const InventoryContext = createContext();

// Inventory Provider Component
export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Souvenir T-Shirt', stock: 3 },
    { id: '2', name: 'Jungle Hat', stock: 10 },
    { id: '3', name: 'Safari Keychain', stock: 2 },
  ]);

  // Function to update stock
  const updateStock = (productName, quantityChange) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name.toLowerCase() === productName.toLowerCase()
          ? { ...item, stock: item.stock + quantityChange }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider value={{ inventory, updateStock }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom Hook to use Inventory
export const useInventory = () => useContext(InventoryContext);