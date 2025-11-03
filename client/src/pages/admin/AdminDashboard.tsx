import { useState, useEffect } from 'react';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import api from '../../config/axios';
import type { Product } from '../../types';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsResponse = await api.get('/products');
      const products = productsResponse.data;
      
      setStats({
        totalProducts: products.length,
        totalUsers: 0, // You'll need a users endpoint
        totalOrders: 0, // You'll need an orders endpoint
        revenue: products.reduce((sum: number, product: Product) => sum + product.price, 0)
      });

      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div>      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className=" p-2 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600">
              <FaBox size={20} />
            </div>
            <div className="ml-4">
              <h4 className="font-medium">Total Products</h4>
              <p className="text-md font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className=" p-2 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaUsers size={20} />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Total Users</h4>
              <p className="text-md font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className=" p-2 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaShoppingCart size={20} />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Total Orders</h4>
              <p className="text-md font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="p-2 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaChartLine size={20} />
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-500">Revenue</h4>
              <p className="text-md font-bold text-gray-900">Kshs {stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="font-semibold">Recent Products</h3>
        </div>
        <div className="p-6">
          {recentProducts.length > 0 ? (
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.product_id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.path}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-500">Kshs {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;