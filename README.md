# Server Rack Control Panel

This is a React based web application designed for use at Telesoft Technologies to control and monitor the servers in the R&D department.

It uses firebase for account control, data persistence and deployment.

---

## Setup

To connect the application to your firebase project, update the file src/config/firebase.js with your project's configuration object.

### Requirements

* Node.js

### Commands

Install NPM dependencies:

    npm install

Create optimized build:

    npm run build

Start application, accessible from http://localhost:3000:

    npm run start

Deploy application build on firebase:

    npm run deploy

---

## Page information

### Login

Log into application with your account email and password. Default login is 'admin@telesoft.com password'

### Dashboard

Contains a list of servers on the network

* Light indicators represent the power state of each system. Green for on, red for off and yellow for restarting.
* Click systems to expand and display additional information and controls
* Create new system entries with the "Add system" button
* After entering the required details, the rest is automatically generated to simulate possible real world system information
* The details of existing systems can be edited by clicking the "edit" button within their expanded view

### User Settings

Change account details such as email and password. Account can also be deleted from here.

### User Account Control

From this page, admin users can create new accounts and change the permissions of existing users. 

### Settings

Page to control the client side application features, including the disabling of notifications and toggling dark mode.
Currently not implemented.

### Help

Page containing the information provided in this file.