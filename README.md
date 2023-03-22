# Group 55 - Mobile Weather App

**0. Before running the app, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 9.4.0 & node v: 19.6.1) :**

```sh
node -v
npm -v
```

## Instructions of how to run the code

**1. Install the dependencies (if have not already) :**

```sh
npm install
```

**2. Download the zip file containing the source code :**

**3. Open a terminal and change the directory so it points to ec522**

For example:

```sh
C:\Users\JohnDoe\...\ecs522
```

## Development Workflow


**4. Start a live-reload development server to view the weather app :**

```sh
npm run dev
```

## Weather App Overview

- The initial run will display the iPhone version (iPhone 6/7 Plus screen size); however, if you modify the path on the url bar by adding "/ipad", you can view the tablet version (iPad Air screen size).

- When starting the app it will ask permission for using your current location. Granting access enables the home page to render weather data for your current location. Denying access makes London to be the default location.

- The home page shows general weather information (such as temperature, chance of precipitation and wind speed) as well as a forecast for the rest of the day.

- The weekly weather page is accessed when clicking the 'Week' button on the home page. This shows the 5 day forecast from the day you are currently in.

- The location page allows the user to select city names to view the current weather in those locations.