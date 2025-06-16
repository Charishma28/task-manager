// src/PopupTest.js
import React from 'react';

function PopupTest() {
  const handleClick = () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      alert("✅ You clicked OK!");
    } else {
      alert("❌ You clicked Cancel!");
    }
  };

  return <button onClick={handleClick}>Test Popup</button>;
}

export default PopupTest;
