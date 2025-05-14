// // ContactUs.jsx
// import { motion } from "framer-motion";
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const ContactUs = () => {
//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8 flex flex-col justify-center items-center"
//       initial="hidden"
//       animate="visible"
//       variants={fadeInUp}
//     >
//       <motion.h2
//         className="text-4xl font-bold text-gray-800 mb-4 text-center"
//         whileHover={{ scale: 1.05 }}
//       >
//         Get In Touch
//       </motion.h2>
//       <p className="text-gray-600 text-center max-w-xl mb-10">
//         We'd love to hear from you. Whether you have a question about features,
//         trials, pricing, need a demo, or anything else — our team is ready to
//         answer all your questions.
//       </p>

//       {/* Contact Info */}
//       <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl text-gray-700">
//         <motion.div className="flex flex-col items-center" variants={fadeInUp}>
//           <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
//           <p className="text-center">123 Market St, Delhi, India</p>
//         </motion.div>
//         <motion.div className="flex flex-col items-center" variants={fadeInUp}>
//           <FaPhoneAlt className="text-blue-600 text-2xl mb-2" />
//           <p className="text-center">+91 98765 43210</p>
//         </motion.div>
//         <motion.div className="flex flex-col items-center" variants={fadeInUp}>
//           <FaEnvelope className="text-blue-600 text-2xl mb-2" />
//           <p className="text-center">support@yourstore.com</p>
//         </motion.div>
//       </div>

//       {/* Form */}
//       <motion.form
//         onSubmit={(e) => {
//           e.preventDefault();
//           alert("Message Sent!");
//         }}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
//         initial="hidden"
//         animate="visible"
//         variants={fadeInUp}
//       >
//         {/* Floating Labels */}
//         <div className="relative">
//           <input
//             type="text"
//             name="name"
//             placeholder=" "
//             required
//             className="peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
//             Your Name
//           </label>
//         </div>

//         <div className="relative">
//           <input
//             type="email"
//             name="email"
//             placeholder=" "
//             required
//             className="peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
//             Email Address
//           </label>
//         </div>

//         <div className="relative">
//           <select
//             required
//             className="peer w-full px-4 pt-6 pb-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Choose Subject</option>
//             <option>Order Issue</option>
//             <option>Returns</option>
//             <option>Feedback</option>
//             <option>Other</option>
//           </select>
//           <label className="absolute left-4 top-2 text-gray-500 text-sm">
//             Subject
//           </label>
//         </div>

//         <div className="relative">
//           <textarea
//             name="message"
//             placeholder=" "
//             required
//             className="peer w-full px-4 pt-6 pb-2 h-32 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
//             Message
//           </label>
//         </div>

//         <motion.button
//           type="submit"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold shadow-md hover:shadow-xl transition duration-300"
//         >
//           Send Message
//         </motion.button>
//       </motion.form>
//     </motion.div>
//   );
// };

// export default ContactUs;



import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://gsi-backend-1.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setStatus(result.message || "Message sent successfully!");
      if (response.ok) {
        setStatus("Message sent successfully!");
      } else {
        setStatus("Error sending message. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8 flex flex-col justify-center items-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-4 text-center"
        whileHover={{ scale: 1.05 }}
      >
        Get In Touch
      </motion.h2>
      <p className="text-gray-600 text-center max-w-xl mb-10">
        We'd love to hear from you. Whether you have a question about features,
        trials, pricing, need a demo, or anything else — our team is ready to
        answer all your questions.
      </p>

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl text-gray-700">
        <motion.div className="flex flex-col items-center" variants={fadeInUp}>
          <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
          <p className="text-center">PRESTIGE PXL-GSI ENTP
	SHOP NO.6, ROW HOUSE
	MHADA COLONY, KULGAON-BADLAPUR
	BADLAPUR EAST-421503
</p>
        </motion.div>
        <motion.div className="flex flex-col items-center" variants={fadeInUp}>
          <FaPhoneAlt className="text-blue-600 text-2xl mb-2" />
          <p className="text-center">+91 8956421403</p>
        </motion.div>
        <motion.div className="flex flex-col items-center" variants={fadeInUp}>
          <FaEnvelope className="text-blue-600 text-2xl mb-2" />
          <p className="text-center">support@gsienterprise.com</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Floating Labels */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            className="peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            Your Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            Email Address
          </label>
        </div>

        <div className="relative">
          <select
            name="subject"
            required
            className="peer w-full px-4 pt-6 pb-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Choose Subject</option>
            <option>Order Issue</option>
            <option>Returns</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
          <label className="absolute left-4 top-2 text-gray-500 text-sm">
            Subject
          </label>
        </div>

        <div className="relative">
          <textarea
            name="message"
            placeholder=" "
            required
            className="peer w-full px-4 pt-6 pb-2 h-32 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.message}
            onChange={handleChange}
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            Message
          </label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold shadow-md hover:shadow-xl transition duration-300"
        >
          Send Message
        </motion.button>
      </motion.form>

      {status && (
        <div className="mt-4 text-center text-gray-700">{status}</div>
      )}
    </motion.div>
  );
};

export default ContactUs;
