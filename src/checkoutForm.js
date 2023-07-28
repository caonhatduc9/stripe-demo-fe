import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, // Số tiền thanh toán (đơn vị là cent, ví dụ: 1000 cent = $10)
          }),
        }
      );
    // console.log("check",await response.json());
      const { clientSecret } = await response.json();
console.log("clientSecret",clientSecret);
      const { error, paymentMethod } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.log(error.message);
        // Xử lý lỗi khi thanh toán
      } else {
        console.log("Thanh toán thành công:", paymentMethod);
        // Xử lý khi thanh toán thành công
      }
    } catch (error) {
      console.log("Lỗi:", error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Đang thanh toán..." : "Thanh toán"}
      </button>
    </form>
  );
};

export default CheckoutForm;
