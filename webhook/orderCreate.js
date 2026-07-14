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

        let products = "";

        if (order.line_items && order.line_items.length > 0) {
            products = order.line_items
                .map(item => `• ${item.title} × ${item.quantity}`)
                .join("\n");
        } else {
            products = "No products";
        }

        await channel.send(`
🛒 **NEW SHOPIFY ORDER**

📦 **Order:** #${order.order_number}

👤 **Customer:** ${customer}

📧 **Email:** ${email}

📞 **Phone:** ${phone}

📦 **Products**
${products}

💰 **Total:** ₹${total}
`);

        console.log("✅ Order sent to Discord");
    } catch (err) {
        console.error(err);
    }
};