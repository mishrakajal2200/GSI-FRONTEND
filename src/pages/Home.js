

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubscribeSection from '../pages/SubscribeSection.js';
import ImageCard from '../components/ImageCard.js'; // ✅ Now using ImageCard instead of ProductCard

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://gsi-backend-1.onrender.com/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  
 

  const handleShopNow = () => {
    navigate("/shop");
  };

  const heroImages = [
    "https://cdn.shopify.com/s/files/1/0069/8974/2141/files/2-New-launch-Offer-Banner_5000x.jpg?v=1670829852",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://www.sbicard.com/sbi-card-en/assets/docs/html/personal/offers/eoss/july/img/vip-1920X575.jpg",
    "https://safaribags.com/cdn/shop/files/SF-LuggageCollection-Banner-2160_x_1080.jpg?v=1726637548&width=1600"
  ];

  const categories = [
    { name: 'BackPack', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHwIO6pNlZ6f3Q2aA7Op5luZEddDT2OAywQ&s' },
    { name: 'Laptop BackPack', img: 'https://shop.kesari.in/cdn/shop/products/xeno-laptop-backpack-blue-orange-1_c7eecf62-3959-4c2e-9321-59772ff5d530.jpg?v=1702624172' },
    { name: 'Duffle BackPack', img: 'https://harissonsbags.com/cdn/shop/files/Black_grey_Red.webp?v=1736158648' },
    { name: 'Messenger', img: 'https://www.cosmus.in/images/products/med/40051021075_1.jpg' },
    { name: 'Office Bags', img: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/backpack/h/i/r/-original-imah5r4g7qfufwhd.jpeg?q=20&crop=false' },
    { name: 'Luggage', img: 'https://m.media-amazon.com/images/I/51E6EopGIzL._AC_UY1100_.jpg' },
    { name: 'Kitchen', img: 'https://img-prd-pim.poorvika.com/cdn-cgi/image/width=390,height=390,quality=75/pageimg/prestige-mobile-banner-create-a-dream-kitchen-prestige.png' },
    { name: 'GSI EnterPrice', img: 'https://www.rasoishop.com/cdn/shop/products/8901365116561-2.jpg?v=1668859671&width=1445' }
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    arrows: false,
    dots: true,
    pauseOnHover: false,
  };

  return (
    <div className="w-full font-sans bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen">
      <ToastContainer />

      {/* Hero Slider */}
      <section className="relative hidden sm:block">
        <Slider {...settings}>
          {heroImages.map((img, i) => (
            <div key={i} className="w-full h-[400px] flex justify-center items-center bg-white relative">
              <img src={img} alt={`Slide ${i}`} className="w-full max-h-[400px] object-cover" />
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                <div className="text-white text-center px-6 md:px-12">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Exclusive Deals Just for You
                  </h1>
                  <p className="text-lg sm:text-xl mb-6 max-w-xl mx-auto">
                    Shop the latest trends with amazing discounts and get the best deals!
                  </p>
                  <button
                    onClick={handleShopNow}
                    className="bg-white text-black py-3 px-8 rounded-full font-semibold text-lg hover:scale-105 transition"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {categories.map((cat, index) => {
  const routePath = `/shop?category=${encodeURIComponent(cat.name)}`;
  return (
    <Link
      key={index}
      to={routePath}
      className="group relative border p-4 rounded-xl bg-white shadow hover:shadow-xl transition"
    >
      <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{cat.name}</h3>
    </Link>
  );
})}

          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((item) => (
              <ImageCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};

export default Home;
