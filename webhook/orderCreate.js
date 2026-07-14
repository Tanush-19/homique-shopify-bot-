const client = require("../bot");

module.exports = async (order) => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        await channel.send(
            `🛒 **New Order Received!**
            
**Order ID:** #${order.order_number}
**Customer:** ${order.customer?.first_name || ""} ${order.customer?.last_name || ""}
**Email:** ${order.email || "N/A"}
**Total:** ₹${order.total_price}
`
        );

        console.log("✅ Order sent to Discord");
    } catch (err) {
        console.error("❌ Error sending order:", err);
    }
};