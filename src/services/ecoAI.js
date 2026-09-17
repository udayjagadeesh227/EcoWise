// Client service for EcoAI communication and vision analysis
export async function sendChatMessage(message, conversationHistory = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, conversationHistory }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      reply: data.reply,
      isDemoMode: data.isDemoMode,
      notice: data.modeNotice
    };
  } catch (error) {
    console.warn('Backend /api/chat unreachable, using resilient client-side demo fallback:', error);
    // Graceful client fallback
    return {
      success: true,
      reply: getClientFallbackResponse(message),
      isDemoMode: true,
      notice: 'Demo Mode: Running offline mode. Start backend server or configure GEMINI_API_KEY for live AI.'
    };
  }
}

// Client method to send base64 waste image to secure server vision endpoint
export async function identifyWasteImage(base64Image, mimeType = 'image/jpeg') {
  try {
    const response = await fetch('/api/identify-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image, mimeType }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Backend /api/identify-image unreachable:', error);
    return {
      success: false,
      error: 'Image recognition service is currently unavailable. Try a clearer image or use the search option.'
    };
  }
}

function getClientFallbackResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('battery') || q.includes('alkaline') || q.includes('lithium')) {
    return "🔋 **Batteries are Hazardous Waste!**\n\nDepleted batteries should never be tossed into domestic trash cans. Heavy metals like lead, mercury, and nickel risk combusting in garbage trucks or leaching into groundwater.\n\n• **Tip:** Place clear Scotch tape over the terminals and drop them at specialized retail or community battery collection boxes.";
  }
  if (q.includes('plastic') || q.includes('bottle')) {
    return "🧴 **Plastic Recycling Guide:**\n\n• **Recyclable:** Rigid clean containers (PET #1 water bottles, HDPE #2 milk jugs).\n• **Rules:** Empty liquids, quick rinse, flatten, and leave caps screwed on.\n• **Avoid:** Greasy food wrappers and thin single-use plastic films cannot go into standard recycling bins.";
  }
  if (q.includes('phone') || q.includes('electronics') || q.includes('e-waste')) {
    return "📱 **Electronic Waste (E-Waste):**\n\nElectronics contain valuable recyclable gold and copper alongside toxic mercury and cadmium.\n\n• **Action:** Backup and wipe your personal data, then take the device to an authorized electronics recycler or brand trade-in program.";
  }
  if (q.includes('clothes') || q.includes('cloth') || q.includes('fabric')) {
    return "👕 **Textiles & Clothing:**\n\nWearable clothes should always be donated or swapped. Damaged or torn textiles can be upcycled into cleaning cloths or sent to specialized textile recycling centers to make industrial insulation.";
  }
  return `🌱 **EcoAI Assistant (Demo Mode):**\n\nRegarding "${query}":\n\nRemember the hierarchy of waste:\n1. **Refuse & Reduce:** Buy only what you need.\n2. **Reuse & Repair:** Extend the lifespan of your goods.\n3. **Recycle & Segregate:** Separate into Green (Organic/Wet), Blue (Dry Recyclables), and Special drop-offs (E-waste / Hazardous).\n\n*Note: Operating in local Demo Mode.*`;
}
