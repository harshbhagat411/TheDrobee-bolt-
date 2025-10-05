import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { EmptyState } from '../components/Common/EmptyState';
import { useToast } from '../contexts/ToastContext';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getSubtotal, getTotalDeposit, getTotal } = useCart();
  const { showToast } = useToast();

  const handleQuantityChange = (id: string, newDays: number) => {
    if (newDays < 1) return;
    updateQuantity(id, newDays);
  };

  const handleRemoveItem = (id: string, title: string) => {
    removeFromCart(id);
    showToast(`Removed ${title} from cart`, 'success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-gray-600">Review your rental items before checkout</p>
          </div>
          <EmptyState
            type="cart"
            title="Your cart is empty"
            description="Add some items to get started with your rental journey."
            actionLabel="Browse Products"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">
            {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Rental Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          Rental: {item.startDate} to {item.endDate}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Days:</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.rentalDays - 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                              disabled={item.rentalDays <= 1}
                            >
                              <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.rentalDays}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.rentalDays + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{(item.pricePerDay * item.rentalDays).toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.pricePerDay.toLocaleString("en-IN")}/day × {item.rentalDays}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          +₹{item.deposit.toLocaleString("en-IN")} deposit
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Subtotal</span>
                  <span className="font-medium">₹{getSubtotal().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposits</span>
                  <span className="font-medium">₹{getTotalDeposit().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">₹{getTotal().toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Deposits will be refunded after return
                  </p>
                </div>
              </div>

              <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block w-full text-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Rental Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Rental Information</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free shipping both ways</li>
                  <li>• Professional cleaning included</li>
                  <li>• 24/7 customer support</li>
                  <li>• Damage protection available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};