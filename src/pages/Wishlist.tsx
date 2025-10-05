import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/Common/EmptyState';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  pricePerDay: number;
  creatorName: string;
  rating: number;
  availability: boolean;
}

export const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Mock wishlist data
  const mockWishlistItems: WishlistItem[] = [
    {
      id: "w1",
      productId: "1",
      title: "Elegant Black Evening Lehenga",
      image: "https://i.pinimg.com/1200x/ea/74/48/ea7448dec5a1c3c1045f46e1b2aceede.jpg",
      pricePerDay: 7120,
      creatorName: "Fashion House Elite",
      rating: 4.8,
      availability: true
    },
    {
      id: "w2",
      productId: "2",
      title: "Designer Floral Kurta Set",
      image: "https://i.pinimg.com/1200x/27/a8/7a/27a87aaf221e0159f35087834b25ffc8.jpg",
      pricePerDay: 3600,
      creatorName: "Bloom Boutique",
      rating: 4.6,
      availability: false
    },
    {
      id: "w3",
      productId: "6",
      title: "Designer Wedding Sherwani",
      image: "https://i.pinimg.com/736x/77/3d/25/773d2587f4f5457cee5cb0f4d334ba85.jpg",
      pricePerDay: 7600,
      creatorName: "Urban Edge",
      rating: 4.8,
      availability: false
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // For now, we'll use mock data
    setWishlistItems(mockWishlistItems);
  }, []);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Removed from wishlist', 'success');
  };

  const moveToCart = (item: WishlistItem) => {
    if (!item.availability) {
      showToast('This item is currently unavailable', 'error');
      return;
    }

    // Add to cart with default values
    addToCart({
      productId: item.productId,
      title: item.title,
      image: item.image,
      size: 'M', // Default size
      pricePerDay: item.pricePerDay,
      rentalDays: 3, // Default rental days
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deposit: Math.round(item.pricePerDay * 2.5) // Estimated deposit
    });

    removeFromWishlist(item.id);
    showToast('Added to cart!', 'success');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
            <p className="text-gray-600">Save items you love to easily find them later</p>
          </div>
          <EmptyState
            type="wishlist"
            title="Your wishlist is empty"
            description="Save items you love to easily find them later. Click the heart icon on any product to add it here."
            actionLabel="Discover Products"
            onAction={() => window.location.href = '/products'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <X className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                {!item.availability && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold bg-black bg-opacity-75 px-3 py-1 rounded">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <Link
                  to={`/products/${item.productId}`}
                  className="block hover:text-red-600 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 mb-2">by {item.creatorName}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-red-600">
                      ₹{item.pricePerDay.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => moveToCart(item)}
                    disabled={!item.availability}
                    className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.availability
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${item.productId}`}
                    className="px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};