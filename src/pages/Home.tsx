import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Recycle, Shield, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const featuredProducts = [
    {
      id: '1',
      title: 'Elegant Black Evening Lehenga',
      image: 'https://i.pinimg.com/1200x/ea/74/48/ea7448dec5a1c3c1045f46e1b2aceede.jpg',
      pricePerDay: 7120,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Designer Floral Kurta Set',
      image: 'https://i.pinimg.com/1200x/27/a8/7a/27a87aaf221e0159f35087834b25ffc8.jpg',
      pricePerDay: 3600,
      rating: 4.6
    },
    {
      id: '6',
      title: 'Designer Wedding Sherwani',
      image: 'https://i.pinimg.com/736x/77/3d/25/773d2587f4f5457cee5cb0f4d334ba85.jpg',
      pricePerDay: 7600,
      rating: 4.8
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Curated by Creators',
      description: 'Unique pieces from talented fashion creators worldwide.'
    },
    {
      icon: Recycle,
      title: 'Sustainable Fashion',
      description: 'Reduce waste by renting instead of buying fast fashion.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Every item is cleaned and inspected before rental.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-purple-900 to-pink-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative min-h-screen flex items-center bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/1200x/11/cf/fa/11cffab65139d9b5ee591e7d101dd227.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rent. Wear. Return.
              <span className="block text-red-300">Repeat.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Access designer fashion without the commitment. Sustainable, affordable, and always on-trend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/how-it-works"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-900 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Rentals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular pieces, carefully curated by our community of creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">
                      ₹{product.pricePerDay.toLocaleString("en-IN")}/day
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Drobe?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing fashion rental with our unique approach to quality, sustainability, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of fashion lovers who are already enjoying sustainable, affordable luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/become-creator"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};