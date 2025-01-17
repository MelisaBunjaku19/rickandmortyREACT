import React from 'react';
import './i18n';  // Ensure i18n is imported so it initializes the translations
import CharacterList from './components/CharacterList';
import LanguageSwitcher from './components/LanguageSwitcher';

const App = () => (
  <div>
    <LanguageSwitcher />  {/* Ensure this is placed where you want the language switcher */}
    <CharacterList />  {/* This component will now reflect the selected language */}
  </div>
);

export default App;
