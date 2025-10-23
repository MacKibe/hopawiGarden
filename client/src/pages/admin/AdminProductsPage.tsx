import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSync } from 'react-icons/fa';
import api from '../../config/axios';
import type { Product } from '../../types';
import ProductForm from '../../components/admin/ProductForm';
import { toast } from 'react-hot-toast';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch products';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        errorMessage = errorObj.response?.data?.error || errorMessage;
      }
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully!');
    } catch (err: unknown) {
      let errorMessage = 'Failed to delete product';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        errorMessage = errorObj.response?.data?.error || errorMessage;
      }
      toast.error(`Error: ${errorMessage}`);
      console.error('Delete product error:', err);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleProductSaved = () => {
    fetchProducts(); // Refresh the product list
    handleFormClose(); // Close the form
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={fetchProducts}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold">Product Management</h2>
          <p className="text-gray-600 mt-1">
            {products.length} product{products.length !== 1 ? 's' : ''} total
            {searchTerm && ` • ${filteredProducts.length} found`}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={refreshProducts}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh products"
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FaPlus />
            Add Product
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error && products.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Partial error: {error} (showing cached data)
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.path || '/assets/placeholder-plant.jpg'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/placeholder-plant.jpg';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 truncate max-w-xs">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                          {product.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {product.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">
                    Kshs {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty States */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            {products.length === 0 ? (
              <div className="space-y-4">
                <div className="text-gray-400 text-6xl">🌿</div>
                <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Get started by adding your first plant to the collection.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400 text-4xl">🔍</div>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500">
                  No products match "<span className="font-medium">{searchTerm}</span>"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-green-600 hover:text-green-700 underline mt-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onProductSaved={handleProductSaved}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;