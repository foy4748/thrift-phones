import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../../Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

import { Row, Container } from "react-bootstrap";
import Loader from "../Shared/Loader";

import toast from "react-hot-toast";
import useCheckRole from "../../Hooks/useCheckRole";

import ProductCard from "../BuyerPages/ProductCard";
import BookingModal from "./BookingModal";
import axiosClient from "../../axios";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState(null);
  const { activeUser, logOutHandler } = useContext(userContext);

  const {
    data: categoryProducts,
    status,
    refetch,
  } = useQuery({
    queryKey: [categoryId],
    queryFn: async () => {
      const url = `/products?categoryId=${categoryId}`;
      const { data: category } = await axiosClient.get(
        `/categories?categoryId=${categoryId}`
      );
      const { data: products } = await axiosClient.get(url);

      const data = { category: category[0], products };
      return data;
    },
  });

  useEffect(() => {
    window.document.title = `Category | ${
      categoryProducts?.category?.category_name
        ? categoryProducts?.category?.category_name
        : ""
    }`;
  }, [categoryProducts]);

  // Modal States
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleClose = () => setIsOpenBookingModal(false);
  const [userRole] = useCheckRole(activeUser?.uid, "buyer");
  const handleOpen = (product_id) => {
    if (!userRole) {
      logOutHandler()
        .then(() => {
          toast.error(`Please, Login using BUYER account`);
          navigate("/login", { replace: true });
        })
        .catch((error) => console.error(error));
    }
    const activeProduct = categoryProducts.products.find(
      (itm) => itm._id === product_id
    );
    setActiveProduct(activeProduct);
    setIsOpenBookingModal(true);
  };

  // Handle add to Wishlist
  const handleAddtoWishList = async (product_id, seller_uid) => {
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

  if (!categoryProducts?.products?.length) {
    return (
      <div>
        <h1>No Products Found</h1>
      </div>
    );
  }
  return (
    <div>
      <BookingModal payload={payload} />
      <h1>{categoryProducts.category.category_name}</h1>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {categoryProducts.products.length &&
            categoryProducts.products.map((product) => {
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
    </div>
  );
}
