# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# 🌦️ React Weather Dashboard

A professional weather forecasting application built with **React**, **TypeScript**, and **Redux Toolkit**. This project demonstrates scalable architecture, clean UI design, and robust state management.

## 🚀 Features
* **City Search:** Real-time weather data for any city globally.
* **5-Day Forecast:** Organized display of upcoming weather trends.
* **State Management:** Handled via **Redux Toolkit (RTK)** for predictable data flow.
* **Responsive UI:** Fully optimized for Mobile, Tablet, and Desktop using **Tailwind CSS**.
* **Error Handling:** Custom states for "City Not Found," "Loading," and "Network Issues."

## 🛠️ Tech Stack
* **Frontend:** React 19 + TypeScript
* **Build Tool:** Vite
* **State:** Redux Toolkit (Async Thunks for API calls)
* **API:** OpenWeatherMap API
* **Styling:** Tailwind CSS

## 📦 Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/Gmohan1011/weather_app)

Install dependencies: npm install

Environment Variables: VITE_WEATHER_API_KEY=your_api_key_here

Run the app: npm run dev