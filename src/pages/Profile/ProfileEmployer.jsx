import React, { useState, useEffect } from 'react';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../firebase'; // আপনার প্রকল্প অনুযায়ী সঠিক path দিন
import { useDarkMode } from '../../context/DarkModeContext'; // DarkMode context import

const ProfileEmployer = () => {
  const { darkMode } = useDarkMode();  // isDarkMode -> darkMode, Context এর সাথে মেলাতে

  const [profile, setProfile] = useState({
    email: '',
    name: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setProfile({
        email: user.email,
        name: user.displayName || '',
        profilePic: user.photoURL || '',
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const fileRef = ref(storage, 'profilePics/' + file.name);

    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      await updateProfile(auth.currentUser, { photoURL: url });

      setProfile({ ...profile, profilePic: url });
      alert('Profile picture updated successfully!');
    } catch (err) {
      setError('Failed to upload profile picture');
      console.error('Error uploading profile picture:', err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (profile.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, profile.email);
      }

      await updateProfile(auth.currentUser, { displayName: profile.name });

      alert('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'
      }`}
    >
      <form
        onSubmit={handleProfileUpdate}
        className={`max-w-lg w-full p-6 rounded-lg shadow-md transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Employer Profile</h1>

        <div className="mb-4 flex justify-center">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full border-4 border-primary">
              <img
                src={profile.profilePic || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block text-lg font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className={`input input-bordered w-full mt-2 ${
              darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : ''
            }`}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block text-lg font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className={`input input-bordered w-full mt-2 ${
              darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : ''
            }`}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className={`block text-lg font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className={`file-input file-input-bordered w-full mt-2 ${
              darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : ''
            }`}
          />
          {filePreview && (
            <div className="mt-2">
              <h4 className="font-medium">Preview:</h4>
              <img
                src={filePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mb-4">
          <button type="button" onClick={handleFileUpload} className="btn btn-primary w-full">
            Upload Profile Picture
          </button>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileEmployer;
