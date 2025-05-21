import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';

// Create a new document with a specified ID
export const createDocument = async (collectionName, documentId, data) => {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, data);
  return { id: documentId, ...data };
};

// Create a new document with auto-generated ID
export const addDocument = async (collectionName, data) => {
  const docRef = doc(collection(db, collectionName));
  await setDoc(docRef, data);
  return { id: docRef.id, ...data };
};

// Get a document by ID
export const getDocument = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

// Update a document
export const updateDocument = async (collectionName, documentId, data) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data);
  return { id: documentId, ...data };
};

// Delete a document
export const deleteDocument = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
  return documentId;
};

// Get all documents from a collection
export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];
  
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  
  return documents;
};

// Query documents with filters
export const queryDocuments = async (
  collectionName, 
  conditions = [], 
  orderByField = null, 
  orderDirection = 'asc', 
  limitCount = null
) => {
  let q = collection(db, collectionName);
  
  // Apply where conditions
  if (conditions.length > 0) {
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value));
    });
  }
  
  // Apply orderBy
  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection));
  }
  
  // Apply limit
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  
  const querySnapshot = await getDocs(q);
  const documents = [];
  
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  
  return documents;
};

