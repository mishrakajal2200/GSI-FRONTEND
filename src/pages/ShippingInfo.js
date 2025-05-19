
import { Truck, Clock, DollarSign, MapPin, Globe, HelpCircle } from 'lucide-react';

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 space-y-3 border-l-4 border-amber-500">
    <div className="flex items-center space-x-3">
      <Icon className="text-amber-500 w-6 h-6" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-700 text-sm">{children}</div>
  </div>
);

const ShippingInfo = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-md">Shipping Information</h1>
        <p className="mt-3 text-lg sm:text-xl font-medium drop-shadow-sm">
          How we deliver your favorite products — safely, swiftly, and smoothly.
        </p>
      </section>

      {/* Content Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={Truck} title="Delivery Methods">
          We partner with trusted logistics services like <strong>Delhivery</strong>, <strong>Blue Dart</strong>, and <strong>India Post</strong> to deliver your orders using standard or express shipping based on location and availability.
        </InfoCard>

        <InfoCard icon={Clock} title="Shipping Timeframes">
          <ul className="list-disc pl-4">
            <li><strong>Standard:</strong> 4-7 business days</li>
            <li><strong>Express:</strong> 1-3 business days (extra charges)</li>
            <li><strong>Remote Areas:</strong> Up to 10 days</li>
          </ul>
        </InfoCard>

        <InfoCard icon={DollarSign} title="Shipping Charges">
          Orders above <span className="text-green-600 font-semibold">₹999</span> qualify for <strong>free shipping</strong>. Below that, a flat fee of ₹49 applies. Express delivery fees depend on your pin code.
        </InfoCard>

        <InfoCard icon={MapPin} title="Order Tracking">
          You'll receive a tracking ID by SMS and email once your order is dispatched. Track your order anytime from your <strong>account dashboard</strong>.
        </InfoCard>

        <InfoCard icon={Globe} title="International Shipping">
          Currently, we ship only within India — but stay tuned! <strong>Global shipping is launching soon.</strong>
        </InfoCard>

        <InfoCard icon={HelpCircle} title="Need Help?">
          Reach out to us at{' '}
          <a href="mailto:support@gsi-enterprise.com" className="text-blue-600 underline">support@gsi-enterprise.com</a>{' '}
          or call <strong>+91-9876543210</strong> for shipping-related queries.
        </InfoCard>
      </section>
    </div>
  );
};

export default ShippingInfo;
