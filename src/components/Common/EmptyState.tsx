import React from 'react';
import { ShoppingBag, Heart, FileText, Package } from 'lucide-react';

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'orders' | 'products' | 'blogs';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction
}) => {
  const getConfig = () => {
    switch (type) {
      case 'cart':
        return {
          icon: ShoppingBag,
          title: title || 'Your cart is empty',
          description: description || 'Add some items to get started with your rental journey.',
          actionLabel: actionLabel || 'Browse Products'
        };
      case 'wishlist':
        return {
          icon: Heart,
          title: title || 'Your wishlist is empty',
          description: description || 'Save items you love to easily find them later.',
          actionLabel: actionLabel || 'Discover Products'
        };
      case 'orders':
        return {
          icon: Package,
          title: title || 'No orders yet',
          description: description || 'When you place orders, they\'ll appear here.',
          actionLabel: actionLabel || 'Start Shopping'
        };
      case 'products':
        return {
          icon: ShoppingBag,
          title: title || 'No products found',
          description: description || 'Try adjusting your filters or search terms.',
          actionLabel: actionLabel || 'Clear Filters'
        };
      case 'blogs':
        return {
          icon: FileText,
          title: title || 'No blog posts found',
          description: description || 'Check back later for new articles and updates.',
          actionLabel: actionLabel || 'Go Home'
        };
      default:
        return {
          icon: ShoppingBag,
          title: title || 'Nothing here yet',
          description: description || 'Check back later.',
          actionLabel: actionLabel || 'Go Back'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{config.description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {config.actionLabel}
        </button>
      )}
    </div>
  );
};