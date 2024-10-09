import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const Test = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Enter Your Name"); // Default naam
  const [about, setAbout] = useState("Enter your ABout"); // Default about

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleSaveClick = () => {
    // Yahan aap data ko save karne ka logic laga sakte hain
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSaveClick(); // Save karne ka function call
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isEditing ? (
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress} // Enter key event listener
            fullWidth // Full width for better UX
            margin="normal" // Margin for spacing
          />
          <TextField
            label="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            multiline
            rows={4}
            onKeyPress={handleKeyPress} // Enter key event listener
            fullWidth // Full width for better UX
            margin="normal" // Margin for spacing
          />
          <Button
            onClick={handleSaveClick}
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }} // Margin for spacing
          >
            Save
          </Button>
        </div>
      ) : (
        <div>
          <h2>{name}</h2>
          <p>{about}</p>
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
  );
};

export default Test;
