import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { ProductCard } from '../components/Products/ProductCard';
import { ProductFilters } from '../components/Products/ProductFilters';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';
import { EmptyState } from '../components/Common/EmptyState';
import { useToast } from '../contexts/ToastContext';

interface Product {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  category: string;
  gender: string;
  sizes: string[];
  pricePerDay: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  images: string[];
  availability: boolean;
  description: string;
  features: string[];
  brand: string;
  color: string;
}

interface FilterOptions {
  categories: string[];
  sizes: string[];
  priceRange: [number, number];
  rating: number;
  availability: boolean;
  gender: string[];
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    sizes: [],
    priceRange: [0, 20000],
    rating: 0,
    availability: false,
    gender: []
  });
  const { showToast } = useToast();

  // Fallback products in case fetch fails
  const fallbackProducts: Product[] = [
    {
      id: '1',
      title: 'Elegant Black Evening Lehenga',
      creatorId: 'creator1',
      creatorName: 'Fashion House Elite',
      category: 'lehenga',
      gender: 'women',
      sizes: ['XS', 'S', 'M', 'L'],
      pricePerDay: 7120,
      deposit: 16000,
      rating: 4.8,
      reviewCount: 124,
      images: [
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      availability: true,
      description: 'Stunning black evening lehenga perfect for formal events.',
      features: ['Dry clean only', 'Premium silk', 'Adjustable blouse'],
      brand: 'Luxury Fashion',
      color: 'Black'
    },
    {
      id: '2',
      title: 'Designer Floral Kurta Set',
      creatorId: 'creator2',
      creatorName: 'Bloom Boutique',
      category: 'kurta',
      gender: 'women',
      sizes: ['S', 'M', 'L', 'XL'],
      pricePerDay: 3600,
      deposit: 9600,
      rating: 4.6,
      reviewCount: 89,
      images: [
        'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      availability: true,
      description: 'Beautiful floral kurta set perfect for spring occasions.',
      features: ['Machine washable', 'Cotton blend', 'Dupatta included'],
      brand: 'Bloom',
      color: 'Floral'
    },
    {
      id: '3',
      title: 'Classic White Cotton Kurta',
      creatorId: 'creator3',
      creatorName: 'Professional Wear Co',
      category: 'kurta',
      gender: 'women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      pricePerDay: 2000,
      deposit: 6000,
      rating: 4.5,
      reviewCount: 203,
      images: [
        'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      availability: true,
      description: 'Crisp white cotton kurta perfect for professional settings.',
      features: ['Easy care', 'Cotton', 'Button details'],
      brand: 'Professional',
      color: 'White'
    },
    {
      id: '4',
      title: 'Designer Wedding Sherwani',
      creatorId: 'creator4',
      creatorName: 'Urban Edge',
      category: 'sherwani',
      gender: 'men',
      sizes: ['S', 'M', 'L', 'XL'],
      pricePerDay: 7600,
      deposit: 32000,
      rating: 4.8,
      reviewCount: 92,
      images: [
        'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      availability: true,
      description: 'Premium wedding sherwani with intricate embroidery.',
      features: ['Dry clean only', 'Silk blend', 'Hand embroidery'],
      brand: 'Urban Edge',
      color: 'Cream'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Try to fetch from the data folder
        const response = await fetch('/data/products.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          throw new Error('No products found in data file');
        }
      } catch (error) {
        console.warn('Failed to fetch products from JSON file, using fallback data:', error);
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setError('Using sample data - could not load product catalog');
        showToast('Using sample product data', 'warning');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      // Search query
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Categories
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);

      // Gender
      const matchesGender = filters.gender.length === 0 || 
        filters.gender.includes(product.gender);

      // Sizes
      const matchesSize = filters.sizes.length === 0 || 
        product.sizes.some(size => filters.sizes.includes(size));

      // Price
      const matchesPrice = product.pricePerDay >= filters.priceRange[0] && 
        product.pricePerDay <= filters.priceRange[1];

      // Rating
      const matchesRating = filters.rating === 0 || product.rating >= filters.rating;

      // Availability
      const matchesAvailability = !filters.availability || product.availability;

      return matchesSearch && matchesCategory && matchesGender && 
             matchesSize && matchesPrice && matchesRating && matchesAvailability;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoadingSkeleton type="product" count={6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rental Collection</h1>
          <p className="text-gray-600">Discover unique fashion pieces from creators worldwide</p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {error && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">{error}</p>
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <EmptyState
                type="products"
                title="No products found"
                description={
                  searchQuery || filters.categories.length > 0 || filters.sizes.length > 0 || filters.gender.length > 0
                    ? "Try adjusting your search or filters to see more results."
                    : "We're having trouble loading products right now. Please try again later."
                }
                onAction={() => {
                  setFilters({
                    categories: [],
                    sizes: [],
                    priceRange: [0, 20000],
                    rating: 0,
                    availability: false,
                    gender: []
                  });
                  setSearchQuery('');
                }}
              />
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};