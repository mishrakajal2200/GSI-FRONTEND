// components/FAQPage.jsx
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What product categories does GSI Enterprises offer?',
    answer: (
      <>
        <p>We specialize in two main categories:</p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Bags:</strong> Messenger, sling, backpack, trolley, laptop, overnighter, travel sets — featuring top brands like VIP, American Tourister, Safari, Cosmus, Timus, and more.
          </li>
          <li>
            <strong>Home & Kitchen Appliances:</strong> Premium Prestige cookware, pressure cookers, mixers, grinders, and other kitchen essentials.
          </li>
        </ul>
        <p className="mt-2">
          We also offer corporate gifting solutions — branded bags, appliances, wallets, T-shirts, and bespoke gift sets for events, employee rewards, and client giveaways.
        </p>
      </>
    ),
  },
  {
    question: 'How do I place an order?',
    answer: (
      <ol className="list-decimal list-inside ml-4">
        <li>Browse products and select desired items.</li>
        <li>Click "Add to Cart", then "Checkout".</li>
        <li>Enter shipping details and choose a payment method.</li>
        <li>Confirm your order — an email confirmation with the order summary will follow immediately.</li>
      </ol>
    ),
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <>
        <ul className="list-disc list-inside ml-4">
          <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
          <li>UPI (Google Pay, PhonePe, Paytm)</li>
          <li>Net Banking</li>
          <li>Wallets (Amazon Pay, Paytm Wallet)</li>
        </ul>
        <p className="mt-2">
          All payments are processed via secure, PCI-compliant gateways.
        </p>
      </>
    ),
  },
  {
    question: 'Do you ship nationwide? What are the delivery charges?',
    answer: (
      <>
        <p>Yes, we deliver across India.</p>
        <ul className="list-disc list-inside ml-4">
          <li>Standard shipping: ₹50 – ₹150 depending on order value and location.</li>
          <li>Free shipping on orders above ₹2,000.</li>
          <li>Estimated delivery: 3–7 business days.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'What is your return & exchange policy?',
    answer: (
      <>
        <ul className="list-disc list-inside ml-4">
          <li>No cash refunds — we offer free replacement for defective or incorrect items reported within 24 hours of delivery (photo/video proof required).</li>
          <li>Exchange: You may swap for another item in the same price range if requested within 24 hours.</li>
        </ul>
        <p className="mt-2">
          Email <a href="mailto:support@gsienterprises.com" className="text-blue-600 underline">support@gsienterprises.com</a> to initiate.
        </p>
      </>
    ),
  },
  {
    question: 'Are your kitchen appliances covered by warranty?',
    answer: (
      <p>
        Yes. All Prestige appliances carry the manufacturer’s warranty (typically 2–5 years). Warranty terms vary by product — see individual listings for details.
      </p>
    ),
  },
  {
    question: 'How can I track my order?',
    answer: (
      <p>
        Once your order ships, you’ll receive a tracking ID via email/SMS. Use this on our courier partner’s website to monitor delivery status in real time.
      </p>
    ),
  },
  {
    question: 'Can I buy in bulk for corporate gifting?',
    answer: (
      <>
        <p>Absolutely! We offer volume discounts and customization (logo printing, branded packaging).</p>
        <p className="mt-2">Minimum order quantity starts at 50–100 units.</p>
        <p className="mt-2">
          Contact <a href="mailto:corporate@gsienterprises.com" className="text-blue-600 underline">corporate@gsienterprises.com</a> for quotes and artwork guidelines.
        </p>
      </>
    ),
  },
  {
    question: 'What if an item I want is out of stock?',
    answer: (
      <p>
        Click “Notify Me” on the product page. You’ll receive an email as soon as we restock. You can also chat with our support team for alternatives.
      </p>
    ),
  },
  {
    question: 'Do you offer gift wrapping or personalized notes?',
    answer: (
      <p>
        Yes — we provide premium gift wrapping and can include a personalized note. Select “Gift Wrap” at checkout and add your message.
      </p>
    ),
  },
  {
    question: 'How do I care for my new bag or appliance?',
    answer: (
      <>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Bags:</strong> Wipe with a damp cloth; avoid overloading beyond the recommended capacity.</li>
          <li><strong>Prestige Appliances:</strong> Follow the user manual — clean with mild detergent and dry thoroughly.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Who can I contact for further assistance?',
    answer: (
      <>
        <p>Our Customer Care team is available Mon–Sat, 10 AM–9 PM IST:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Email: <a href="mailto:support@gsienterprises.com" className="text-blue-600 underline">onlinegsienterprises@gmail.com</a></li>
          <li>Phone/WhatsApp: <a href="tel:+918956421403" className="text-blue-600 underline">+91 8956421403</a></li>
        </ul>
      </>
    ),
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-12">
          GSI Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md">
                  <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-semibold text-gray-800 focus:outline-none">
                    <span>{faq.question}</span>
                    {open ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-6 text-gray-600 text-base">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
