import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  size: string;
  pricePerDay: number;
  rentalDays: number;
  startDate: string;
  endDate: string;
  deposit: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, rentalDays: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotalDeposit: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setItems(prev => [...prev, { ...item, id }]);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, rentalDays: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, rentalDays } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => items.length;

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.pricePerDay * item.rentalDays), 0);
  };

  const getTotalDeposit = () => {
    return items.reduce((total, item) => total + item.deposit, 0);
  };

  const getTotal = () => getSubtotal() + getTotalDeposit();

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotalDeposit,
    getTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};