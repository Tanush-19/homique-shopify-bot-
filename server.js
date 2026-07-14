require("dotenv").config();

const express = require("express");
const orderCreate = require("./webhook/orderCreate");

const app = express();

// Parse Shopify JSON webhooks
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("✅ Shopify Webhook Server Running");
});

// Shopify Order Creation Webhook
app.post("/webhook/orders", async (req, res) => {
    try {
        console.log("📦 New Order Received!");

        await orderCreate(req.body);

        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Webhook Error:", error);
        res.sendStatus(500);
    }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});