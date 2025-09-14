// // pages/MyQuotationsPage.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MyQuotationsPage() {
//   const [quotes, setQuotes] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get("https://api.gsienterprises.com/api/quotation/my", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setQuotes(data);
//     })();
//   }, []);

//   const accept = async (id) => {
//     const token = localStorage.getItem("token");
//     await axios.put(`https://api.gsienterprises.com/api/quotation/${id}/accept`, {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setQuotes(qs => qs.map(q => q._id === id ? { ...q, status: "accepted" } : q));
//     alert("Accepted! Order created.");
//   };

//   const reject = async (id) => {
//     const token = localStorage.getItem("token");
//     await axios.put(`https://api.gsienterprises.com/api/quotation/${id}/reject`, {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setQuotes(qs => qs.map(q => q._id === id ? { ...q, status: "rejected" } : q));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">My Quotations</h2>
//       {quotes.map(q => (
//         <div key={q._id} className="border rounded p-4 mb-3">
//           <div className="flex justify-between">
//             <div>
//               <p><b>Status:</b> {q.status}</p>
//               <p><b>Budget:</b> ₹{q.budget}</p>
//               <p><b>Quoted Price:</b> {q.quotedPrice ? `₹${q.quotedPrice}` : "Pending"}</p>
//               {q.validityDate && <p><b>Valid till:</b> {new Date(q.validityDate).toLocaleDateString()}</p>}
//               <p className="text-sm text-gray-600">{q.specialNotes}</p>
//             </div>
//             <div className="space-x-2">
//               {q.status === "quoted" && (
//                 <>
//                   <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => accept(q._id)}>Accept</button>
//                   <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => reject(q._id)}>Reject</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyQuotations = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://api.gsienterprises.com/api/quotation/my",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuotations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQuotations();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Quotations</h2>
      <div className="space-y-4">
        {quotations.map((q) => (
          <div key={q._id} className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold">Quotation #{q._id.slice(-6)}</h3>
            <p>Status: {q.status}</p>
            <p>Budget: ₹{q.budget}</p>
            <p>Notes: {q.specialNotes}</p>

            {/* Items */}
            <ul className="list-disc ml-6 my-2">
              {q.items.map((item) => (
                <li key={item.productId._id}>
                  {item.productId.name} (x{item.quantity})
                </li>
              ))}
            </ul>

            {/* ✅ Show admin’s response if exists */}
            {q.quotedPrice && (
              <div className="mt-3 p-3 bg-green-50 rounded">
                <p className="font-semibold text-green-700">Admin Response:</p>
                <p>
                  💰 Quoted Price: <strong>₹{q.quotedPrice}</strong>
                </p>
                <p>
                  📅 Valid Till:{" "}
                  <strong>
                    {new Date(q.validityDate).toLocaleDateString()}
                  </strong>
                </p>
                <p>📝 Message: {q.adminResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuotations;
