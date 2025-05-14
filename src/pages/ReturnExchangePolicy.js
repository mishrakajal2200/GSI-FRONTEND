import React from 'react';

const ReturnExchangePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-screen-lg mx-auto p-6 space-y-8 bg-white bg-opacity-80 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 animate__animated animate__fadeIn">
          Return & Exchange Policy
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Effective Date: May 4, 2025
        </p>
        <p className="text-sm text-gray-600 text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Last Updated: May 4, 2025
        </p>

        <section className="space-y-8">
          <p className="text-lg leading-relaxed text-gray-700 animate__animated animate__fadeIn animate__delay-2s">
            At GSI Enterprises, your satisfaction is important to us. While we do not offer refunds, we provide a clear and customer-friendly return and exchange policy under specific conditions.
          </p>

          <div className="animate__animated animate__fadeIn animate__delay-3s">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. No Refund Policy</h2>
            <p className="text-lg text-gray-700 mb-4">
              Once a purchase has been made on{' '}
              <a href="https://www.gsienterprises.com" className="text-blue-500 underline hover:text-blue-700 transition duration-300">
                www.gsienterprises.com
              </a>, it is considered final. We do not issue any refunds, whether for cash or online payment. Please ensure that you review product details carefully before purchasing.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-4s">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Return Policy - Defective or Incorrect Items Only</h2>
            <p className="text-lg text-gray-700 mb-4">
              We accept returns only if the product is defective or an incorrect item was delivered. The following steps must be followed:
            </p>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>Notify us via email at <a href="mailto:support@gsienterprises.com" className="text-blue-500 underline hover:text-blue-700 transition duration-300">support@gsienterprises.com</a> within 24 hours of delivery.</li>
              <li>Include clear photographs or a video showing the defect or the incorrect item.</li>
              <li>The product must be unused, in original packaging, and in sellable condition.</li>
            </ul>
            <p className="text-lg text-gray-700 mt-4">
              Once reviewed and approved by our support team, we will coordinate the return and replace it with the same item. Note: If you fail to contact us within 24 hours of delivery, the return request will not be entertained.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-5s">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Exchange Policy - Alternate Item in the Same Price Range</h2>
            <p className="text-lg text-gray-700 mb-4">
              If you are not satisfied with the received item and would like to exchange it with another item of the same price range, follow these conditions:
            </p>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>Contact us via email at <a href="mailto:support@gsienterprises.com" className="text-blue-500 underline hover:text-blue-700 transition duration-300">support@gsienterprises.com</a> within 24 hours of delivery.</li>
              <li>State the reason for the exchange and mention the preferred item.</li>
              <li>The product to be exchanged must be unused, in original packaging, and free of any damage or wear.</li>
            </ul>
            <p className="text-lg text-gray-700 mt-4">
              Exchange will only be accepted if the requested product is in stock. Customers are responsible for any shipping charges related to the exchange.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-6s">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Conditions Applicable to Both Return and Exchange</h2>
            <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
              <li>Requests received after 24 hours of order delivery will not be accepted.</li>
              <li>We reserve the right to reject any request if the product fails to meet the return or exchange conditions.</li>
              <li>Only one exchange is allowed per order.</li>
            </ul>
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-7s">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. How to Contact Us</h2>
            <p className="text-lg text-gray-700">
              If you have questions or would like to initiate a return or exchange, reach out to us at:
            </p>
            <p className="text-lg text-gray-700">
              Email: <a href="mailto:support@gsienterprises.com" className="text-blue-500 underline hover:text-blue-700 transition duration-300">support@gsienterprises.com</a>
              <br />
              Website: <a href="https://www.gsienterprises.com" className="text-blue-500 underline hover:text-blue-700 transition duration-300">www.gsienterprises.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnExchangePolicy;
