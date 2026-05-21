const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

require("dotenv").config();

const app = express();

/* =========================
MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =========================
STATIC FOLDER
========================= */

app.use(express.static(path.join(__dirname, "public")));

/* =========================
HOME ROUTE
========================= */

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

/* =========================
MONGODB CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((err) => {

    console.log("MongoDB Error");

    console.log(err);

});

/* =========================
SCHEMA
========================= */

const bookingSchema = new mongoose.Schema({

    name: String,

    email: String,

    phone: String,

    eventDate: String,

    eventType: String,

    guests: Number,

    address: String,

    rooms: String,

    roomType: String,

    requirements: String

});

/* =========================
MODEL
========================= */

const Booking = mongoose.model("Booking", bookingSchema);

/* =========================
BOOKING ROUTE
========================= */

app.post("/api/book-now", async (req, res) => {

    console.log(req.body);

    try {

        const booking = new Booking({

            name: req.body.name,

            email: req.body.email,

            phone: req.body.phone,

            eventDate: req.body.date,

            eventType: req.body["event-type"],

            guests: req.body["no-of-guests"],

            address: req.body.address,

            rooms: req.body.rooms,

            roomType: req.body.roomType,

            requirements: req.body["more-info"]

        });

        await booking.save();

        console.log("Booking Saved");

        res.send(`

            <h1 style="
                text-align:center;
                margin-top:100px;
                color:green;
                font-family:sans-serif;
            ">
                Booking Submitted Successfully ❤️
            </h1>

        `);

    }

    catch(error){

        console.log(error);

        res.status(500).send("Error Saving Booking");

    }

});
app.get("/api/bookings", async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.json(bookings);

    }

    catch(error){

        res.status(500).json({

            message: "Error Fetching Bookings"

        });

    }

});

/* =========================
PORT
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});
app.get("/test", (req, res) => {

    res.send("SERVER IS WORKING");

});