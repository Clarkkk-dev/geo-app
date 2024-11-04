# Geo App Location

## Overview
Geo App Location is a web application built with ReactJS that allows users to retrieve and display geolocation information based on IP addresses. It features user authentication, a history of IP address searches, and the ability to visualize locations on a map. The app utilizes the IPinfo API to fetch geolocation data and stores user history in a relational database (MySQL).

### Key Features
- User authentication with login credentials.
- Display of the user's IP and geolocation information.
- Ability to enter new IP addresses and view their geolocation.
- History tracking of searched IP addresses, with options to click and display details again.
- Error handling for invalid IP addresses.

## Technologies Used
- **Frontend:**
  - ReactJS
  - Redux Toolkit (RTK) for state management
  - Tailwind CSS for styling
  - Axios for API calls

- **Backend:**
  - Node.js with Express
  - MySQL for the relational database
  - IPinfo API for geolocation data

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node package manager)
- MySQL Workbench

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/geo-app-backend.git
   cd geo-app-backend
