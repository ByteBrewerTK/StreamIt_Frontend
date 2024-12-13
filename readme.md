# StreamIt Frontend

StreamIt is a modern video streaming platform, providing users with a seamless experience for watching, sharing, and managing video content. This repository contains the frontend code for StreamIt, built with React and Tailwind CSS.

## Features

-   **Responsive Design**: Optimized for all screen sizes.
-   **User Authentication**: Register, log in, and manage profiles.
-   **Video Management**: Upload, edit, delete, and watch videos.
-   **Search and Filter**: Quickly find videos with robust search and filter functionalities.
-   **Interactive Features**: Like, comment, and share videos.
-   **Dark and Light Modes**: Customize the interface according to user preferences.

## Demo

A live demo of the application can be found [here](https://bytebrewer.site).

## Technologies Used

-   **React**: Frontend library for building user interfaces.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **React Router**: For managing routes and navigation.
-   **Axios**: For API requests.
-   **Vite**: Development and build tool for lightning-fast performance.

## Prerequisites

Ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v16+)
-   [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ByteBrewerTK/StreamIt_Frontend.git
cd streamit-frontend
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
VITE_API_BASE_URL=http://your-backend-api-url
```

### 4. Run the Application

```bash
npm run dev
```

or

```bash
pnpm run dev
```

Visit `http://localhost:5173` to view the application in your browser.

## Project Structure

```plaintext
src/
├── components/        # Reusable UI components
├── pages/             # Page components for routes
├── services/          # API calls and utilities
├── styles/            # Global styles and Tailwind configurations
├── hooks/             # Custom React hooks
├── context/           # Context API providers
└── App.jsx            # Root component
```

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the application for production.
-   `npm run preview`: Preview the production build.
-   `pnpm run dev`: Start the development server with pnpm.
-   `pnpm run build`: Build the application for production with pnpm.
-   `pnpm run preview`: Preview the production build with pnpm.

## Contribution

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## Acknowledgments

Special thanks to all contributors and the open-source community for their continuous support and inspiration.

---

Enjoy using **StreamIt** and happy coding!
