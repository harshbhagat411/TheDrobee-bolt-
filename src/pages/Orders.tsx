import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';
import { EmptyState } from '../components/Common/EmptyState';
import { useAuth } from '../contexts/AuthContext';

interface Order {
  id: string;
  userId: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'returned';
  items: Array<{
    productId: string;
    title: string;
    image: string;
    size: string;
    pricePerDay: number;
    rentalDays: number;
    deposit: number;
  }>;
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  subtotal: number;
  deposit: number;
  total: number;
  orderDate: string;
  rentalStart: string;
  rentalEnd: string;
  returnBy: string;
  deliveredAt?: string;
  timeline: Array<{
    status: string;
    message: string;
    timestamp: string;
    trackingNumber?: string;
  }>;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: "ORD-2024-001",
      userId: "1",
      status: "delivered",
      items: [
        {
          productId: "1",
          title: "Elegant Black Evening Lehenga",
          image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
          size: "M",
          pricePerDay: 7120,
          rentalDays: 3,
          deposit: 16000
        }
      ],
      address: {
        name: "Priya Sharma",
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400001",
        phone: "+91-98765-43210"
      },
      subtotal: 21360,
      deposit: 16000,
      total: 37360,
      orderDate: "2024-01-15T10:30:00Z",
      rentalStart: "2024-01-20T00:00:00Z",
      rentalEnd: "2024-01-23T00:00:00Z",
      returnBy: "2024-01-24T23:59:59Z",
      deliveredAt: "2024-01-19T14:30:00Z",
      timeline: [
        {
          status: "confirmed",
          message: "Order confirmed",
          timestamp: "2024-01-15T10:30:00Z"
        },
        {
          status: "processing",
          message: "Preparing your order",
          timestamp: "2024-01-16T09:00:00Z"
        },
        {
          status: "shipped",
          message: "Package shipped via Express Delivery",
          timestamp: "2024-01-17T15:30:00Z",
          trackingNumber: "TRK123456789"
        },
        {
          status: "delivered",
          message: "Package delivered successfully",
          timestamp: "2024-01-19T14:30:00Z"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      userId: "1",
      status: "shipped",
      items: [
        {
          productId: "2",
          title: "Designer Floral Kurta Set",
          image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
          size: "S",
          pricePerDay: 3600,
          rentalDays: 5,
          deposit: 9600
        }
      ],
      address: {
        name: "Priya Sharma",
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "400001",
        phone: "+91-98765-43210"
      },
      subtotal: 18000,
      deposit: 9600,
      total: 27600,
      orderDate: "2024-01-20T16:45:00Z",
      rentalStart: "2024-01-25T00:00:00Z",
      rentalEnd: "2024-01-30T00:00:00Z",
      returnBy: "2024-01-31T23:59:59Z",
      timeline: [
        {
          status: "confirmed",
          message: "Order confirmed",
          timestamp: "2024-01-20T16:45:00Z"
        },
        {
          status: "processing",
          message: "Preparing your order",
          timestamp: "2024-01-21T10:00:00Z"
        },
        {
          status: "shipped",
          message: "Package shipped via Standard Delivery",
          timestamp: "2024-01-22T11:20:00Z",
          trackingNumber: "TRK987654321"
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Try to fetch from data file
        const response = await fetch('/data/orders.json');
        if (response.ok) {
          const data = await response.json();
          // Filter orders for current user
          const userOrders = data.filter((order: Order) => order.userId === user?.id);
          setOrders(userOrders);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.warn('Using mock orders data:', error);
        // Use mock data as fallback
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <LoadingSkeleton type="order" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
            <p className="text-gray-600">Track your rental orders and returns</p>
          </div>
          <EmptyState
            type="orders"
            title="No orders yet"
            description="When you place orders, they'll appear here with tracking information."
            actionLabel="Start Shopping"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-gray-600">Track your rental orders and returns</p>
        </div>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Order {order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Items</h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.title}</h5>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.pricePerDay}/day × {item.rentalDays} days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{(item.pricePerDay * item.rentalDays).toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-600">
                          +₹{item.deposit.toLocaleString("en-IN")} deposit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Delivery Address</h4>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{order.address.name}</p>
                    <p className="text-gray-600">{order.address.street}</p>
                    <p className="text-gray-600">
                      {order.address.city}, {order.address.state} {order.address.zip}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{order.address.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Order Timeline</h4>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {getStatusIcon(event.status)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{event.message}</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(event.timestamp)}
                        </p>
                        {event.trackingNumber && (
                          <p className="text-sm text-red-600">
                            Tracking: {event.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Rental Period: {formatDate(order.rentalStart)} - {formatDate(order.rentalEnd)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Return by: {formatDate(order.returnBy)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      Total: ₹{order.total.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-600">
                      (₹{order.subtotal.toLocaleString("en-IN")} rental + ₹{order.deposit.toLocaleString("en-IN")} deposit)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};