// context/WishlistContext.js
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); // full wishlist items

  const updateWishlist = (items) => {
    setWishlist(items);
  };

  const getAllPropertyIds = () => {
    return wishlist.map(item => item.propertyDetails?._id).filter(Boolean);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, updateWishlist, getAllPropertyIds }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
