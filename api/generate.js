export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      type,
      business,
      product,
      audience,
      tone
    } = req.body || {};

    if (!product) {
      return res.status(400).json({
        error: "Please enter product or service details."
      });
    }

    const brand = business || "Your Brand";
    const target = audience || "your target audience";
    const style = tone || "Professional";
    const contentType = type || "Marketing Content";

    let result = "";

    if (contentType === "Video Ad Script") {
      result = `🎬 VIDEO AD SCRIPT

Hook:
🔥 ${brand} brings you something your ${target} will love!

Scene 1:
Show the ${product} with a clean, attractive close-up.

Scene 2:
Highlight the main benefits and unique features of the product.

Scene 3:
Show the product being used by ${target}.

Voiceover:
"Looking for something better? Discover ${product} from ${brand}. Designed to make a difference. Try it today!"

Call to Action:
👉 Shop now and discover ${brand}.

Tone: ${style}`;
    }

    else if (contentType === "Instagram Caption") {
      result = `📱 INSTAGRAM CAPTION

✨ Meet ${product} from ${brand}.

Made for ${target} who want quality, style and something different.

🔥 Upgrade your experience today.

👉 DM us to know more.

#${brand.replace(/\s+/g, "")} #Trending #NewLaunch #MustHave`;
    }

    else if (contentType === "Product Description") {
      result = `🛍️ PRODUCT DESCRIPTION

${product}

${brand} presents a product designed for ${target}.

✨ Key Benefits:
• Professional and attractive design
• Made with quality in mind
• Easy to use
• Great choice for everyday needs

Experience the difference with ${brand}.`;
    }

    else if (contentType === "Ad Copy") {
      result = `📢 AD COPY

STOP SCROLLING! 🔥

Discover ${product} by ${brand}.

Designed for ${target}, with a ${style.toLowerCase()} style that gets attention.

✨ Discover it today.

👉 Take the next step now!`;
    }

    else if (contentType === "WhatsApp Promotion") {
      result = `💬 WHATSAPP PROMOTION

🔥 NEW FROM ${brand}!

Introducing ${product}.

Perfect for ${target}.

✨ Quality
✨ Great design
✨ Made to impress

Interested? Message us now for more details! 📲`;
    }

    else {
      result = `💡 CONTENT IDEAS FOR ${brand}

1. 🎥 Create a short video showcasing ${product}.
2. 📸 Post a product close-up with a strong hook.
3. 🎯 Create a "Why choose us?" post.
4. 🔥 Share the top 3 benefits of ${product}.
5. 💬 Create a customer-question/reply video.
6. 🚀 Make a limited-time promotional post.
7. 📱 Create a behind-the-scenes video.

Target audience: ${target}
Tone: ${style}`;
    }

    return res.status(200).json({
      result
    });

  } catch (error) {
    return res.status(500).json({
      error: "Generation failed."
    });
  }
}
