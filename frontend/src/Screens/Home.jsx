import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import MyCarousel from "../Components/Carousel";
import "./Home.css"; // Ensure this is imported

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/getdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFoodItems(data.foodData || []);
      setFoodCategory(data.foodCategory || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" ">
      <Navbar />
      <MyCarousel onSearch={setSearchQuery} />

      {/* ✅ Announcement bar moved to its own div */}
      <div className="announcement-bar mt-5 bg-success ">
        <div className="announcement-content">
        <h5> Welcome to FoodFleet ! Your hunger, our priority! Free delivery on orders above ₹500. 🎉 Check our new offers!</h5>
        </div>
      </div>

      <div className="food-section-bg">
        <div className="container my-3 ">
          {loading && <p className="text-white text-center">Loading...</p>}
          {error && (
            <p className="text-danger text-center">
              Error: {error}. Please check your backend.
            </p>
          )}
          {!loading && !error && foodCategory.length > 0 ? (
            foodCategory.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="d-flex justify-content-center align-items-center mb-2 mt-5">
                  <h2 className="text-white mb-3 w-200px fw-bold">{category.CategoryName}</h2>
                </div>
                <hr />
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  {foodItems
                    .filter((item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                      <Card
                        className="card"
                        key={index}
                        name={item.name}
                        img={item.img}
                        description={item.description}
                        options={item.options}
                        foodItem={item}
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="text-white text-center">No data found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}