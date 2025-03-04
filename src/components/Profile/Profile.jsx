import React, { useEffect, useState } from 'react';
import { ImPower } from 'react-icons/im';
import { MdGetApp } from 'react-icons/md';
import { VscVmActive } from 'react-icons/vsc';
import { FaHourglassStart, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchProfileData } from './Profile.js';
import './Profile.css';

export const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileData(navigate);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!profileData) return <p>Error fetching profile.</p>;

  return (
    <div className="profile-page">
      <div className="flex flex-col justify-center items-center">
        <img src="/logo (2).png" alt="Logo" width={100} />
      </div>
      <div className="profile">
        <div className="flex justify-evenly items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <ImPower className="text-3xl text-cyan-500" />
            <span>Power Shared</span>
            <span className="text">{profileData.powerShared}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <MdGetApp className="text-3xl text-emerald-500" />
            <span>Power Used</span>
            <span className="text">{profileData.powerUsed}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <VscVmActive className="text-3xl text-orange-700" />
            <span>Active Time</span>
            <span className="text">{profileData.activeTime}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FaHourglassStart className="text-3xl text-indigo-700" />
            <span>Sharing Time</span>
            <span className="text">{profileData.sharingTime}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FaRegStar className="text-3xl text-amber-500" />
            <span>Activity Score</span>
            <span className="text">{profileData.activityScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
