import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useLocation } from 'react-router-dom'; 
import './ProfilePage.css';

const ProfilePage = () => {
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

  // Education, Skills, Certifications States
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({ degree: '', institute: '', percentage: '', startDate: '', endDate: '' });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState({ name: '', institute: '', startDate: '', endDate: '' });

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
      setEducation(storedData.education || []);
      setSkills(storedData.skills || []);
      setCertifications(storedData.certifications || []);
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
      education,
      skills,
      certifications,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [bannerImage, profileImage, agencyName, website, phoneNumber, address, name, about, education, skills, certifications]);

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

  // Education functions
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prevState => ({ ...prevState, [name]: value }));
  };

  const addEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation({ degree: '', institute: '', percentage: '', startDate: '', endDate: '' });
  };

  const deleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  // Skills functions
  const addSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Certification functions
  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prevState => ({ ...prevState, [name]: value }));
  };

  const addCertification = () => {
    setCertifications([...certifications, newCertification]);
    setNewCertification({ name: '', institute: '', startDate: '', endDate: '' });
  };

  const deleteCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
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

      {/* Education Section */}
      <Box sx={{ marginTop: 4 }}>
        <h3>Education</h3>
        <TextField
          label="Degree"
          name="degree"
          value={newEducation.degree}
          onChange={handleEducationChange}
          fullWidth
        />
        <TextField
          label="Institute"
          name="institute"
          value={newEducation.institute}
          onChange={handleEducationChange}
          fullWidth
        />
        <TextField
          label="Percentage"
          name="percentage"
          value={newEducation.percentage}
          onChange={handleEducationChange}
          fullWidth
        />
        <TextField
          label="Start Date"
          name="startDate"
          value={newEducation.startDate}
          onChange={handleEducationChange}
          fullWidth
        />
        <TextField
          label="End Date"
          name="endDate"
          value={newEducation.endDate}
          onChange={handleEducationChange}
          fullWidth
        />
        <Button onClick={addEducation} variant="contained" sx={{ marginTop: 2 }}>
          Add Education
        </Button>

        <List>
          {education.map((edu, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${edu.degree} at ${edu.institute}`} secondary={`${edu.percentage} - ${edu.startDate} to ${edu.endDate}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteEducation(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Skills Section */}
      <Box sx={{ marginTop: 4 }}>
        <h3>Skills</h3>
        <TextField
          label="Add Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          fullWidth
        />
        <Button onClick={addSkill} variant="contained" sx={{ marginTop: 2 }}>
          Add Skill
        </Button>

        <List>
          {skills.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={skill} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSkill(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Certifications Section */}
      <Box sx={{ marginTop: 4 }}>
        <h3>Certifications</h3>
        <TextField
          label="Certification Name"
          name="name"
          value={newCertification.name}
          onChange={handleCertificationChange}
          fullWidth
        />
        <TextField
          label="Institute"
          name="institute"
          value={newCertification.institute}
          onChange={handleCertificationChange}
          fullWidth
        />
        <TextField
          label="Start Date"
          name="startDate"
          value={newCertification.startDate}
          onChange={handleCertificationChange}
          fullWidth
        />
        <TextField
          label="End Date"
          name="endDate"
          value={newCertification.endDate}
          onChange={handleCertificationChange}
          fullWidth
        />
        <Button onClick={addCertification} variant="contained" sx={{ marginTop: 2 }}>
          Add Certification
        </Button>

        <List>
          {certifications.map((cert, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${cert.name} from ${cert.institute}`} secondary={`${cert.startDate} to ${cert.endDate}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteCertification(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ProfilePage;
