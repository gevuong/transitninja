# transitninja

## Overview
An iOS mobile app providing real time tracking of local public transit systems in the greater San Francisco bay area. Intended to provide public transit users a reliable app for finding optimal public transit routes based on current location and target destination. Users can also check to see if their route is on schedule, see current location of busses on the map, and can select a bus to see the route it is on.

## How to use transitninja
transitninja was designed to be as intuitive as possible for users. Although, here are a few tips to the app:
* Tap a bus to see that bus's route name
![Bus_Label](images/bus_label_screenshot.png)
* Click on the search bar to open the keyboard and enter a destination to get the optimal route
* Tap the toggle buttons in the bottom right corner of the screen to toggle bus icons rendering to the map for the respective agencies (by default busses are rendered)
* Tap the icon above the toggles to reset the map to your current location


## Technologies

#### Backend
On the backend we used MongoDB for our database to store information pertaining to busses and transit agencies. We also used Node.js with a Express.js framework on the backend.

#### Frontend
Our frontend was created using React Native. We used Axios to make API calls to our backend to retrieve data from our database.

#### APIs
* 511.org - We made API calls to 511.org to retrieve information pertaining to realtime vehicle positions. These API calls were returned in GTFS-RT format, which is a language agnostic message system used in the transportation industry. We converted the results of these calls into javascript objects using NPM's GTFS-realtime Language Bindings library.

#### Technical Challenges
* One significant challenge we encountered occurred in our backend while trying to send updated bus API data to the frontend. We had three asynchronous functions that were dependent on each other, and the function that posts our data into the database was executing prior to receiving the necessary data to send. We corrected this by associating a request-promise to the function it was dependent on so that it would wait until the prior function was executed.

```javascript

app.get('/api/actransitBusses', function(req, res) {
  actransitBusModel.remove().exec();
  rp({
    method: 'GET',
    url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=actransit`,
    encoding: null
  }).then(function(arr){
    let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
    let actransitArr = [];
    array.forEach(function(entity) {
      if (actransitInfo[entity.vehicle.trip.trip_id]) {
      actransitArr.push({
        'id': entity.id,
        'trip_id': entity.vehicle.trip.trip_id,
        'lon': entity.vehicle.position.longitude,
        'lat': entity.vehicle.position.latitude,
        'stop_id': entity.vehicle.stop_id,
        'trip_headsign': actransitInfo[entity.vehicle.trip.trip_id].trip_headsign,
        "route_short_name": actransitInfo[entity.vehicle.trip.trip_id].route_short_name,
        "route_long_name": actransitInfo[entity.vehicle.trip.trip_id].route_long_name
        });
      }
    });
  actransitBussesModel.create(actransitArr, function(err, results){
    if (err) {
      return console.log(err);
    }
    res.send(actransitArr);
  });
});
});
```
