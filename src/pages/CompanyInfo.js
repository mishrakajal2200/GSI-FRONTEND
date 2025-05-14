import React from 'react';
import { CheckCircleIcon, LightningBoltIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const CompanyInfo = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
            Welcome to <span className="text-yellow-300">GSI ENTERPRISE</span>
          </h1>
          <p className="text-xl opacity-90">
            Redefining your shopping experience with quality, trust, and innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">Our Mission</h2>
          <p>
            Deliver unparalleled value to customers by offering a vast selection of high-quality
            products with exceptional service and delivery.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold mb-2 text-indigo-600">Our Vision</h2>
          <p>
            To become the most beloved e-commerce brand by constantly exceeding customer expectations
            with innovation and care.
          </p>
        </div>
      </section>

      {/* Values with Icons */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircleIcon,
                title: 'Customer First',
                desc: 'Every decision starts with you in mind.',
              },
              {
                icon: ShieldCheckIcon,
                title: 'Integrity',
                desc: 'We act with honesty and accountability.',
              },
              {
                icon: LightningBoltIcon,
                title: 'Innovation',
                desc: 'We embrace change and creative ideas.',
              },
              {
                icon: UserGroupIcon,
                title: 'Teamwork',
                desc: 'Together, we grow stronger every day.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300"
              >
                <Icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose GSI Enterprise?</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li>✔ Huge product range from top brands</li>
            <li>✔ Fast & reliable shipping services</li>
            <li>✔ 24/7 customer support</li>
            <li>✔ Easy return & refund policy</li>
            <li>✔ Safe & secure checkout</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">Join Millions of Happy Shoppers</h2>
        <p className="mb-6 text-lg">Start exploring the best deals and latest trends today.</p>
        <button className="bg-yellow-400 text-indigo-900 px-6 py-3 font-semibold rounded-lg hover:bg-yellow-300 transition">
         <Link to='/shop'>Start Shopping</Link> 
        </button>
      </section>
    </div>
  );
};

export default CompanyInfo;
