import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Carousel.css";

export default function MyCarousel({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="carousel-container">
      <Carousel fade>
        {/* Carousel Items */}
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg"
            alt="pizza"
            style={{ filter: "brightness(30%)" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg"
            alt="burger"
            style={{ filter: "brightness(30%)" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&h=700"
            alt="chicken biryani"
            style={{ filter: "brightness(30%)" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://images.pexels.com/photos/9027521/pexels-photo-9027521.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="samosa"
            style={{ filter: "brightness(30%)" }}
          />
        </Carousel.Item>
      </Carousel>

      <form
        className="d-flex justify-content-center"
        style={{ marginTop: "-100px", position: "relative", zIndex: "1" }}
        onSubmit={handleSearchSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search your food..."
          aria-label="Search"
          style={{ maxWidth: "500px" }}
          value={search}
          onChange={handleSearchChange}
        />
        <button className="btn bg-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}