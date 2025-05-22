import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51NxSampleKeyForTestingPurposesOnly');

const CheckoutForm = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // In a real application, you would call your backend to create a payment intent
    // For demo purposes, we'll simulate a successful payment
    
    try {
      // Simulate API call to create payment intent
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await stripe.confirmCardPayment('demo_payment_intent_id', {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Demo User',
          },
        }
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
      } else {
        // Payment successful
        setSuccess(true);
        setLoading(false);
        
        // Store subscription info in localStorage
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        userProfile.subscription = {
          plan: selectedPlan.name,
          price: selectedPlan.price,
          startDate: new Date().toISOString(),
          // Set end date to 30 days from now for monthly, 365 for yearly
          endDate: new Date(Date.now() + (selectedPlan.interval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
        <p className="text-green-700 mb-4">Thank you for subscribing to our {selectedPlan.name} plan.</p>
        <p className="text-sm text-green-600">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Details</h3>
        <div className="border border-gray-300 rounded-md p-4 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay ${selectedPlan.interval === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.price}`
        )}
      </button>
    </form>
  );
};

const Pricing = () => {
  const [billingInterval, setBillingInterval] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    setIsLoggedIn(!!userProfile);
  }, []);
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for occasional study help',
      price: '$19.99',
      yearlyPrice: '$199.99',
      features: [
        'Access to 3 subjects',
        'Basic AI tutoring',
        'Weekly progress reports',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Ideal for regular students',
      price: '$39.99',
      yearlyPrice: '$399.99',
      features: [
        'Access to all subjects',
        'Advanced AI tutoring',
        'Daily progress reports',
        'Priority email support'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Best for serious academic achievement',
      price: '$59.99',
      yearlyPrice: '$599.99',
      features: [
        'Everything in Standard',
        'Human tutor reviews',
        'Live Q&A sessions',
        'Phone support'
      ],
      popular: false
    }
  ];

  const handleSubscribeClick = (plan) => {
    if (!isLoggedIn) {
      // Store selected plan in session storage to retrieve after login
      sessionStorage.setItem('selectedPlan', JSON.stringify({...plan, interval: billingInterval}));
      navigate('/register');
    } else {
      setSelectedPlan({...plan, interval: billingInterval});
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose the plan that fits your child's learning needs
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            All plans include our AI-powered personalized learning system.
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="relative bg-white rounded-full p-1 flex">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`${
                  billingInterval === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-500'
                } py-2 px-6 rounded-full focus:outline-none transition-colors duration-200`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`${
                  billingInterval === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-500'
                } py-2 px-6 rounded-full focus:outline-none transition-colors duration-200 ml-2`}
              >
                Yearly
                <span className="ml-1 text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-lg shadow-md divide-y divide-gray-200 ${
                plan.popular ? 'border-2 border-blue-500 relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-gray-500">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {billingInterval === 'yearly' ? plan.yearlyPrice : plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{billingInterval === 'yearly' ? 'year' : 'month'}
                  </span>
                </p>
                <button
                  onClick={() => handleSubscribeClick(plan)}
                  className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isLoggedIn ? 'Subscribe Now' : 'Register & Subscribe'}
                </button>
              </div>
              
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included:</h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Can I switch plans later?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Is there a free trial?</h3>
            <p className="mt-2 text-gray-600">
              We offer a free assessment and sample lessons to help you determine if our platform is right for your child before subscribing.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">How many children can use one account?</h3>
            <p className="mt-2 text-gray-600">
              Each subscription is for one student. If you have multiple children, you can add additional student profiles at a discounted rate.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">What subjects are covered?</h3>
            <p className="mt-2 text-gray-600">
              Our platform covers Mathematics, Science, English, History, and more. The Basic plan includes access to 3 subjects, while Standard and Premium plans include all subjects.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Can I cancel anytime?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-700 font-medium">Still have questions?</p>
          <a 
            href="/contact" 
            className="inline-block mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 mt-20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to transform your child's learning experience?
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Join thousands of parents who have seen their children improve their grades and confidence with our AI tutoring platform.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigate('/learning-style-assessment')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Free Assessment
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
      
      {selectedPlan && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Subscribe to {selectedPlan.name} Plan
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Billing:</span>
                <span className="font-medium">{selectedPlan.interval === 'yearly' ? 'Yearly' : 'Monthly'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">{selectedPlan.interval === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.price}</span>
              </div>
            </div>
            
            <Elements stripe={stripePromise}>
              <CheckoutForm selectedPlan={selectedPlan} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;