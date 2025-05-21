import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

// Upload a file to Firebase Storage
export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  
  return {
    path,
    url,
    name: file.name,
    contentType: file.type,
    size: file.size
  };
};

// Delete a file from Firebase Storage
export const deleteFile = async (path) => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
  return path;
};

// Get download URL for a file
export const getFileUrl = async (path) => {
  const storageRef = ref(storage, path);
  const url = await getDownloadURL(storageRef);
  return url;
};
