import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
       Name: "Names",
      Status: "Status",
      Species: "Species",
      Gender: "Gender",
      Origin: "Origin",
      "Load More": "Load More",
      "All Status": "All Statuses",
      "All Names": "All Names",
      "All Origins": "All Origins",
      Alive: "Alive",
      Dead: "Dead",
      Unknown: "Unknown",
      "All Species": "All Species",
      Human: "Human",
      Alien: "Alien",
      gender: {
        Male: "Male",
        Female: "Female",
        Unknown: "Unknown",
      },
      origin: {
        Earth: "Earth",
        "Alien Planet": "Alien Planet",
        Unknown: "Unknown",
      },
    },
  },
  de: {
    translation: {
      Name: "Namen",
      Status: "Status",
      Species: "Art",
      Gender: "Geschlecht",
      Origin: "Herkunft",
      "Load More": "Mehr laden",
      "All Status": "Alle Status",
      "All Names": "Alle Namen",
      "All Origins": "Alle Ursprünge",
      Alive: "Lebendig",
      Dead: "Tot",
      Unknown: "Unbekannt",
      "All Species": "Alle Arten",
      Human: "Mensch",
      Alien: "Außerirdisch",
      gender: {
        Male: "Männlich",
        Female: "Weiblich",
        Unknown: "Unbekannt",
      },
      origin: {
        Earth: "Erde",
        "Alien Planet": "Außerirdischer Planet",
        Unknown: "Unbekannt",
      },
    },
  },
  al: {
    translation: {
      Name: "Emrat",
      Status: "Gjendja",
      Species: "Specia",
      Gender: "Gjinia",
      Origin: "Prejardhja",
      "Load More": "Ngarkoni per me shume",
      "All Status": "Te gjitha gjendjet",
      "All Names": "Te gjitha emrat",
      "All Origins": "Te gjitha prejardhjet",
      Alive: "I gjalle",
      Dead: "I vdekur",
      Unknown: "E panjohur",
      "All Species": "Te gjitha speciet",
      Human: "Njeri",
      Alien: "Alien",
      
      gender: {
        Male: "Mashkull",
        Female: "Femër",
        Unknown: "Të panjohura",
      },
      origin: {
        Earth: "Tokë",
        "Alien Planet": "Planet Alien",
        Unknown: "Të panjohura",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // You can set this to your default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
