# Finance Dashboard UI

## Overview

Finance Dashboard UI is a modern frontend application designed to help users track, analyze, and manage their financial activity through an intuitive and interactive interface.

The application focuses on clean design, modular architecture, and real-world frontend practices. It demonstrates how financial data can be structured, visualized, and interacted with effectively without relying on a backend.

Live Demo: https://finance-hub-smoky.vercel.app/

---

## Features

### Dashboard Overview

* Displays key financial metrics:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization for financial trends
* Category-based visualization for spending distribution

### Transactions Management

* View transactions with:

  * Date
  * Amount
  * Category
  * Type (Income or Expense)
* Search functionality for quick lookup
* Filtering by transaction type
* Structured and readable data presentation

### Role-Based UI

* Role switching between Viewer and Admin
* Viewer:

  * Read-only access
* Admin:

  * Add new transactions
  * Delete transactions
* Implemented using frontend state simulation

### Authentication (Frontend Simulation)

* Login and Signup interface
* Simulated authentication flow
* Designed for extensibility with backend integration

### Insights Section

* Automatically generated insights such as:

  * Highest spending category
  * Monthly comparisons
* Based on dynamic calculations from transaction data

### Data Export

* Export transaction data as CSV
* Enables external analysis and reporting

### Additional Features

* Responsive design across devices
* Clean and consistent UI
* Graceful handling of empty states
* Modular and reusable components

---

## Tech Stack

* React with TypeScript
* Tailwind CSS
* Recharts (data visualization)
* Vite (build tool)
* Context API for state management

---

## Project Structure

```
src/
 ├── components/     # Reusable UI components (cards, charts, tables)
 ├── context/        # Global state management
 ├── data/           # Mock data for transactions
 ├── hooks/          # Custom React hooks
 ├── lib/            # Utility libraries and helpers
 ├── pages/          # Application pages (Dashboard, Auth)
 ├── types/          # TypeScript type definitions
 ├── utils/          # Helper functions
 ├── App.tsx         # Root component
 ├── main.tsx        # Entry point
```

---

## State Management

The application uses a centralized state approach with Context API and hooks to manage:

* Transactions data
* User role (Admin or Viewer)
* Filters and search queries
* Authentication state

This ensures a clean data flow and scalable architecture.

---

## Key Design Decisions

* Modular folder structure for maintainability
* Separation of UI, logic, and data layers
* Use of TypeScript for type safety and scalability
* Mock data to simulate real-world financial scenarios
* Lightweight state management for simplicity
* Focus on usability and clarity over unnecessary complexity

---

## Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

```
git clone https://github.com/sanjanapatil01/finance-hub.git
cd finance-dashboard
npm install
```

### Run the Application

```
npm run dev
```

### Build for Production

```
npm run build
```

---

## Screenshots

(Add your screenshots here)

---



---

## Conclusion

This project demonstrates a practical and scalable approach to building a finance dashboard using modern frontend technologies. It highlights strong fundamentals in UI design, state management, and component-based architecture, making it suitable for real-world applications.

