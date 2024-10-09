import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useLocation } from 'react-router-dom'; 
import './ProfilePage.css';

const ProfileA = () => {
  const location = useLocation(); 
  const profileImageFromNav = location.state?.profileImage || ''; 

  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || profileImageFromNav);
  const [agencyName, setAgencyName] = useState("Enter Agency Name");
  const [website, setWebsite] = useState("Enter Website URL");
  const [phoneNumber, setPhoneNumber] = useState("Enter Phone Number");
  const [address, setAddress] = useState("Enter Address");
  const [name, setName] = useState("Enter Your Name");
  const [about, setAbout] = useState("Enter your About");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('profileData'));
    if (storedData) {
      setBannerImage(storedData.bannerImage || '');
      setProfileImage(storedData.profileImage || profileImageFromNav);
      setAgencyName(storedData.agencyName || '');
      setWebsite(storedData.website || '');
      setPhoneNumber(storedData.phoneNumber || '');
      setAddress(storedData.address || '');
      setName(storedData.name || '');
      setAbout(storedData.about || '');
    }
  }, [profileImageFromNav]);

  useEffect(() => {
    const profileData = {
      bannerImage,
      profileImage,
      agencyName,
      website,
      phoneNumber,
      address,
      name,
      about,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [bannerImage, profileImage, agencyName, website, phoneNumber, address, name, about]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSaveClick(); 
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profileImage', reader.result);
        setProfileImage(reader.result);
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: '800px', margin: 'auto' }}>
      {/* Banner Image */}
      <div className="banner-container">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) =>
            setBannerImage(URL.createObjectURL(e.target.files[0]))
          }
          id="banner-upload"
        />
        <label htmlFor="banner-upload">
          <Button variant="contained" component="span" sx={{ position: 'absolute', top: 10, right: 10 }}>
            Upload Banner
          </Button>
        </label>
        {bannerImage && (
          <img src={bannerImage} alt="Banner" className="banner-image" />
        )}
      </div>

      {/* Profile Image */}
      <div className="profile-icon-container">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
          id="profile-upload"
        />
        <label htmlFor="profile-upload">
          <IconButton component="span">
            <Edit />
          </IconButton>
        </label>
        {profileImage ? (
          <Avatar src={profileImage} alt="Profile" sx={{ width: 100, height: 100 }} />
        ) : (
          <Avatar sx={{ width: 100, height: 100 }}>P</Avatar>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {isEditing ? (
          <div>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              multiline
              rows={4}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Agency Name"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleSaveClick}
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            <h2>{name}</h2>
            <p>{about}</p>
            <h3>{agencyName}</h3>
            <p>Website: {website}</p>
            <p>Phone: {phoneNumber}</p>
            <p>Address: {address}</p>
            <Button
              onClick={handleEditClick}
              variant="outlined"
              color="secondary"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
};

export default ProfileA;
