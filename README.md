Fintech Dashboard

A simple Fintech Dashboard built with Next.js App Router. It displays account balance and transactions using local JSON files as mock APIs.

🚀 Live Demo
Live Demo on Vercel
fintech-dash-seven.vercel.app

📦 Tech Stack
Next.js (App Router)

Local JSON APIs

Tailwind CSS 

🧩 Features
Display current account balance

List of transactions

Clickable transactions to view details

Search and filter transactions by status

API routes reading from local /data folder

📁 Folder Structure
graphql
Copy
Edit
src/
├── app/
│   ├── api/             # API routes using JSON data
│   ├── components/      # Reusable UI components
│   ├── page.jsx         # Main dashboard page
│   └── layout.jsx       # Shared layout (e.g., Navbar)
├── data/                # JSON files for account and transactions


🛠️ Getting Started
Clone the repo

git clone https://github.com/negpinkyy/fintech-dashboard.git

cd fintech-dashboard

Install dependencies

npm install
# or
yarn install

Run the development server

npm run dev

Open http://localhost:3000 to view the dashboard.

