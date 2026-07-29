import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedCart = localStorage.getItem('velora_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const persist = (nextItems) => {
    localStorage.setItem('velora_cart', JSON.stringify(nextItems));
    setItems(nextItems);
  };

  const addItem = (product, quantity = 1) => {
    const nextItems = [...items];
    const existingIndex = nextItems.findIndex((item) => item._id === product._id);
    if (existingIndex >= 0) {
      nextItems[existingIndex].quantity += quantity;
    } else {
      nextItems.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
        quantity,
      });
    }
    persist(nextItems);
  };

  const updateQuantity = (id, quantity) => {
    const nextItems = items
      .map((item) => (item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
      .filter((item) => item.quantity > 0);
    persist(nextItems);
  };

  const removeItem = (id) => {
    persist(items.filter((item) => item._id !== id));
  };

  const clearCart = () => persist([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }), [items, itemCount, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
