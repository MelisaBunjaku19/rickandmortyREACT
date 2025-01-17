import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { FaLanguage } from 'react-icons/fa'; // FontAwesome language icon

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    console.log(`Switching language to ${lang}`); // Debug log to verify language change
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false); // Close the dropdown after selecting the language
  };

  return (
    <div style={styles.container}>
      <Dropdown
        show={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        autoClose="outside"
      >
        <Dropdown.Toggle variant="link" id="language-dropdown" style={styles.toggle}>
          <FaLanguage style={styles.icon} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange('de')}>German</Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange('al')}>Shqip</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed', // Changed to fixed to ensure it's always visible at the bottom
    bottom: '10px',
    right: '20px',
    zIndex: 1000, // Ensures it stays on top of other content
  },
  toggle: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    color: '#333',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#333',
  },
};

export default LanguageSwitcher;
