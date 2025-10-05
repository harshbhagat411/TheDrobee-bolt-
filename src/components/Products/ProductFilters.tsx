import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  sizes: string[];
  priceRange: [number, number];
  rating: number;
  availability: boolean;
  gender: string[];
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const categories = ['kurta', 'saree', 'lehenga', 'sherwani', 'salwar suit'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const genderOptions = ['women', 'men', 'unisex'];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', updated);
  };

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    updateFilter('sizes', updated);
  };

  const toggleGender = (gender: string) => {
    const updated = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender];
    updateFilter('gender', updated);
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      sizes: [],
      priceRange: [0, 200],
      rating: 0,
      availability: false,
      gender: []
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.gender.length > 0 ||
    filters.rating > 0 ||
    filters.availability ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200;

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={onToggle}
        className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {filters.categories.length + filters.sizes.length + filters.gender.length}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
        bg-white lg:bg-transparent
        lg:w-64 lg:flex-shrink-0
      `}>
        <div className="lg:hidden absolute inset-0 bg-black bg-opacity-50" onClick={onToggle}></div>
        
        <div className="relative lg:relative bg-white h-full lg:h-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={onToggle}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear all filters
              </button>
            )}

            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Gender</h4>
              <div className="space-y-2">
                {genderOptions.map(gender => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(gender)}
                      onChange={() => toggleGender(gender)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`p-2 text-sm border rounded transition-colors ${
                      filters.sizes.includes(size)
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Price per Day</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="20000"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => updateFilter('rating', rating)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {rating}+ stars
                    </span>
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === 0}
                    onChange={() => updateFilter('rating', 0)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">All ratings</span>
                </label>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.availability}
                  onChange={(e) => updateFilter('availability', e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Available only
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};