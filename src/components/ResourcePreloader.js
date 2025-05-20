import React, { useEffect } from 'react';
import { preload, preloadModule, preinit, prefetchDNS, preconnect } from 'react-dom';

/**
 * Component that demonstrates various React 19 resource preloading techniques
 * This can be included in your App.js or specific pages where you want to preload resources
 */
const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical images
    preload('/logo.png', { as: 'image' });
    
    // Preload CSS that might be needed later
    preload('/additional-styles.css', { as: 'style' });
    
    // Preload JavaScript modules that will be needed later
    preloadModule('/modules/charts.js');
    
    // Preinit scripts that will be needed
    preinit('/scripts/analytics.js', { as: 'script' });
    
    // DNS prefetching for external resources
    prefetchDNS('https://api.example.com');
    
    // Preconnect to APIs that will be used
    preconnect('https://api.example.com');
    
    // Preload fonts
    preload('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap', { 
      as: 'style' 
    });
    
    // Preload subject images that might be needed soon
    const popularSubjects = ['math', 'english', 'science'];
    popularSubjects.forEach(subject => {
      preload(`/assets/subjects/${subject}.jpg`, { as: 'image' });
    });
    
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ResourcePreloader;
