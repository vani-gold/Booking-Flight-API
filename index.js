const Joi = require('joi');
const fs = require('fs');
const express = require("express");
const { json } = require("express");

const http = require('http');
const url = require('url');

const flightRouter = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(express.json());
app.use(json());

// app.use("/", routes);

app.use((req, res, next) => {
  console.log('hello middleware') ;
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const flights = JSON.parse(
  fs.readFileSync(`${__dirname}/flight.json`)
);

// GET ALL FLIGHT
const getAllFlights = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: flights.length,
      data: {
          flights
      }
  })
  };

  // post/add a flight
// app.post('/api/v1/flights', (req, res) => {
//   const flight = {
//     id: flights.length + 1,
//     title: req.body.title
//   };
//   flights.push(flight);
//   res.send(flight);
// });

  // ADD OR POST A FLIGHT
const addFlight = (req, res) => {
  const newId = flights[flights.length-1].id + 1;
  const newFlight = Object.assign({id: newId}, req.body);
  flights.push(newFlight);
  fs.writeFile(`${__dirname}/flight.json`, JSON.stringify(flights),
   err => {
        res.status(201).json({
        status: 'success',
        data: {
        New_flight: newFlight
    }
  });
  // res.send('Done')
  });
}
// GET ONE FLIGHT
const getflight = (req, res) => {
  const id = req.params.id*1;
  const flight = flights.find(el => el.id === id)
   if(!flight){
    return res.status(404).json({
      stutus: 'fail',
      message: 'Invalid ID'
    });
   }
   res.status(200).json({
    status: 'success',
    data: {
      flight
    }
   })
}
// UPDATE A FLIGHT
const updateFlight = (req, res) => {
  const id = req.params.id*1;
  const flight = flights.find(el => el.id === id)
   if(!flight){
    return res.status(404).json({
      stutus: 'fail',
      message: 'Invalid ID'
    });
   }
   flight.title = req.body.title;
   flight.time = req.body.time;
   flight.price = req.body.price;
   flight.date = req.body.date;
   res.send(flight);
}

// DELETE A FLIGHT
const deleteFlight = (req, res) => {
  const id = req.params.id*1;
  const flight = flights.find(el => el.id === id)
  const index = flights.indexOf(flight);
  flights.splice(index, 1);

   if(!flight){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  
   }
   res.send(flight);
}




app.get('/api/v1/flights', getAllFlights);
app.post('/api/v1/flights', addFlight);
app.get('/api/v1/flights/:id', getflight);
app.patch('/api/v1/flights/:id', updateFlight);
app.delete('/api/v1/flights/:id', deleteFlight);

// app.use('/api/v1/flights', flights);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// module.exports = app;
