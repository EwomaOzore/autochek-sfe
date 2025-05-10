# Autochek Dashboard

A responsive dashboard built with React and TypeScript that displays a list of users, their details, and interactive charts using the JSONPlaceholder API.

## Features

- 📋 User list with pagination
- 🔍 Search and filter functionality
- 📊 Interactive charts showing user statistics (using Recharts)
- 🌓 Dark/light theme toggle
- 📱 Responsive design (mobile + desktop)
- ♿ Accessibility best practices (keyboard navigation, ARIA)
- 🧪 Unit tests using Jest and React Testing Library

## Tech Stack

- React 19
- TypeScript
- React Router
- TanStack React Query
- Recharts for data visualization
- Tailwind CSS for styling
- Mock Service Worker (MSW) for API mocking
- Jest and React Testing Library for testing
- Storybook for component documentation
- Internationalization (i18n) support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/autochek-dashboard.git
   cd autochek-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run storybook` - Starts Storybook for component development
- `npm run build-storybook` - Builds Storybook for deployment

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/         # Generic UI components
│   ├── features/       # Feature-specific components
│   └── layout/         # Layout components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── mocks/              # MSW mock service definitions
├── pages/              # Application pages
├── services/           # API services
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Testing

The project includes unit and integration tests for critical components. Run the tests with:

```
npm test
# or
yarn test
```

## Accessibility

This project follows accessibility best practices:
- Proper semantic HTML
- Keyboard navigation support
- ARIA attributes
- Color contrast compliance
- Screen reader support

## Learn More

To learn more about the technologies used in this project:
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [TanStack React Query](https://tanstack.com/query/v4)
- [Recharts](https://recharts.org/en-US/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mock Service Worker](https://mswjs.io/)
- [Storybook](https://storybook.js.org/)
