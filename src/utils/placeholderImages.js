// Consistent placeholder images to avoid hydration mismatches

export const placeholderImages = {
  logo: '/logo.png',
  avatar: '/avatar-placeholder.png',
  subject: {
    math: '/subject-math.png',
    english: '/subject-english.png',
    science: '/subject-science.png',
    history: '/subject-history.png',
    naplan: '/subject-naplan.png',
    default: '/subject-default.png'
  },
  hero: '/hero-image.jpg',
  testimonial: '/testimonial-bg.jpg',
  steps: {
    step1: '/step-1.jpg',
    step2: '/step-2.jpg',
    step3: '/step-3.jpg'
  },
  testimonials: {
    testimonial1: '/testimonial-1.jpg',
    testimonial2: '/testimonial-2.jpg',
    testimonial3: '/testimonial-3.jpg'
  },
  icons: {
    personalized: '/icon-personalize.png',
    flexible: '/icon-flexible.png',
    results: '/icon-results.png'
  }
};

// Function to get a subject image with fallback
export const getSubjectImage = (subjectId) => {
  return placeholderImages.subject[subjectId] || placeholderImages.subject.default;
};

