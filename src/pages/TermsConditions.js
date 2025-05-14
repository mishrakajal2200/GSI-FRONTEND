import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-12 text-gray-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Effective Date: May 4, 2025 &nbsp;|&nbsp; Last Updated: May 4, 2025
        </p>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to <strong>GSI Enterprises</strong> (“we,” “us,” “our”). By accessing or using our website
            <a
              href="https://www.gsienterprises.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              www.gsienterprises.com
            </a>
            (the “Site”), you agree to be bound by these Terms & Conditions (“T&C”). Please read them carefully.
          </p>

          {/* Section 1 */}
          <Section title="1. Use of the Site">
            <List
              items={[
                "<strong>Eligibility:</strong> You must be at least 18 years old and capable of entering into a binding contract.",
                "<strong>Account:</strong> You may create an account by providing accurate information. You are responsible for maintaining confidentiality of your login credentials and for all activities under your account.",
                `<strong>Prohibited Conduct:</strong> You agree not to:
                <ul class="list-disc pl-6 mt-1">
                  <li>Violate any laws or rights of third parties.</li>
                  <li>Interfere with Site functionality or security.</li>
                  <li>Use automated scripts to collect data.</li>
                </ul>`,
              ]}
            />
          </Section>

          <Section title="2. Products and Orders">
            <List
              items={[
                "<strong>Product Information:</strong> We strive for accuracy in descriptions, pricing, and availability. Errors may occur; we reserve the right to correct them.",
                "<strong>Order Acceptance:</strong> Your order is an offer to buy. We may accept by processing payment and shipping the product or by sending an order confirmation.",
                "<strong>Pricing:</strong> All prices are in Indian Rupees (₹). We reserve the right to change prices without notice, but changes will not affect orders already confirmed.",
              ]}
            />
          </Section>

          <Section title="3. Payment Terms">
            <List
              items={[
                "<strong>Methods:</strong> We accept credit/debit cards, UPI, net banking, and wallets as listed on the Site.",
                "<strong>Authorization:</strong> Payment is authorized at time of order placement. If authorization fails, we may cancel your order.",
                "<strong>Taxes:</strong> Prices exclude GST or other applicable taxes, which will be added at checkout.",
              ]}
            />
          </Section>

          <Section title="4. Shipping and Delivery">
            <List
              items={[
                "We ship nationwide via third‑party couriers.",
                "Delivery estimates are provided on the Site and are not guaranteed.",
                "Title and risk pass to you upon delivery to the carrier.",
              ]}
            />
          </Section>

          <Section title="5. Return & Exchange">
            <List
              items={[
                "<strong>No Refunds:</strong> All sales are final; we do not issue refunds.",
                "<strong>Returns:</strong> Defective or incorrect items may be returned for replacement if reported within 24 hours with proof (see Return & Exchange Policy).",
                "<strong>Exchanges:</strong> Exchange for another item of equal value is allowed within 24 hours (see Return & Exchange Policy).",
              ]}
            />
          </Section>

          <Section title="6. Intellectual Property">
            <List
              items={[
                "All content on the Site is owned or licensed by GSI Enterprises.",
                "You may view and download content for personal, non‑commercial use only.",
                "You may not reproduce, distribute, or modify without permission.",
              ]}
            />
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <List
              items={[
                "The Site and products are provided “as is” without warranties of any kind.",
                "We do not guarantee that the Site will be error‑free or uninterrupted.",
              ]}
            />
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, GSI Enterprises and its affiliates are not liable for any
              indirect, incidental, special, or consequential damages arising from your use of the Site or products.
            </p>
          </Section>

          <Section title="9. Indemnification">
            <p>
              You agree to indemnify and hold GSI Enterprises, its officers, directors, and employees harmless from
              any claim, loss, liability, or expense arising from your use of the Site or violation of these T&C.
            </p>
          </Section>

          <Section title="10. Privacy">
            <p>Your use of the Site is also governed by our Privacy Policy.</p>
          </Section>

          <Section title="11. Third‑Party Links">
            <p>The Site may contain links to external websites. We are not responsible for their content or practices.</p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>
              We may update these T&C at any time. Changes take effect when posted. Your continued use constitutes
              acceptance.
            </p>
          </Section>

          <Section title="13. Governing Law & Jurisdiction">
            <p>
              These T&C are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction
              of courts in [Your City, State].
            </p>
          </Section>

          <Section title="14. Contact Information">
            <p>
              If you have questions or concerns about these Terms & Conditions, contact us at:
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:support@gsienterprises.com" className="text-blue-600 underline">
                support@gsienterprises.com
              </a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://www.gsienterprises.com" className="text-blue-600 underline">
                www.gsienterprises.com
              </a>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

// Section reusable component
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-8">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </div>
);

// List reusable component
const List = ({ items }) => (
  <ul className="list-disc pl-6 space-y-2">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: item }}
      />
    ))}
  </ul>
);

export default TermsAndConditions;
