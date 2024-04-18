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
import axiosClient from "../../axios";

const CheckoutForm = ({
  productPurchased,
  price,
  buyerName,
  buyer_email,
  buyer_uid,
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
    axiosClient.post(`/create-payment-intent`, { price }).then(({ data }) => {
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
            name: buyerName,
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
      // Adding More additional Info for payment record
      paymentIntent["product_id"] = product_id;
      paymentIntent["buyer_email"] = buyer_email;
      paymentIntent["buyerName"] = buyerName;
      paymentIntent["buyer_uid"] = buyer_uid;
      paymentIntent["productPurchased"] = productPurchased;

      try {
        const { result } = await axiosClient.post(`/payment`, paymentIntent);
        if (result.updateResponse.acknowledged) {
          setProcessing(false);
          toast.success("Successfully Paid!");
          refetch();
          navigate("/my-orders");
        }
      } catch (error) {
        console.error(error);
        setProcessing(false);
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
        className="btnPrimary text-center"
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
      const url = `/products?product_id=${product_id}`;
      const { data: product } = await axiosClient.get(url);
      let data;
      if (!product.length) {
        data = 0;
      }
      data = product[0];
      return data;
    },
  });

  useEffect(() => {
    window.document.title = `Payment | ${
      product?.productName ? product?.productName : ""
    }`;
  }, [product]);

  if (status === "loading" || authLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-5">
      <h1>Payment</h1>
      <div className="mx-auto d-md-flex" style={{ maxWidth: "800px" }}>
        <picture className="w-100">
          <img
            className="w-100 p-3"
            src={product.photoURL}
            alt={product.productName}
          />
        </picture>
        <div>
          <p>
            <strong>{product.productName}</strong>{" "}
          </p>
          <p>Condition: {product?.condition?.toUpperCase()}</p>
          <p>
            Seller Name: <strong>{product?.sellerName}</strong>{" "}
          </p>
          <p>
            Price: <strong>$ {product.resalePrice}</strong>{" "}
          </p>
          <p>
            <strong>Description</strong>
          </p>
          <p className="text-justify">{product.description}</p>
          <p>Fill out your Credit card info</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              price={product?.resalePrice || 1}
              productPurchased={product}
              product_id={product_id}
              buyerName={activeUser.displayName}
              buyer_email={activeUser.email}
              buyer_uid={activeUser.uid}
              paid={product?.paid}
              refetch={refetch}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
