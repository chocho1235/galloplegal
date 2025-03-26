import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

// Initialise Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 