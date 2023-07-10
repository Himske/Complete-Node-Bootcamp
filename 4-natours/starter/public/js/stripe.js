/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('stripe_key');

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
