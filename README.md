# Web Application
![presentation gif](light.gif)
## Overview
This is a web application built using Angular for the frontend and .NET 8 Web API for the backend. It acts as a wrapper application for managing and interacting with a Homebridge server. The application communicates directly with the Homebridge API to provide enhanced functionality, such as managing devices and configurations. Both the Homebridge API and this application require authentication for secure access.

### Key Features
- **Google Authentication**: Secure user login and access control using OAuth.
- **Homebridge API Integration**: The web application connects to the Homebridge API to retrieve and manage data.
- **Automatic Device Detection**: Automatically detects devices connected to the Homebridge server.
- **Device Control**: Allows users to control and manage detected devices through an intuitive interface.
- **Responsive Design**: The application is fully responsive, offering optimized views for both mobile and web platforms.
- **Authentication Layers**: Both the Homebridge API and the application backend enforce authentication for added security.

## Prerequisites
1. **Node.js**
2. **Angular CLI**
3. **.NET SDK**
4. **Google API Console**

## Configuration
Use the following `appsettings.json` for your setup:
```json
{
  "Homebridge": {
    "Username": "*****",
    "Password": "******",
    "HomebridgeBaseUrl": "http://192.168.0.45:8230"
  },
  "Google": {
    "ClientId": "******",
    "ClientSecret": "******"
  }
}
