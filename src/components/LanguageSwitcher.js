import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe, FaFlag } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  const languages = [
    { code: 'en', label: t('English') },
    { code: 'de', label: t('German') },
    { code: 'al', label: t('Albanian') },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div style={styles.container}>
      <Dropdown show={isDropdownOpen} onToggle={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Dropdown.Toggle variant="link" id="language-dropdown" style={styles.toggle}>
          <FaGlobe style={styles.icon} /> {languages.find(l => l.code === selectedLanguage)?.label || 'English'}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          {languages.map(({ code, label }) => (
            <Dropdown.Item key={code} onClick={() => handleLanguageChange(code)}>
              <div style={styles.languageItem}>
                <FaFlag style={styles.flagIcon} />
                <span style={styles.languageText}>{label}</span>
              </div>
            </Dropdown.Item>
          ))}
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
    borderRadius: '20px',
    padding: '10px 15px',
    fontSize: '1rem',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#fff',
  },
  languageItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
  },
  flagIcon: {
    fontSize: '1.2rem',
    borderRadius: '50%',
    backgroundColor: '#45804c',
    padding: '5px',
    marginRight: '10px',
    color: '#fff',
  },
  languageText: {
    fontSize: '1rem',
  },
};

export default LanguageSwitcher;
