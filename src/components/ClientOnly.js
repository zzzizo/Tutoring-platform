import { useState, useEffect } from 'react';

// This component only renders its children on the client
// Use this for components that use browser-only APIs or need to differ from server rendering
const ClientOnly = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
};

export default ClientOnly;