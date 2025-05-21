// Consistent placeholder images to avoid hydration mismatches

// Import images directly from the assets folder
import logo from '../assets/images/logo.webp';
import avatar from '../assets/images/avatar.webp';
import mathImg from '../assets/images/math.png';
import mathDetailImg from '../assets/images/math.webp';
import englishImg from '../assets/images/english.png';
import scienceImg from '../assets/images/science.png';
import historyImg from '../assets/images/history.png';
import naplanImg from '../assets/images/naplan.png';
import defaultImg from '../assets/images/default.webp';
import heroImg from '../assets/images/hero-image.jpg';
import testimonialBg from '../assets/images/testimonial-bg.jpg';
import step1 from '../assets/images/step-1.jpg';
import step2 from '../assets/images/step-2.jpg';
import step3 from '../assets/images/step-3.jpg';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg';
import testimonial3 from '../assets/images/testimonial-3.jpg';
import iconPersonalize from '../assets/images/icon-personalized.png';
import iconFlexible from '../assets/images/icon-flexible.jpg';
import iconResults from '../assets/images/icon-results.webp';

export const placeholderImages = {
  logo: logo,
  avatar: avatar,
  subject: {
    math: mathImg,
    math_detail: mathDetailImg,
    english: englishImg,
    science: scienceImg,
    history: historyImg,
    naplan: naplanImg,
    default: defaultImg
  },
  hero: heroImg,
  testimonial: testimonialBg,
  steps: {
    step1: step1,
    step2: step2,
    step3: step3
  },
  testimonials: {
    testimonial1: testimonial1,
    testimonial2: testimonial2,
    testimonial3: testimonial3
  },
  icons: {
    personalized: iconPersonalize,
    flexible: iconFlexible,
    results: iconResults
  }
};

// Function to get a subject image with fallback
export const getSubjectImage = (subjectId) => {
  return placeholderImages.subject[subjectId] || placeholderImages.subject.default;
};



