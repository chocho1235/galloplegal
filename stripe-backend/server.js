import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(stripeSecretKey);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Middleware to verify admin key
const verifyAdminKey = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY;
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== adminKey) {
    return res.status(401).json({ error: 'Invalid admin key' });
  }

  next();
};

// Endpoint to create a payment intent for a single question
app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('Received payment intent request:', req.body);
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Generate a unique reference number
    const referenceNumber = uuidv4().substring(0, 8).toUpperCase();

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      referenceNumber,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a subscription
app.post('/create-subscription', async (req, res) => {
  try {
    console.log('Received subscription request:', req.body);
    const { priceId, customerEmail } = req.body;

    // Create a new customer
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // Generate a unique reference number
    const referenceNumber = uuidv4().substring(0, 8).toUpperCase();

    res.status(200).send({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      referenceNumber,
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received checkout session request:', req.body);
    const { amount, currency, question } = req.body;
    
    if (!amount || !currency || !question) {
      throw new Error('Missing required fields');
    }

    // Generate a unique reference number
    const referenceNumber = uuidv4().substring(0, 8).toUpperCase();

    // Create a Checkout Session with a line item that includes the question as the product name
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: question,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      // Pass the reference number and question back via query parameters
      success_url: `http://localhost:5177/success?reference=${referenceNumber}&question=${encodeURIComponent(question)}`,
      cancel_url: `http://localhost:5177/cancel`,
      metadata: { referenceNumber }
    });

    console.log('Created checkout session:', session.id);
    res.status(200).send({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to verify payment reference number
app.get('/verify-payment/:referenceNumber', verifyAdminKey, async (req, res) => {
  try {
    const { referenceNumber } = req.params;
    
    // Search for the session with the reference number in metadata
    const sessions = await stripe.checkout.sessions.list({
      limit: 1,
      metadata: { referenceNumber }
    });

    if (sessions.data.length === 0) {
      return res.status(404).json({
        isValid: false,
        message: 'Payment not found'
      });
    }

    const session = sessions.data[0];
    
    res.json({
      isValid: true,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      question: session.metadata.question
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS enabled for:', ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177']);
}); 