import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe, FaFlag } from 'react-icons/fa'; // Use FaGlobe for the globe icon

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
          <FaGlobe style={styles.icon} /> {/* Globe icon for the language toggle */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleLanguageChange('en')}>
            <div style={styles.languageItem}>
              <FaFlag style={styles.flagIcon} />
              <span style={styles.languageText}>English</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange('de')}>
            <div style={styles.languageItem}>
              <FaFlag style={styles.flagIcon} />
              <span style={styles.languageText}>German</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange('al')}>
            <div style={styles.languageItem}>
              <FaFlag style={styles.flagIcon} />
              <span style={styles.languageText}>Shqip</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

  const styles = {

      container: {
        position: 'fixed',
        bottom: '10px',
        right: '5px',
        zIndex: 1000,
      },
      toggle: {
        background: '#45804c',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        fontSize: '1.5rem',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        margin: '5px'
      },
      toggleHover: {
        background: '#8ab32b', 
      },
    
      icon: {
        fontSize: '1.5rem',
        color: '#fff', // 
      },
      languageItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
      },
      flagIcon: {
        fontSize: '1.5rem',  // Size of the world icon
        borderRadius: '50%', // Circular shape
        backgroundColor: '#45804c',  // Light background
        padding: '5px', // Padding to make it circular
        marginRight: '20px',
      },
      languageText: {
        fontSize: '1rem',
      },
    };

export default LanguageSwitcher;
