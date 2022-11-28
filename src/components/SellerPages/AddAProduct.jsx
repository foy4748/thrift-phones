const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const IMG_BB_KEY = import.meta.env.VITE_IMG_BB_KEY;

import { Form, Container } from "react-bootstrap";
import useGetCategories from "../../Hooks/useGetCategories";
import { useForm } from "react-hook-form";

// Auth Related
import { userContext } from "../../Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../Shared/Loader";
import useCheckVerifiedSeller from "../../Hooks/useCheckVerifiedSeller";

import toast from "react-hot-toast";

// Validate Inputs later
// Add Photo Upload later

export default function AddAProduct() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.document.title = `Seller | Add a Product`;
  }, []);

  const [categories, categoriesLoading] = useGetCategories();
  const { activeUser, authLoading } = useContext(userContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isVefifiedSeller] = useCheckVerifiedSeller(activeUser?.uid);

  const formSubmission = async (data) => {
    toast.success("Uploading a product...");
    setIsUploading(true);
    // Uploading Photo to IMG BB ------------
    const photoFile = new FormData();
    const file = data["photoFile"][0];
    photoFile.append("image", file);

    const photoUpUrl = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
    const photoUpOptions = {
      method: "POST",
      body: photoFile,
    };

    let photoUpResult;
    try {
      const photoUpResponse = await fetch(photoUpUrl, photoUpOptions);
      photoUpResult = await photoUpResponse.json();
      if (!photoUpResult.success) {
        toast.error("Couldn't Upload Product Photo");
        setIsUploading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't Upload Product Photo");
      setIsUploading(false);
    }

    //------ ---------- ----------- ----------

    data["photoURL"] = photoUpResult.data.url;
    console.log(data["photoURL"]);
    data["postedTime"] = new Date();
    data["seller_uid"] = activeUser?.uid;
    data["sellerName"] = activeUser?.displayName;
    data["verified"] = isVefifiedSeller;

    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken,
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(`${SERVER}/products`, options);
      const result = await res.json();
      if (result.acknowledged) {
        toast.success("Successfully POSTed product");
        setIsUploading(false);
        reset();
        navigate("/dashboard/my-products");
      } else {
        toast.error("FAILED to post product");
        setIsUploading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("FAILED to post product");
      setIsUploading(false);
    }
  };
  if (authLoading || categoriesLoading || isUploading) {
    return <Loader />;
  }
  return (
    <div style={{ maxWidth: "800px" }} className="d-flex mx-auto mt-3">
      <Container>
        <h1>Add A Product</h1>
        <Form onSubmit={handleSubmit(formSubmission)}>
          <Form.Group className="mb-3" controlId="product-namt">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              {...register("productName")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product-category">
            <Form.Label>Select Category</Form.Label>
            <Form.Select
              aria-label="Category Selection"
              name="category"
              {...register("categoryId")}
            >
              {categories.length &&
                categories.map(({ _id, category_name }) => (
                  <option
                    key={_id}
                    value={_id}
                    defaultValue={categories[0]._id}
                  >
                    {category_name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="product-condition">
            <Form.Label>Select Condition</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="condition"
              {...register("condition")}
            >
              <option value="fair">Fair</option>
              <option value="good">Good</option>
              <option value="excellent">Excellent</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile-no">
            <Form.Label>Contact Mobile No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile no."
              {...register("mobile")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product-location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              {...register("location")}
            />
          </Form.Group>
          <div className="d-md-flex justify-content-between">
            <Form.Group className="mb-3" controlId="year-of-purchase">
              <Form.Label>Year of Purchase</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year of Purchase"
                {...register("purchaseYear")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="original-price">
              <Form.Label>Original Price (in $)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Original Price"
                {...register("originalPrice")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="resale-price">
              <Form.Label>Resale Price (in $)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Resale Price"
                {...register("resalePrice")}
              />
            </Form.Group>
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select Picture file of the Product</Form.Label>
            <Form.Control
              required
              name="photoFile"
              {...register("photoFile", { required: true })}
              type="file"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product-description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("description")}
              maxLength="200"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <input className="btnPrimary" type="submit" value="Submit" />
          </div>
        </Form>
      </Container>
    </div>
  );
}
