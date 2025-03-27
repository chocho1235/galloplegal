import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Load environment variables
dotenv.config();

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51R73MMQ0wlZSw6rnBaQcomg1QIOT3oAuKNtfZl3yN9D0oxoGwLYBZVey9ttDYP3xujLInzIYo9iAZYQCdDZvI6bm00fyMeepSf');

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to create a payment intent for a single question
app.post('/create-payment-intent', async (req, res) => {
  try {
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
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a subscription
app.post('/create-subscription', async (req, res) => {
  try {
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
    res.status(500).send({ error: error.message });
  }
});

// New endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency, question } = req.body;
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
      success_url: `http://localhost:3000/success?reference=${referenceNumber}&question=${encodeURIComponent(question)}`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: { referenceNumber }
    });

    res.status(200).send({ sessionId: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 