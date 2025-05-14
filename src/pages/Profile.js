// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//     },
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//   const fetchProfile = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(res.data);
//       setFormData(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching profile:", err.message);
//       navigate("/login"); // If unauthorized
//     }
//   };

//   fetchProfile();
// }, [navigate]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["street", "city", "state", "postalCode", "country"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         address: { ...prev.address, [name]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put("http://localhost:5000/api/auth/profile", formData, {
//         withCredentials: true,
//       });
//       setUser(res.data);
//       setEditing(false);
//     } catch (err) {
//       console.error("Update failed", err);
//       alert("Update failed. Try again.");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading profile...</p>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       {user && (
//         <>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={!editing}
//               className="w-full p-2 border rounded"
//               placeholder="Full Name"
//             />
//             <input
//               type="email"
//               value={user.email}
//               disabled
//               className="w-full p-2 border rounded bg-gray-100"
//             />
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!editing}
//               className="w-full p-2 border rounded"
//               placeholder="Phone"
//             />

//             <div className="pt-4 border-t">
//               <h4 className="text-md font-semibold mb-2">Shipping Address</h4>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.address.street}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="Street"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.address.city}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="City"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.address.state}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="State"
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 value={formData.address.postalCode}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="Postal Code"
//               />
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.address.country}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className="w-full p-2 border rounded"
//                 placeholder="Country"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             {editing ? (
//               <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
//                 Save Changes
//               </button>
//             ) : (
//               <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;



import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login");
  //       return;
  //     }

  //     try {
  //       const res = await axios.get("http://localhost:5000/api/auth/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setUser(res.data);
  //       setFormData({
  //         name: res.data.name || "",
  //         phone: res.data.phone || "",
  //         address: {
  //           street: res.data.address?.street || "",
  //           city: res.data.address?.city || "",
  //           state: res.data.address?.state || "",
  //           postalCode: res.data.address?.postalCode || "",
  //           country: res.data.address?.country || "",
  //         },
  //       });
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching profile:", err.message);
  //       navigate("/login");
  //     }
  //   };

  //   fetchProfile();
  // }, [navigate]);

  useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      const res = await axios.get("https://gsi-backend-1.onrender.com/api/auth/profile/getprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        phone: res.data.phone || "",
        address: {
          street: res.data.address?.street || "",
          city: res.data.address?.city || "",
          state: res.data.address?.state || "",
          postalCode: res.data.address?.postalCode || "",
          country: res.data.address?.country || "",
        },
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      navigate("/login");
    }
  };

  fetchProfile();
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "postalCode", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Not authorized");

    try {
      const res = await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {user && (
        <>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-2 border rounded"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-2 border rounded"
              placeholder="Phone"
            />

            <div className="pt-4 border-t">
              <h4 className="text-md font-semibold mb-2">Shipping Address</h4>
              {["street", "city", "state", "postalCode", "country"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData.address[field]}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full p-2 border rounded mb-2"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            {editing ? (
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
