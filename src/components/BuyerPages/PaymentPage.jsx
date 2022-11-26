const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;

// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../../Contexts/AuthContext";

import toast from "react-hot-toast";
import Loader from "../Shared/Loader";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import "./stripe.css";

const CheckoutForm = ({
  price,
  buyer_name,
  buyer_email,
  product_id,
  paid,
  refetch,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    };
    fetch(`${SERVER}/create-payment-intent`, options)
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: buyer_name,
            email: buyer_email,
          },
        },
      });
    if (confirmError) {
      console.error("CONFIRM ERROR");
      console.error(confirmError);
    }

    console.log(paymentIntent);
    if (paymentIntent?.status === "succeeded") {
      paymentIntent["product_id"] = product_id;
      paymentIntent["buyer_email"] = buyer_email;
      paymentIntent["buyer_email"] = buyer_name;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentIntent),
      };
      try {
        const res = await fetch(`${SERVER}/payment`, options);
        const result = await res.json();
        if (result.updateResponse.acknowledged) {
          toast.success("Successfully Paid!");
          refetch();
          navigate("/my-orders");
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment Failed");
      }
    }

    setProcessing(false);

    if (error) {
      console.log("[error]", error);
    } else {
      console.table(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          clientSecret,
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || !clientSecret || processing || paid}
      >
        {processing ? "Processing..." : paid ? "Paid" : "Pay"}
      </button>
    </form>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PK);

export default function PaymentPage() {
  const { product_id } = useParams();
  const { activeUser, authLoading } = useContext(userContext);

  const {
    data: product,
    status,
    refetch,
  } = useQuery({
    queryKey: [product_id],
    queryFn: async () => {
      const url = `${SERVER}/products?product_id=${product_id}`;
      const res = await fetch(url);
      const product = await res.json();
      let data;
      if (!product.length) {
        data = 0;
      }
      data = product[0];
      return data;
    },
  });

  if (status === "loading" || authLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Payment</h1>
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <p>
          Product Name: <strong>{product.productName}</strong>{" "}
        </p>
        <p>
          Price: <strong>$ {product.resalePrice}</strong>{" "}
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={product?.resalePrice || 1}
            product_id={product_id}
            buyer_name={activeUser.displayName}
            buyer_email={activeUser.email}
            paid={product?.paid}
            refetch={refetch}
          />
        </Elements>
      </div>
    </div>
  );
}