# Vehicles-Api
This API project is to get all the vehicle makes from:
https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML
and get all the Vehicle Types per Make
https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml


## Installation using NPM

Before installing, download and install Nodejs & make sure you are inside the project folder.

Install NPM packages using the below command.

```bash
$ npm install
```

## Database Setup

Update the MongoDB_URL on app.ts.

## How to run
From project folder, run the following code to start the server.

```bash
$ npm start
```

### Check it out


```bash
$ curl http://localhost:3000/vehicle
```


```bash
$ curl http://localhost:3000/vehicle?limit=10&page=1
```

