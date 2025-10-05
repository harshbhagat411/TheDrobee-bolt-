import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Chatbot } from '../Common/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};