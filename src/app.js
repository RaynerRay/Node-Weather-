const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
//setup routes

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// Start Server
app.listen(3000, () => {
  console.log("My first server is up");
});
