import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(
  "pk_test_51NWarsExrxFsGEFS4LZDzpdtlpctyWPuSeQv9lTc0VSicil2rH2GYuHka1etEbPul2VZrx49FKAp8gFV73vd1geW009GUnlk5i"
);

const App = () => {
  return (
    <div>
      <h1>Trang thanh toán</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default App;
