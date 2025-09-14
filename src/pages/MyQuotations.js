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


// import { useEffect, useState } from "react";
// import axios from "axios";

// const MyQuotations = () => {
//   const [quotations, setQuotations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMyQuotations = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "https://api.gsienterprises.com/api/quotation/my",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setQuotations(data);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyQuotations();
//   }, []);

//   if (loading) return <p className="p-6 text-center">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">My Quotations</h2>
//       <div className="space-y-4">
//         {quotations.map((q) => (
//           <div key={q._id} className="p-4 border rounded shadow bg-white">
//             <h3 className="font-semibold">Quotation #{q._id.slice(-6)}</h3>
//             <p>Status: {q.status}</p>
//             <p>Budget: ₹{q.budget}</p>
//             <p>Notes: {q.specialNotes}</p>

//             {/* Items */}
//             <ul className="list-disc ml-6 my-2">
//               {q.items.map((item) => (
//                 <li key={item.productId._id}>
//                   {item.productId.name} (x{item.quantity})
//                 </li>
//               ))}
//             </ul>

//             {/* ✅ Show admin’s response if exists */}
//             {q.quotedPrice && (
//               <div className="mt-3 p-3 bg-green-50 rounded">
//                 <p className="font-semibold text-green-700">Admin Response:</p>
//                 <p>
//                   💰 Quoted Price: <strong>₹{q.quotedPrice}</strong>
//                 </p>
//                 <p>
//                   📅 Valid Till:{" "}
//                   <strong>
//                     {new Date(q.validityDate).toLocaleDateString()}
//                   </strong>
//                 </p>
//                 <p>📝 Message: {q.adminResponse}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyQuotations;




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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading quotations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📑 My Quotations
        </h2>

        {quotations.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">You haven’t requested any quotations yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quotations.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
              >
                {/* Quotation Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Quotation #{q._id.slice(-6)}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      q.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : q.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : q.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {q.status.toUpperCase()}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Budget:</span> ₹{q.budget}
                  </p>
                  <p>
                    <span className="font-medium">Notes:</span>{" "}
                    {q.specialNotes || "—"}
                  </p>
                </div>

                {/* Items */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {q.items.map((item) => (
                      <li key={item.productId._id}>
                        {item.productId.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Admin Response */}
                {q.quotedPrice && (
                  <div className="mt-5 p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200">
                    <p className="font-semibold text-green-800 text-sm mb-1">
                      ✅ Admin Response
                    </p>
                    <p className="text-gray-700 text-sm">
                      💰 <span className="font-medium">Quoted Price:</span>{" "}
                      ₹{q.quotedPrice}
                    </p>
                    <p className="text-gray-700 text-sm">
                      📅 <span className="font-medium">Valid Till:</span>{" "}
                      {new Date(q.validityDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm">
                      📝 <span className="font-medium">Message:</span>{" "}
                      {q.adminResponse}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuotations;
