import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import api from '../../config/axios';import type { Product } from '../../types';
import { toast } from 'react-hot-toast';
import { uploadProductImage, deleteProductImage } from '../../services/ImageUploadService';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onProductSaved?: () => void; // Callback to refresh product list
}

// Interface for form data (exclude id for new products)
type ProductFormData = Omit<Product, 'id'>;

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onProductSaved }) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.path || '');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || 'indoor',
      active: product?.active ?? true,
      path: product?.path || '',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload JPEG, PNG, or WebP images.');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum size is 5MB.');
        return;
      }

      setSelectedImage(file);
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Clear any previous file input errors
      setValue('path', 'image-uploaded'); // Set a dummy value to clear validation errors
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    let uploadedImageUrl = product?.path || ''; // Keep existing if editing
    let newImageUploaded = false;

    try {
      // Upload new image if selected
      if (selectedImage) {
        setUploadingImage(true);
        uploadedImageUrl = await uploadProductImage(selectedImage);
        newImageUploaded = true;
        toast.success('Image uploaded successfully!');
      }

      console.log('Submitting product data:', data);
      
      // Prepare payload with image URL
      const payload = {
        ...data,
        path: uploadedImageUrl, // Use the (possibly new) image URL
        price: Number(data.price), // Ensure number type
      };

      console.log('Final payload:', payload);

      let response;
      if (product) {
        // Update existing product
        response = await api.put(`/products/${product.id}`, payload);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        response = await api.post('/products', payload);
        toast.success('Product created successfully!');
      }
      
      console.log('API response:', response.data);
      
      // Close modal and refresh product list
      onClose();
      if (onProductSaved) {
        onProductSaved(); // Callback to refresh parent component
      }
      
    } catch (err: unknown) {
      // Rollback: Delete uploaded image if form submission failed
      if (newImageUploaded && uploadedImageUrl) {
        try {
          await deleteProductImage(uploadedImageUrl);
          console.log('Rolled back image upload due to form submission failure');
        } catch (deleteError) {
          console.error('Failed to rollback image upload:', deleteError);
        }
      }
      
      let errorMessage = 'Failed to save product';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        errorMessage = errorObj.response?.data?.error || errorMessage;
      }
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const categories = [
    { value: 'indoor', label: 'Indoor Plants' },
    { value: 'outdoor', label: 'Outdoor Plants' },
  ];

  const isSubmitting = loading || uploadingImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image {uploadingImage && '(Uploading...)'}
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 flex flex-col items-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-32 w-32 object-cover rounded-lg border shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {product?.path && !selectedImage ? 'Current image' : 'New image preview'}
                </p>
              </div>
            )}
            
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPEG, PNG, WebP. Max size: 5MB
            </p>
            {errors.path && (
              <p className="text-red-500 text-sm mt-1">{errors.path.message}</p>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                {...register('name', { 
                  required: 'Product name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Kshs) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                  valueAsNumber: true
                })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="0.00"
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={3}
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Describe the product features and benefits..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>


          {/* Active Status */}
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('active')}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-700">Active Product</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {uploadingImage ? 'Uploading Image...' : (product ? 'Updating...' : 'Creating...')}
                </>
              ) : (
                product ? 'Update Product' : 'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;