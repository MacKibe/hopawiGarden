import { supabase } from '../config/supabase';

export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPEG, PNG, or WebP images.');
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('testing_bucket')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('testing_bucket')
      .getPublicUrl(filePath);

    console.log('Image uploaded successfully:', publicUrl);
    return publicUrl;

  } catch (error) {
    console.error('Image upload service error:', error);
    throw error;
  }
};

export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split('/');
    const filePath = pathSegments.slice(pathSegments.indexOf('testing_bucket')).join('/');
    
    const { error } = await supabase.storage
      .from('testing_bucket')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  } catch (error) {
    console.error('Image deletion error:', error);
    throw error;
  }
};