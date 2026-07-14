const {
    EmbedBuilder
} = require("discord.js");

const client = require("../bot");

module.exports = async (order) => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        const customer = order.customer
            ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
            : "Guest";

        const email = order.email || "N/A";
        const phone = order.phone || "N/A";
        const total = order.total_price || "0";

        const address = order.shipping_address
            ? `${order.shipping_address.address1 || ""}
${order.shipping_address.city || ""}
${order.shipping_address.province || ""}
${order.shipping_address.zip || ""}
${order.shipping_address.country || ""}`
            : "No Address";

        const products = order.line_items?.length
            ? order.line_items
                  .map(item => `• ${item.title} × ${item.quantity}`)
                  .join("\n")
            : "No products";

        const orderDate = new Date(order.created_at).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });

        const embed = new EmbedBuilder()
            .setColor("#2ecc71")
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
            .setTimestamp()
            .setFooter({
                text: "Homique Orders"
            });

        await channel.send({
            embeds: [embed]
        });

        console.log("✅ Order sent to Discord");
    } catch (err) {
        console.error(err);
    }
};