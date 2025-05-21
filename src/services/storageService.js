import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll 
} from 'firebase/storage';
import { storage } from '../firebase';

// Upload a file to storage
export const uploadFile = async (path, file) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      path,
      url: downloadURL,
      name: file.name,
      contentType: file.type,
      size: file.size
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Get download URL for a file
export const getFileUrl = async (path) => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return path;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// List all files in a directory
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path);
    const res = await listAll(storageRef);
    
    const filePromises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        path: itemRef.fullPath,
        url
      };
    });
    
    return await Promise.all(filePromises);
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};