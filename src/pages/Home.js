

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SubscribeSection from '../pages/SubscribeSection.js';
// import ImageCard from '../components/ImageCard.js'; // ✅ Now using ImageCard instead of ProductCard

// const Home = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
  

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('https://gsi-backend-1.onrender.com/api/products');
//         setProducts(res.data);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

  
 

//   const handleShopNow = () => {
//     navigate("/shop");
//   };

//   const heroImages = [
//     "https://cdn.shopify.com/s/files/1/0069/8974/2141/files/2-New-launch-Offer-Banner_5000x.jpg?v=1670829852",
//     "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     "https://www.sbicard.com/sbi-card-en/assets/docs/html/personal/offers/eoss/july/img/vip-1920X575.jpg",
//     "https://safaribags.com/cdn/shop/files/SF-LuggageCollection-Banner-2160_x_1080.jpg?v=1726637548&width=1600"
//   ];

//   const categories = [
//     { name: 'Backpack', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHwIO6pNlZ6f3Q2aA7Op5luZEddDT2OAywQ&s' },
//     { name: 'Laptop Backpack', img: 'https://shop.kesari.in/cdn/shop/products/xeno-laptop-backpack-blue-orange-1_c7eecf62-3959-4c2e-9321-59772ff5d530.jpg?v=1702624172' },
//     { name: 'Duffle Backpack', img: 'https://harissonsbags.com/cdn/shop/files/Black_grey_Red.webp?v=1736158648' },
//     { name: 'Messenger', img: 'https://www.cosmus.in/images/products/med/40051021075_1.jpg' },
//     { name: 'Office Bags', img: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/backpack/h/i/r/-original-imah5r4g7qfufwhd.jpeg?q=20&crop=false' },
//     { name: 'Luggage', img: 'https://m.media-amazon.com/images/I/51E6EopGIzL._AC_UY1100_.jpg' },
//     { name: 'Kitchen', img: 'https://img-prd-pim.poorvika.com/cdn-cgi/image/width=390,height=390,quality=75/pageimg/prestige-mobile-banner-create-a-dream-kitchen-prestige.png' },
//     { name: 'GSI EnterPrises', img: 'https://www.rasoishop.com/cdn/shop/products/8901365116561-2.jpg?v=1668859671&width=1445' }
//   ];

//   const settings = {
//     autoplay: true,
//     autoplaySpeed: 2000,
//     infinite: true,
//     arrows: false,
//     dots: true,
//     pauseOnHover: false,
//   };

//   return (
//     <div className="w-full font-sans bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 min-h-screen">
//       <ToastContainer />

//       {/* Hero Slider */}
//       <section className="relative hidden sm:block">
//         <Slider {...settings}>
//           {heroImages.map((img, i) => (
//             <div key={i} className="w-full h-[400px] flex justify-center items-center bg-white relative">
//               <img src={img} alt={`Slide ${i}`} className="w-full max-h-[400px] object-cover" />
//               <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
//                 <div className="text-white text-center px-6 md:px-12">
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//                     Exclusive Deals Just for You
//                   </h1>
//                   <p className="text-lg sm:text-xl mb-6 max-w-xl mx-auto">
//                     Shop the latest trends with amazing discounts and get the best deals!
//                   </p>
//                   <button
//                     onClick={handleShopNow}
//                     className="bg-white text-black py-3 px-8 rounded-full font-semibold text-lg hover:scale-105 transition"
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* Categories */}
//       <section className="py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shop by Category</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
//           {categories.map((cat, index) => {
//   const routePath = `/shop?category=${encodeURIComponent(cat.name)}`;
//   return (
//     <Link
//       key={index}
//       to={routePath}
//       className="group relative border p-4 rounded-xl bg-white shadow hover:shadow-xl transition"
//     >
//       <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
//         <img
//           src={cat.img}
//           alt={cat.name}
//           className="w-full h-full object-contain group-hover:scale-110 transition-transform"
//         />
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{cat.name}</h3>
//     </Link>
//   );
// })}

//           </div>
//         </div>
//       </section>

//       {/* Products */}
//       <section className="py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {products.map((item) => (
//               <ImageCard key={item._id} product={item} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Subscribe Section */}
//       <SubscribeSection />
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubscribeSection from '../pages/SubscribeSection.js';
import { Truck, Headset, ShieldCheck } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const heroImages = [
    "https://cdn.shopify.com/s/files/1/0069/8974/2141/files/2-New-launch-Offer-Banner_5000x.jpg?v=1670829852",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://www.sbicard.com/sbi-card-en/assets/docs/html/personal/offers/eoss/july/img/vip-1920X575.jpg",
    "https://safaribags.com/cdn/shop/files/SF-LuggageCollection-Banner-2160_x_1080.jpg?v=1726637548&width=1600"
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    dots: true,
    pauseOnHover: false,
  };


  const brandSettings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

  const categories = [
    { name: 'BackPack', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHwIO6pNlZ6f3Q2aA7Op5luZEddDT2OAywQ&s' },
    { name: 'Laptop Bags', img: 'https://shop.kesari.in/cdn/shop/products/xeno-laptop-backpack-blue-orange-1_c7eecf62-3959-4c2e-9321-59772ff5d530.jpg?v=1702624172' },
    { name: 'Messenger Bags', img: 'https://www.cosmus.in/images/products/med/40051021075_1.jpg' },
    { name: 'Luggage', img: 'https://m.media-amazon.com/images/I/51E6EopGIzL._AC_UY1100_.jpg' },
    { name: 'Office Bags', img: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/backpack/h/i/r/-original-imah5r4g7qfufwhd.jpeg?q=20&crop=false' },
   { name: 'Luggage', img: 'https://m.media-amazon.com/images/I/51E6EopGIzL._AC_UY1100_.jpg' },
    { name: 'Kitchen', img: 'https://img-prd-pim.poorvika.com/cdn-cgi/image/width=390,height=390,quality=75/pageimg/prestige-mobile-banner-create-a-dream-kitchen-prestige.png' },
    { name: 'GSI EnterPrises', img: 'https://www.rasoishop.com/cdn/shop/products/8901365116561-2.jpg?v=1668859671&width=1445' }
  ];

  const brands = [
    'https://thecapitalmall.com/wp-content/uploads/2023/10/VIP-Capital-Mall.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/67/Logo_American_Tourister.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgS6p3j6uKZ0CsocZw4kfkhzIFcCVpP_C53Q&s',
    'https://seeklogo.com/images/C/cosmos-logo-9B820B6FF8-seeklogo.com.png',
    'https://www.investcorp.com/wp-content/uploads/2021/07/Safari-logo.png',
    'https://media.licdn.com/dms/image/v2/D4D3DAQGSDa9cSJ_p7w/image-scale_191_1128/image-scale_191_1128/0/1712744906781/timus_concepts_private_limited_cover?e=2147483647&v=beta&t=DiHTE3S-wmk5WjCAxRcITh6umkL9-3OWe5vRyB5yFxg',
  ];

  const testimonials = [
    {
      name: "Anjali Sharma",
      review: "Great quality and fast delivery. Loved the shopping experience!",
      img: "https://randomuser.me/api/portraits/women/79.jpg"
    },
    {
      name: "Rahul Verma",
      review: "Excellent customer support. Highly recommend this store!",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <div className="w-full bg-white text-gray-800 font-sans">
      <ToastContainer />

      {/* Hero Section */}
      <section className="relative hidden sm:block">
        <Slider {...settings}>
          {heroImages.map((img, i) => (
            <div key={i} className="w-full h-[400px] relative">
              <img src={img} alt="slide" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
                <h1 className="text-4xl font-bold mb-4">Biggest Sale of the Season</h1>
                <p className="text-lg mb-6">Upto 70% Off on Backpacks, Luggage and More</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {categories.map((cat, index) => (
            <Link
              to={`/shop?category=${cat.name}`}
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-40 object-contain p-2" />
              <div className="p-4 text-center font-semibold">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Shop With Us */}
     
      <section className="py-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
  <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
    Why Shop With Us
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-center">
      <Truck className="mx-auto text-indigo-600 mb-4" size={40} />
      <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
      <p className="text-gray-600">No delivery charge on orders above ₹499</p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-center">
      <Headset className="mx-auto text-purple-600 mb-4" size={40} />
      <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
      <p className="text-gray-600">We’re always here to help you</p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-center">
      <ShieldCheck className="mx-auto text-pink-600 mb-4" size={40} />
      <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
      <p className="text-gray-600">100% secure and trusted payment gateway</p>
    </div>
  </div>
</section>

      {/* Popular Brands */}
      <section className="py-10 bg-white">
  <h2 className="text-3xl font-bold text-center mb-8">Popular Brands</h2>
  <div className="max-w-6xl mx-auto px-4">
    <Slider {...brandSettings}>
    {brands.map((logo, idx) => (
      <div
        key={idx}
        className=" p-6 flex justify-center items-center hover:shadow-2xl transition-transform transform hover:-translate-y-1"
      >
        <img
          src={logo}
          alt="brand"
          className="lg:w-52 w-32 h-20 object-contain"
        />
      </div>
    ))}
    </Slider>
  </div>
</section>


      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto px-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <p className="italic">"{t.review}"</p>
              <h4 className="mt-2 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      

      {/* Newsletter */}
      <SubscribeSection />
    </div>
  );
};

export default Home;

