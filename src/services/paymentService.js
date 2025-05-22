// This is a mock service for Stripe payments
// In a real application, these calls would go to your backend

export const createPaymentIntent = async (planId, billingInterval) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    clientSecret: 'mock_client_secret',
    amount: planId === 'basic' ? 1999 : planId === 'standard' ? 3999 : 5999,
    currency: 'usd'
  };
};

export const confirmSubscription = async (paymentMethodId, planId, billingInterval) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    success: true,
    subscriptionId: 'mock_subscription_' + Math.random().toString(36).substring(2, 15),
    customerId: 'mock_customer_' + Math.random().toString(36).substring(2, 15),
    currentPeriodEnd: new Date(Date.now() + (billingInterval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
  };
};