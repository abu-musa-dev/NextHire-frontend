import React, { useState, useEffect } from 'react';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase'; // সঠিকভাবে auth এবং storage ইম্পোর্ট করুন

const ProfileEmployer = () => {
  const [profile, setProfile] = useState({
    email: '',
    name: '',
    profilePic: '', // প্রোফাইল ছবি
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState('');

  // ইউজার তথ্য লোড করতে useEffect ব্যবহার করুন
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setProfile({
        email: user.email,
        name: user.displayName || '',
        profilePic: user.photoURL || '', // গুগল প্রোফাইল ছবি এখানে থাকবে
      });
    }
  }, []);

  // ফাইল চেঞ্জ হলে প্রি-ভিউ সেট করুন
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

  // প্রোফাইল ছবি আপলোড করা
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

  // প্রোফাইল আপডেট করার ফাংশন
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // শুধুমাত্র ইমেইল পরিবর্তন
      if (profile.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, profile.email);
      }

      // নাম আপডেট
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Employer Profile</h1>
      <form onSubmit={handleProfileUpdate} className="max-w-lg mx-auto p-6 border rounded-lg bg-white shadow-md">
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
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="input input-bordered w-full mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700">Upload Profile Picture</label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full mt-2"
          />
          {filePreview && (
            <div className="mt-2">
              <h4 className="font-medium">Preview:</h4>
              <img src={filePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full" />
            </div>
          )}
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleFileUpload}
            className="btn btn-primary w-full"
          >
            Upload Profile Picture
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileEmployer;
