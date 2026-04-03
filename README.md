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
<h2>Admin Interface:</h2>
<p> Login and Signup interface:</p>
<img width="1905" height="867" alt="image" src="https://github.com/user-attachments/assets/14a6285d-f0ee-4911-b9a2-3f84e9e5f8c5" />

<p>Automatically generated insights:</p>
<img width="1887" height="873" alt="image" src="https://github.com/user-attachments/assets/c9559f39-0f1f-4cdb-ab46-2e0e2fc4bbc0" />
<img width="1881" height="872" alt="image" src="https://github.com/user-attachments/assets/03fd2b88-8c23-46dc-87d3-e05c3dfcc550" />
<img width="1879" height="866" alt="image" src="https://github.com/user-attachments/assets/03e90b91-e0c8-4a59-8a3e-5b172705808f" />



<p>Transactions Management:</p>
<img width="1869" height="866" alt="image" src="https://github.com/user-attachments/assets/7b5309e8-2575-48a7-a3e1-32ad3b62f194" />


<p>Add new transactions:</p>
<img width="1889" height="855" alt="image" src="https://github.com/user-attachments/assets/c72318f1-04ee-4b94-954f-b2c7922401c1" />
<p>Exported CSV File:</p>
<img width="1250" height="658" alt="image" src="https://github.com/user-attachments/assets/2731fec8-0fe7-4eb8-98a7-4107e3341565" />
<p>Dark Mode:</p>
<img width="1896" height="860" alt="image" src="https://github.com/user-attachments/assets/defbe4bc-6188-43a8-8d56-2e6d89667b18" />


<h2>Viewer Interface:</h2>
<img width="1874" height="868" alt="image" src="https://github.com/user-attachments/assets/34484c2f-4a11-42e7-b7e4-525f636aa501" />

<p>Role-Based UI(Read Only Interface):</p>
<img width="1882" height="866" alt="image" src="https://github.com/user-attachments/assets/2e11e912-15fb-48de-85c0-a207bfad66ed" />







---



---

## Conclusion

This project demonstrates a practical and scalable approach to building a finance dashboard using modern frontend technologies. It highlights strong fundamentals in UI design, state management, and component-based architecture, making it suitable for real-world applications.

