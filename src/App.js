import React from 'react';
import './i18n';  // Ensure i18n is imported so it initializes the translations
import CharacterList from './components/CharacterList';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => (
  <div>
    <LanguageSwitcher />  
    <CharacterList />  
  </div>
);

export default App;
