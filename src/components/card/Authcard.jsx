import React, { useState } from 'react';
import axios from 'axios';
import './Authcard.css';
import { handleSubmit } from './Authcard';
export const AuthCard = ({
  isLogin,
  setIsLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="authcard bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? 'Access Account' : 'Create Account'}
      </h2>
      <p className="text-gray-500 mb-6">
        {isLogin
          ? 'Access your account to share and manage resources'
          : 'Sign up to start sharing and managing resources'}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          handleSubmit(
            e,
            isLogin,
            name,
            email,
            password,
            confirmPassword,
            setError,
            setLoading
          );
        }}
      >
        {!isLogin && (
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4">
        {isLogin ? 'Need to create an account? ' : 'Already have an account? '}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </span>
      </p>
    </div>
  );
};
