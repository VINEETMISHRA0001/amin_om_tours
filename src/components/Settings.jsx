import { useState } from 'react';
import { FiEdit2, FiEye, FiEyeOff } from 'react-icons/fi';

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [adminData, setAdminData] = useState({
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYP-KKtRJXm9qK7k2_PA1utxbxWdpzGIdulQ&s',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex items-center space-x-4">
        {/* Admin Avatar */}
        <img
          src={adminData.avatarUrl}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          {/* Admin Name */}
          <div className="flex items-center space-x-2">
            {userDetails && (
              <input
                type="text"
                name="name"
                value={userDetails.name.toUpperCase()}
                onChange={handleInputChange}
                disabled
                className="border rounded px-2 py-1 font-semibold border-indigo-500"
              />
            )}
          </div>

          {/* Admin Role */}
          <p className="text-green-500 mt-2 font-bold">Admin</p>
        </div>
      </div>

      <form className="mt-6 space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-gray-600">Email:</label>
          {userDetails && (
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 flex-1 font-semibold border-indigo-500"
              disabled
            />
          )}
        </div>

        {/* Password */}
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-gray-600">Password:</label>
          <div className="relative flex-1">
            {editMode.password ? (
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{'•'.repeat(8)}</span>
            )}

            {editMode.password && (
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            )}
          </div>
          <FiEdit2
            className="cursor-pointer text-gray-500"
            onClick={() => toggleEditMode('password')}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
