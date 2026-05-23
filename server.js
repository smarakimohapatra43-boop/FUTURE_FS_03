const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

require("dotenv").config();

const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((err) => {

    console.log("MongoDB Error");

    console.log(err);

});


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


const Booking = mongoose.model("Booking", bookingSchema);


app.post("/api/book-now", async (req, res) => {

    try {

        console.log(req.body);

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

        console.log("Booking Saved Successfully");

        res.send(`

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                font-family:sans-serif;
                background:#f5f5f5;
            ">

                <div style="
                    background:white;
                    padding:40px;
                    border-radius:15px;
                    box-shadow:0 5px 20px rgba(0,0,0,0.2);
                    text-align:center;
                ">

                    <h1 style="color:green;">
                        Booking Submitted Successfully ❤️
                    </h1>

                    <a href="/" style="
                        display:inline-block;
                        margin-top:20px;
                        padding:12px 25px;
                        background:#8b0000;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    ">
                        Back To Home
                    </a>

                </div>

            </div>

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

        console.log(error);

        res.status(500).json({

            message: "Error Fetching Bookings"

        });

    }

});


app.get("/test", (req, res) => {

    res.send("SERVER IS WORKING");

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});