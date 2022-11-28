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
        <Carousel.Caption className="centeringCaption">
          <div className="d-flex justify-content-between">
            <div className="leftPart">
              <h1>Need a Phone ?</h1>
              <p>Buy phones less than market price</p>
              <Link to={"/category/637e7c78e4a3ee128ee5f90f"}>
                <button className="boder btnPrimary">Android Phones</button>
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} key={2}>
        <img
          className="d-block w-100 carauselImg"
          src={`/SliderPic2.jpg`}
          alt=""
        />
        <Carousel.Caption className="centeringCaption">
          <div className="d-flex justify-content-between">
            <div className="leftPart">
              <h1>Fancy an iPhone?</h1>
              <p>We have them too</p>
              <Link to={"/category/637e7c97e4a3ee128ee5f911"}>
                <button className="boder btnPrimary">Buy iPhones</button>
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} key={3}>
        <img
          className="d-block w-100 carauselImg"
          src={`/SliderPic3.jpg`}
          alt=""
        />
        <Carousel.Caption className="centeringCaption">
          <div className="d-flex justify-content-between">
            <div className="leftPart">
              <h1>Windows Phone</h1>
              <p>Find fancy old collections</p>
              <Link to={"/category/637e7caae4a3ee128ee5f913"}>
                <button className="boder btnPrimary">Windows Phones</button>
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
