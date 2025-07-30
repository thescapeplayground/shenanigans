# Shenanigans

Always a WIP, also, f*cked up commit names as well. ;D

## Components used

> Typescript / Javascript

> React, NextJS, TailwindCSS

> Tanstack Query

> realm. (v8.0.0 rev3)

> shadcn/UI

## Copyright

Originally made by [Irvan Malik Azantha](https://github.com/irvanmalik48), Layouts by [Ayan Biswas](https://github.com/not-ayan). Licensed in RCCL.

### To get started, take a look at src/app/page.tsx.

# Setting Up Tailwind CSS, React, and npm

This guide walks you through setting up a project with Tailwind CSS, React, and npm.

## Prerequisites

* **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed. You can download them from [nodejs.org](https://nodejs.org/).
* **Basic Terminal Knowledge:** Familiarity with using the command line or terminal is essential.

## Step-by-Step Instructions

1.  **Create a New React Project:**

    Open your terminal and run the following command to create a new React project using Create React App:

    ```bash
    npx create-react-app my-tailwind-react-app
    cd my-tailwind-react-app
    ```

    Replace `my-tailwind-react-app` with your desired project name.

2.  **Install Tailwind CSS and its Peer Dependencies:**

    Install Tailwind CSS, PostCSS, and Autoprefixer as development dependencies:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

3.  **Initialize Tailwind CSS:**

    Generate `tailwind.config.js` and `postcss.config.js` files:

    ```bash
    npx tailwindcss init -p
    ```

4.  **Configure Template Paths:**

    Open `tailwind.config.js` and modify the `content` array to specify the paths to your template files. This ensures Tailwind CSS scans your files for used class names.

    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

5.  **Add Tailwind Directives to your CSS:**

    Create a `src/index.css` file (if it doesn't already exist) and add the Tailwind directives:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

6.  **Import the CSS File:**

    Import the `src/index.css` file into your `src/index.js` file:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css'; // Import Tailwind CSS
    import App from './App';
    import reportWebVitals from './reportWebVitals';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    reportWebVitals();
    ```

7.  **Start the Development Server:**

    Run the following command to start the development server:

    ```bash
    npm start
    ```

    Your React application should now be running with Tailwind CSS integrated.

## Example Usage

In your React components, you can now use Tailwind CSS utility classes:

```jsx
// src/App.js
import React from 'react';

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
        <p className="text-gray-700">This is a simple React component using Tailwind CSS.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;
