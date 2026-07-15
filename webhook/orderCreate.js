const { EmbedBuilder } = require("discord.js");

const client = require("../bot");

module.exports = async (order) => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        // Customer
        const customer = order.customer
            ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
            : "Guest";

        // Email
        const email = order.email || "N/A";

        // Phone
        const phone =
            order.shipping_address?.phone ||
            order.customer?.phone ||
            order.phone ||
            "N/A";

        // Total
        const total = order.total_price || "0";

        // Address
        const address = order.shipping_address
            ? `${order.shipping_address.address1 || ""}
${order.shipping_address.city || ""}
${order.shipping_address.province || ""}
${order.shipping_address.zip || ""}
${order.shipping_address.country || ""}`
            : "No Address";

        // Products
        const products = order.line_items?.length
            ? order.line_items
                  .map(item => `• ${item.title} × ${item.quantity}`)
                  .join("\n")
            : "No products";

        // Date & Time (India)
        const orderDate = new Date(order.created_at).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true
        });

        // Embed
        const embed = new EmbedBuilder()
            .setColor("#2ECC71")
            .setTitle("🛒 New Shopify Order")
            .setDescription(`**Order #${order.order_number}**`)
            .addFields(
                {
                    name: "👤 Customer",
                    value: customer,
                    inline: true
                },
                {
                    name: "📧 Email",
                    value: email,
                    inline: true
                },
                {
                    name: "📞 Phone",
                    value: phone,
                    inline: true
                },
                {
                    name: "📍 Address",
                    value: address,
                    inline: false
                },
                {
                    name: "📦 Products",
                    value: products,
                    inline: false
                },
                {
                    name: "💰 Total",
                    value: `₹${total}`,
                    inline: true
                },
                {
                    name: "🕒 Ordered On",
                    value: orderDate,
                    inline: true
                }
            )
            .setFooter({
                text: "Homique Orders"
            })
            .setTimestamp();

        await channel.send({
            embeds: [embed]
        });

        console.log("✅ Order sent to Discord");
    } catch (err) {
        console.error("❌ Error sending order:", err);
    }
};