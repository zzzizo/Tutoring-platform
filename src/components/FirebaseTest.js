import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Card, Button, Alert } from 'react-bootstrap';

const FirebaseTest = () => {
  const [authStatus, setAuthStatus] = useState('Checking...');
  const [firestoreStatus, setFirestoreStatus] = useState('Not tested');
  const [storageStatus, setStorageStatus] = useState('Not tested');
  const [error, setError] = useState(null);

  // Test Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(`Connected as: ${user.email}`);
      } else {
        setAuthStatus('Not signed in, but connection works');
      }
    }, (error) => {
      setAuthStatus('Failed to connect to Authentication');
      setError(error.message);
    });

    return unsubscribe;
  }, []);

  // Test Firestore
  const testFirestore = async () => {
    try {
      setFirestoreStatus('Testing...');
      
      // Try to write a test document
      const testCollection = collection(db, 'test_connection');
      const docRef = await addDoc(testCollection, {
        timestamp: new Date().toISOString(),
        test: 'Connection test'
      });
      
      // Try to read from Firestore
      const querySnapshot = await getDocs(testCollection);
      const docsCount = querySnapshot.size;
      
      setFirestoreStatus(`Connected successfully! Added doc ID: ${docRef.id}, Collection has ${docsCount} documents`);
    } catch (error) {
      setFirestoreStatus('Failed to connect to Firestore');
      setError(error.message);
    }
  };

  // Test Storage
  const testStorage = async () => {
    try {
      setStorageStatus('Testing...');
      
      // Create a reference to a test file
      const testRef = ref(storage, 'test_connection/test.txt');
      
      // Upload a small string
      await uploadString(testRef, 'This is a connection test');
      
      // Try to get the download URL
      const url = await getDownloadURL(testRef);
      
      setStorageStatus(`Connected successfully! File URL: ${url}`);
    } catch (error) {
      setStorageStatus('Failed to connect to Storage');
      setError(error.message);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Header as="h4">Firebase Connection Test</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="mb-4">
            <h5>Authentication</h5>
            <p className={authStatus.includes('Failed') ? 'text-danger' : 'text-success'}>
              {authStatus}
            </p>
          </div>
          
          <div className="mb-4">
            <h5>Firestore</h5>
            <p className={firestoreStatus.includes('Failed') ? 'text-danger' : 
                          firestoreStatus.includes('Connected') ? 'text-success' : 'text-secondary'}>
              {firestoreStatus}
            </p>
            <Button variant="primary" onClick={testFirestore}>
              Test Firestore Connection
            </Button>
          </div>
          
          <div className="mb-4">
            <h5>Storage</h5>
            <p className={storageStatus.includes('Failed') ? 'text-danger' : 
                          storageStatus.includes('Connected') ? 'text-success' : 'text-secondary'}>
              {storageStatus}
            </p>
            <Button variant="primary" onClick={testStorage}>
              Test Storage Connection
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FirebaseTest;