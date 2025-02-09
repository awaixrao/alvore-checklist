import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "search_placeholder": "Search Fleetio",
      "welcome": "Welcome to Alvore Checklist",
      "changeLanguage": "Change Language",
      "settings": {
        title: 'Settings',
        language: 'Language',
        languageDescription: 'Switch between English and Spanish',
      },
    },
  },
  es: {
    translation: {
      "search_placeholder": "Buscar en Fleetio",
      "welcome": "Bienvenido a la lista de verificación de Alvore",
      "changeLanguage": "Cambiar idioma",
      "settings": {
        title: 'Configuración',
        language: 'Idioma',
        languageDescription: 'Cambiar entre inglés y español',
      },
      "panel":"danel"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // ✅ Default language from localStorage
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
