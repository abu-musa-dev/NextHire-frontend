// import React, { useState } from 'react';

// const Register = () => {
//   const [role, setRole] = useState('Employer');

//   return (
//     <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex space-x-6 border-b w-full pb-2">
//           <span className="text-gray-400 cursor-pointer">Log in</span>
//           <span className="font-semibold text-black border-b-2 border-black">Sign Up</span>
//         </div>
//         <button className="text-2xl font-bold text-gray-400 hover:text-black">×</button>
//       </div>

//       {/* Role Selector */}
//       <div className="flex gap-2 mb-6">
//         <button
//           className={`flex-1 py-2 rounded-md text-sm font-medium border ${
//             role === 'Candidate' ? 'bg-gray-100 text-black' : 'bg-white text-gray-500'
//           }`}
//           onClick={() => setRole('Candidate')}
//         >
//           <span className="mr-1">👤</span> Candidate
//         </button>
//         <button
//           className={`flex-1 py-2 rounded-md text-sm font-medium border ${
//             role === 'Employer' ? 'bg-green-700 text-white' : 'bg-white text-gray-500'
//           }`}
//           onClick={() => setRole('Employer')}
//         >
//           <span className="mr-1">💼</span> Employer
//         </button>
//       </div>

//       {/* Registration Form */}
//       <form>
//         <div className="grid grid-cols-2 gap-3 mb-3">
//           <div>
//             <label className="block text-sm font-medium mb-1">First Name</label>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Last Name</label>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Username</label>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div className="mb-3">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Phone number</label>
//           <input
//             type="tel"
//             placeholder="+358"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full font-medium"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
