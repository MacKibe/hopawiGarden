import { useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import api from '../../config/axios';
import type { Product, ProductImage } from '../../types';
import { toast } from 'react-hot-toast';
import { uploadProductImage, deleteProductImage } from '../../services/ImageUploadService';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onProductSaved?: () => void;
}

type ProductFormData = Omit<Product, 'product_id'>;


const planterTypes = [
  { value: 'planter' as const, label: 'Planter' },
  { value: 'clay_pot' as const, label: 'Clay Pot' },
];

const planterSizes = [
  { value: 'extra_small' as const, label: 'Extra Small' },
  { value: 'small' as const, label: 'Small' },
  { value: 'medium' as const, label: 'Medium' },
  { value: 'large' as const, label: 'Large' },
  { value: 'extra_large' as const, label: 'Extra Large' },
];

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onProductSaved }) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.path || '');
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>(product?.images || []);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || 'indoor',
      active: product?.active ?? true,
      path: product?.path || '',
      planter_details: product?.planter_details || {
        type: 'planter',
        size: 'medium',
        color: ''
      }
    }
  });

  // Handle main image change (for thumbnail)
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
      setValue('path', 'image-uploaded');
    }
  };

  // Handle additional images
  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate files
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Please upload JPEG, PNG, or WebP images.`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`File too large: ${file.name}. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setAdditionalImages(prev => [...prev, ...validFiles]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageId: string, imageUrl: string) => {
    try {
      // Delete from database
      await api.delete(`/products/images/${imageId}`);
      
      // Delete from storage
      await deleteProductImage(imageUrl);
      
      // Update local state
      setExistingImages(prev => prev.filter(img => img.image_id !== imageId));
      
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Failed to remove image:', error);
      toast.error('Failed to remove image');
    }
  };

  const uploadAdditionalImages = async (productId: string): Promise<void> => {
    if (additionalImages.length === 0) return;

    setUploadingImage(true);
    
    try {
      for (const image of additionalImages) {
        // Upload to storage
        const imageUrl = await uploadProductImage(image);
        
        // Save to product_images table
        await api.post(`/products/${productId}/images`, { imageUrl });
      }
      
      toast.success(`${additionalImages.length} additional image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Failed to upload additional images:', error);
      throw new Error('Failed to upload additional images');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    let uploadedImageUrl = product?.path || '';
    let newImageUploaded = false;

    try {
      // Upload main image if selected
      if (selectedImage) {
        setUploadingImage(true);
        uploadedImageUrl = await uploadProductImage(selectedImage);
        newImageUploaded = true;
        toast.success('Main image uploaded successfully!');
      }

      console.log('Submitting product data:', data);
      
      // Prepare payload with image URL
      const payload = {
        ...data,
        path: uploadedImageUrl,
        price: Number(data.price),
        planter_details: data.planter_details
      };

      console.log('Final payload:', payload);

      let response;
      let productId: string;

      if (product) {
        // Update existing product
        response = await api.put(`/products/${product.product_id}`, payload);
        productId = product.product_id;
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        response = await api.post('/products', payload);
        productId = response.data.product_id;
        toast.success('Product created successfully!');
      }
      
      console.log('API response:', response.data);
      
      // Upload additional images
      if (additionalImages.length > 0) {
        await uploadAdditionalImages(productId);
      }
      
      // Close modal and refresh product list
      onClose();
      if (onProductSaved) {
        onProductSaved();
      }
      
    } catch (err: unknown) {
      // Rollback: Delete uploaded images if form submission failed
      if (newImageUploaded && uploadedImageUrl) {
        try {
          await deleteProductImage(uploadedImageUrl);
          console.log('Rolled back main image upload due to form submission failure');
        } catch (deleteError) {
          console.error('Failed to rollback main image upload:', deleteError);
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
    { value: 'planter', label: 'Planters' },
  ];

  const isSubmitting = loading || uploadingImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Main Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Product Image (Thumbnail) {uploadingImage && '(Uploading...)'}
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

          {/* Additional Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Product Images
            </label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {existingImages.map((image) => (
                    <div key={image.image_id} className="relative group">
                      <img 
                        src={image.image_url} 
                        alt="Product" 
                        className="h-24 w-full object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.image_id, image.image_url)}
                        disabled={isSubmitting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Additional Images Preview */}
            {additionalImages.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {additionalImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Preview ${index + 1}`} 
                        className="h-24 w-full object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        disabled={isSubmitting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleAdditionalImagesChange}
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select multiple images. Supported formats: JPEG, PNG, WebP. Max size: 5MB per image
            </p>
          </div>

          {/* ... rest of the form remains the same (Basic Information, Description, Category, Planter Details, etc.) */}
          
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

          {/* Planter Details Section - Always Required */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Planter Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              {/* Planter Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Planter Type *
                </label>
                <select
                  {...register('planter_details.type', { 
                    required: 'Planter type is required'
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <option value="">Select type</option>
                  {planterTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.planter_details?.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.planter_details.type.message}</p>
                )}
              </div>

              {/* Planter Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Planter Size *
                </label>
                <select
                  {...register('planter_details.size', { 
                    required: 'Planter size is required'
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <option value="">Select size</option>
                  {planterSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
                {errors.planter_details?.size && (
                  <p className="text-red-500 text-sm mt-1">{errors.planter_details.size.message}</p>
                )}
              </div>

              {/* Planter Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  {...register('planter_details.color', { 
                    required: 'Color is required'
                  })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="e.g., Terracotta, White, Black..."
                  disabled={isSubmitting}
                />
                {errors.planter_details?.color && (
                  <p className="text-red-500 text-sm mt-1">{errors.planter_details.color.message}</p>
                )}
              </div>
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
                  {uploadingImage ? 'Uploading Images...' : (product ? 'Updating...' : 'Creating...')}
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