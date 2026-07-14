const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Shopify Webhook Server Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});