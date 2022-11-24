import { Form } from "react-bootstrap";
import useGetCategories from "../../Hooks/useGetCategories";
import { useForm } from "react-hook-form";
import { userContext } from "../../Contexts/AuthContext";
import { useContext } from "react";

import Loader from "../Shared/Loader";

// Validate Inputs later
// Add Photo Upload later

export default function AddAProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [categories, categoriesLoading] = useGetCategories();
  const { activeUser, authLoading } = useContext(userContext);

  const formSubmission = (data) => {
    console.log(data);
    if (data.categoryId == "false") {
      console.log("hit");
    }
    console.log(activeUser.uid);
  };
  if (authLoading || categoriesLoading) {
    return <Loader />;
  }
  return (
    <div>
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
                <option key={_id} value={_id} defaultValue={categories[0]._id}>
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
        <div className="d-flex justify-content-between">
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
        <Form.Group className="mb-3" controlId="photo-url">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Photo URL"
            rows={3}
            {...register("photoURL")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="product-description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("description")} />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <input type="submit" value="Submit" />
        </div>
      </Form>
    </div>
  );
}
