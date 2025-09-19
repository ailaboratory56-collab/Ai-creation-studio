const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: "YOUR_RAZORPAY_KEY",
    key_secret: "YOUR_RAZORPAY_SECRET"
});

app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
