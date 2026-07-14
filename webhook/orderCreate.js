const client = require("../bot");

module.exports = async (order) => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        const customer =
            order.customer
                ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
                : "Guest";

        const email = order.email || "N/A";
        const phone = order.phone || "N/A";
        const total = order.total_price || "0";

        // Shipping Address
        const address = order.shipping_address
            ? `${order.shipping_address.address1 || ""}
${order.shipping_address.city || ""}
${order.shipping_address.province || ""}
${order.shipping_address.zip || ""}
${order.shipping_address.country || ""}`
            : "No Address";

        // Products
        let products = "No products";

        if (order.line_items && order.line_items.length > 0) {
            products = order.line_items
                .map(item => `• ${item.title} × ${item.quantity}`)
                .join("\n");
        }

        // Order Date & Time
        const orderDate = new Date(order.created_at).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });

        await channel.send(`
🛒 **NEW SHOPIFY ORDER**

📦 **Order:** #${order.order_number}

👤 **Customer:** ${customer}

📧 **Email:** ${email}

📞 **Phone:** ${phone}

📍 **Address:**
${address}

📦 **Products**
${products}

💰 **Total:** ₹${total}

🕒 **Ordered On:** ${orderDate}
`);

        console.log("✅ Order sent to Discord");
    } catch (err) {
        console.error(err);
    }
};