require("dotenv").config();

const express = require("express");
const orderCreate = require("./webhook/orderCreate");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("✅ Shopify Webhook Server Running");
});

app.post("/webhook/orders", async (req, res) => {
    console.log("📦 Shopify webhook received");

    try {
        await orderCreate(req.body);
        console.log("✅ orderCreate() completed");
    } catch (err) {
        console.error("❌ Webhook Error:", err);
    }

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});