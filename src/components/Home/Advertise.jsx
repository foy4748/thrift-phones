import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";

import { useNavigate } from "react-router-dom";
import { Row, Container } from "react-bootstrap";

import BookingModal from "../BuyerPages/BookingModal";

import { userContext } from "../../Contexts/AuthContext";
import { useContext, useState } from "react";

import ProductCard from "../BuyerPages/ProductCard";
import toast from "react-hot-toast";
import useCheckRole from "../../Hooks/useCheckRole";
import axiosClient from "../../axios";

// ---------------------------

export default function Advertise() {
  const [activeProduct, setActiveProduct] = useState(null);
  const { activeUser, logOutHandler } = useContext(userContext);
  const navigate = useNavigate();

  const advertised = 1;
  const {
    data: advertisedProducts,
    status,
    refetch,
  } = useQuery({
    queryKey: [advertised],
    queryFn: async () => {
      const url = `/products?advertised=${advertised}`;
      const { data } = await axiosClient.get(url);
      return data;
    },
  });

  // Modal States
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleClose = () => setIsOpenBookingModal(false);
  const [userRole] = useCheckRole(activeUser?.uid, "buyer");

  const handleOpen = (product_id) => {
    if (!activeUser || !activeUser?.uid) {
      toast.error("Please, Login using Buyer account First");
    }

    if (!userRole) {
      logOutHandler()
        .then(() => {
          toast.error(`Please, Login using BUYER account`);
          navigate("/login", { replace: true });
        })
        .catch((error) => console.error(error));
    }

    const activeProduct = advertisedProducts.find(
      (itm) => itm._id === product_id
    );
    setActiveProduct(activeProduct);
    setIsOpenBookingModal(true);
  };

  // Handle add to Wishlist
  const handleAddtoWishList = async (
    product_id,
    seller_uid,
    uid = activeUser?.uid
  ) => {
    if (!activeUser || !activeUser?.uid) {
      toast.error("Please, Login First");
      navigate("/login", { replace: true });
      return;
    }

    if (!userRole) {
      logOutHandler()
        .then(() => {
          toast.error(`Please, Login using BUYER account`);
          navigate("/login", { replace: true });
        })
        .catch((error) => console.error(error));
    }
    try {
      const { data: result } = await axiosClient.post(`/wishlist`, {
        product_id,
        seller_uid,
      });
      if (result.acknowledged) {
        toast.success("Added to your Wish List");
      } else {
        console.error(result);
        toast.error("Failed to add product to Wish List");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to Wish List");
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  const payload = {
    isOpenBookingModal,
    handleClose,
    activeProduct,
    activeUser,
    refetch,
  };

  if (!advertisedProducts?.length) {
    return null;
  }

  return (
    <div className="my-5">
      <BookingModal payload={payload} />
      {advertisedProducts?.length && (
        <>
          <h1>Advertised Products</h1>
          <Container>
            <Row md={1} lg={3}>
              {advertisedProducts.length &&
                advertisedProducts.map((product) => {
                  return (
                    <ProductCard
                      key={product._id}
                      product={product}
                      handleOpen={handleOpen}
                      handleAddtoWishList={handleAddtoWishList}
                    />
                  );
                })}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}
