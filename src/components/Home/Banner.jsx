import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <Carousel className="carauselContainer">
      <Carousel.Item interval={3000} key={1}>
        <img
          className="d-block w-100 carauselImg"
          src={`/SliderPic1.jpg`}
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item interval={3000} key={2}>
        <img
          className="d-block w-100 carauselImg"
          src={`/SliderPic2.jpg`}
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item interval={3000} key={3}>
        <img
          className="d-block w-100 carauselImg"
          src={`/SliderPic3.jpg`}
          alt=""
        />
      </Carousel.Item>
    </Carousel>
  );
}
