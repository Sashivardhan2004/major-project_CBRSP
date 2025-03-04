import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserData,
  updateUserProfile,
  deleteUserAccount,
} from './Settings.js';
import './Settings.css';

export function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData(navigate);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };
    loadUserData();
  }, [navigate]);

  // Handle profile update
  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      await updateUserProfile({ name, currentPassword, newPassword });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile!');
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully!');
        navigate('/login'); // Redirect after deletion
      } catch (error) {
        alert('Error deleting account!');
      }
    }
  };

  return (
    <div className="profile-settings shadow-xl rounded-2xl">
      <h1 className="text">Profile Settings</h1>

      <div>
        <input
          id="Name"
          name="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="text-2xl p-4 bg-gray-100" id="email">
        {email}
      </div>

      <div>
        <input
          id="current-password"
          name="current-password"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div>
        <input
          id="new-password"
          name="new-password"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="button-container flex">
        <button className="button save" onClick={handleUpdate}>
          <span className="text-xl">Update Your Account</span>
        </button>
        <button className="button delete" onClick={handleDelete}>
          <span className="text-xl">Delete Your Account</span>
        </button>
      </div>
    </div>
  );
}
