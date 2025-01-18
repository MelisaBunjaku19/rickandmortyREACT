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
      "Filter by Status": "Filter by Status",
      "All Names": "All Names",
      "All Origins": "All Origins",
      Alive: "Alive",
      Dead: "Dead",
      Unknown: "Unknown",
      "Filter by Species": "Filter by Species",
      Human: "Human",
      Alien: "Alien",
      gender: {
        Male: "Male",
        Female: "Female",
        Unknown: "Unknown",
      },
       "Apply Filters" : "Apply Filters",
      "Clear Filters": "Clear Filters",
      "Sort by Name A-Z" : "Sort by Name A-Z",
      "Sort by Name Z-A" : "Sort by Name Z-A",
      "Sort by Origin A-Z" : "Sort by Origin A-Z",
      "Sort by Origin Z-A" : "Sort by Origin Z-A",
      "Show Random" : "Show Random",
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
      "Filter by Status": "Filtern nach Status",
      "All Names": "Alle Namen",
      "All Origins": "Alle Ursprünge",
      Alive: "Lebendig",
      Dead: "Tot",
      Unknown: "Unbekannt",
      "Filter by Species": "nach Art filtern",
      Human: "Mensch",
      Alien: "Außerirdisch",
      gender: {
        Male: "Männlich",
        Female: "Weiblich",
        Unknown: "Unbekannt",
      },
         "Sort by Name A-Z" : "nach Namen sortieren A-Z",
         "Sort by Name Z-A" : "nach Namen sortieren Z-A",
        "Sort by Origin A-Z" : "nach Herkunft sortieren A-Z",
        "Sort by Origin Z-A" : "nach Herkunft sortieren Z-A",
      "Apply Filters" : "Filter anwenden",
      "Clear Filters" : "Filter löschen",
      "Show Random" : "Zufällig Anzeigen",
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
      "Filter by Status": "Filtro sipas gjendjes",
      "All Names": "Te gjitha emrat",
      "All Origins": "Te gjitha prejardhjet",

      Alive: "I gjalle",
      Dead: "I vdekur",
      Unknown: "E panjohur",
      "Filter by Species": "Filtro sipas species",
      Human: "Njeri",
      Alien: "Alien",
      "Apply Filters" : "Apliko filterat",
      "Clear Filters" : "Pastroji filterat",
            "Sort by Name A-Z" : "Rendit sipas emrit A-Z",
            "Sort by Name Z-A" : "Rendit sipas emrit Z-A",
        "Sort by Origin A-Z" : "Rendit sipas prejardhjes A-Z",
        "Sort by Origin Z-A" : "Rendit sipas prejardhjes Z-A",
       "Show Random" : "Trego te rastesishme",
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
  lng: 'en', //default language mundet edhe shqip, gjermanisht 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
