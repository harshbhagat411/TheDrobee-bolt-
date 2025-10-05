import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

interface Product {
  id: string;
  title: string;
  images: string[];
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  creatorName: string;
  availability: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleAddToCart = () => {
    if (!product.availability) {
      showToast('This item is currently unavailable', 'error');
      return;
    }

    // Add to cart with default values
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.images[0] || 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      size: 'M', // Default size - in a real app, this would be selected by user
      pricePerDay: product.pricePerDay,
      rentalDays: 3, // Default rental days
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deposit: Math.round(product.pricePerDay * 2.5) // Estimated deposit
    });

    showToast(`Added ${product.title} to cart!`, 'success');
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
        )}
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">👗</div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={product.images[0] || 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={product.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}
        
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>

        {!product.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-black bg-opacity-75 px-3 py-1 rounded">
              Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link
          to={`/products/${product.id}`}
          className="block hover:text-red-600 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">by {product.creatorName}</p>
        
        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-red-600">
              ₹{product.pricePerDay.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          
          <button
            onClick={() => handleAddToCart()}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              product.availability
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.availability}
          >
            {product.availability ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};