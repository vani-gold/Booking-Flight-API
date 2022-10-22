const fs = require('fs');


exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}
// const flight = JSON.parse(
//     fs.readFileSync(`${__dirname}/../flight.json`)
// );

// exports.getAllFlights = (req, res) => {
// console.log(req.requestTime);
// res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: flight.length,
//     data: {
//         flight
//     }
// })
// };
