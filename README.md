# MySound: A React App For Top Tracks

Welcome to **MySound**, a React app that allows users to authenticate with their Spotify accounts to retrieve personalized music data, such as user profiles, top tracks, and listening habits over various time periods.

## Features

- **Spotify User Authentication**: Log in securely using your Spotify account.
- **User Profile Data**: View your Spotify profile, including your profile picture and username.
- **Top Tracks Insights**: Discover your most-played tracks across three time ranges:
  - Long Term (all time)
  - Medium Term (last 6 months)
  - Short Term (last month)

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- A Spotify Developer account to set up the necessary credentials for the app.
- Your Spotify app set up with a **Client ID** and **Redirect URI** in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MarcusCHill/MySound.git
   cd MySound
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:  
   Create a `.env` file in the project root directory and add the following variables:
   ```env
   REACT_APP_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
   REACT_APP_REDIRECT_URI=http://localhost:3000/callback
   ```
   - Replace YOUR_SPOTIFY_CLIENT_ID with your Spotify app’s Client ID from the Spotify Developer Dashboard.
   - The REACT_APP_REDIRECT_URI should match the Redirect URI you set up in your Spotify Developer App settings.
4. **Spotify Developer Configuration**:  
   To ensure the app can access Spotify data, configure your Spotify Developer App settings:

   - **Redirect URI**:

     - Log in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
     - Select or create your app and navigate to the **Settings** tab.
     - Add `http://localhost:3000/callback` to the **Redirect URIs** section and save the changes.

   - **User Management**:
     - In development mode, you need to list Spotify accounts that can access the app.
     - Add your Spotify account (or other test accounts) to the **User Management** section of your app's settings.

5. **Start the App**:  
   Run the following command in your terminal to start the development server:
   ```bash
   npm start
   ```
6. **Access the App**:  
   Open your browser and go to: http://localhost:3000

### How It Works

1. **Authentication**:  
   When you launch the app, you can navigate to be redirected to Spotify’s login page. Enter your credentials to authenticate.

2. **Permission Grant**:  
   After successful authentication, the app requests permission to access your profile and music data. Once granted, the app receives a token for secure communication with the Spotify Web API.

3. **Explore Your Data**:
   - View your **Spotify profile**, including your username and profile picture.
   - Check out your **top tracks** based on listening history, categorized into three time ranges:
     - **Long Term**: Tracks played over all time.
     - **Medium Term**: Tracks played in the last 6 months.
     - **Short Term**: Tracks played in the last month.

### Notes

- This app operates in **development mode** and requires you to set up your own Spotify developer credentials (Client ID and Redirect URI).
- Make sure the **Redirect URI** (`http://localhost:3000/callback`) is properly set in your Spotify Developer Dashboard.
- During testing, ensure that the Spotify account you're using is listed in the **User Management** section of your Spotify app's developer settings.
- The app uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to securely fetch user data, including profile information and listening history.
