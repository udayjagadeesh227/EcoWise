import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { appendFile } from 'fs';

// Load environment variables from the .env file located at the project root
// Using process.cwd() works both in local dev and Netlify Functions.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Increased limit for base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Predefined sustainability knowledge for local Demo Mode
const DEMO_RESPONSES = [
  {
    keywords: ['battery', 'batteries', 'cell', 'alkaline', 'lithium'],
    response: "🔋 **Battery Disposal Advice:**\n\nUsed batteries (alkaline, lithium-ion, lead-acid) are classified as **Hazardous Waste**. Never toss them into regular trash as heavy metals (lithium, cadmium, nickel) can leak into soil and spark fires in collection trucks.\n\n• **Action:** Tape the terminals with clear tape to prevent short circuits.\n• **Disposal:** Drop them off at an authorized retail drop-off box or municipal hazardous waste depot."
  },
  {
    keywords: ['plastic', 'bottle', 'recycle plastic', 'pet'],
    response: "🧴 **Plastic Bottle Recycling:**\n\nMost plastic drink bottles are made of PET (Code 1) or HDPE (Code 2), which are highly recyclable!\n\n• **Step 1:** Empty any remaining liquid and rinse out residue.\n• **Step 2:** Crush the bottle to save collection volume.\n• **Step 3:** Screw the cap back on (modern recyclers prefer caps attached so they don't slip through screens).\n• **Step 4:** Place in your Blue recycling or dry waste bin."
  },
  {
    keywords: ['reduce plastic', 'plastic free', 'less plastic'],
    response: "🌿 **5 Practical Ways to Reduce Plastic:**\n\n1. **Carry a Refillable Bottle:** Eliminates 150+ disposable bottles each year.\n2. **Tote Bags on Standby:** Keep a cloth bag folded in your backpack for grocery stops.\n3. **Decline Cutlery:** Uncheck single-use plastic spoons and napkins on food delivery apps.\n4. **Bar Soap & Shampoos:** Swap liquid bottled soaps for package-free soap bars.\n5. **Bulk Shopping:** Buy grains, nuts, and lentils in reusable jars or fabric bags."
  },
  {
    keywords: ['phone', 'mobile', 'smartphone', 'electronics', 'e-waste', 'laptop', 'charger'],
    response: "📱 **E-Waste & Electronics Disposal:**\n\nElectronic devices contain both toxic substances (lead, mercury, flame retardants) and valuable precious metals (copper, silver, gold).\n\n• **If working:** Back up and factory reset your phone, then donate it to students or trade it in for store credit.\n• **If broken:** Never landfill it. Take it to an authorized e-waste collection center or brand trade-in kiosk (e.g. Apple, Samsung, Best Buy)."
  },
  {
    keywords: ['compost', 'banana', 'food waste', 'organic', 'wet waste'],
    response: "🌱 **Composting & Wet Waste:**\n\nKitchen scraps like fruit peels, vegetable ends, coffee grounds, and tea leaves belong to **Wet Waste**.\n\n• In home composting, mix green nitrogen-rich scraps with brown carbon-rich materials (dry leaves, shredded cardboard) in a 1:2 ratio.\n• Keep it aerated and slightly moist; you'll have black organic gold for your garden in 4 to 8 weeks!"
  },
  {
    keywords: ['sdg', 'goals', 'united nations'],
    response: "🌍 **EcoWise & the UN SDGs:**\n\nEcoWise directly aligns with:\n• **SDG 11 (Sustainable Cities & Communities):** Reducing per capita municipal waste footprint.\n• **SDG 12 (Responsible Consumption & Production):** Fostering circular economy through proper segregation and reuse.\n• **SDG 13 (Climate Action):** Cutting methane emissions from organic waste in landfills."
  }
];

const getFallbackDemoResponse = (query) => {
  const lower = query.toLowerCase();
  for (const item of DEMO_RESPONSES) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.response;
    }
  }
  return `🌱 **EcoAI Sustainability Assistant (Demo Mode):**\n\nRegarding your query about "${query}":\n\nProper waste segregation is foundational to circular sustainability. Always follow the 3R rule:\n1. **Reduce** unnecessary consumption.\n2. **Reuse & Upcycle** durable items.\n3. **Recycle or Compost** clean segregated materials in appropriate bins (Green for Wet/Organic, Blue for Recyclable Dry Waste, Designated centers for E-waste & Hazardous goods).\n\n*Note: Running in offline Demo Mode. To connect live Gemini API, configure GEMINI_API_KEY in your .env file.*`;
};

// API endpoint for chatbot
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A valid message string is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Check if API key is provided
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    // Return friendly Demo Mode response
    return res.json({
      reply: getFallbackDemoResponse(message),
      isDemoMode: true,
      modeNotice: 'Demo Mode: Predefined sustainability intelligence (GEMINI_API_KEY not configured in backend .env).'
    });
  }

  // Call official Gemini REST API securely
  try {
    const prompt = `You are EcoAI, a polite, highly knowledgeable, and motivating sustainability and waste management assistant for the EcoWise web platform. 
Keep answers concise, structured with bullet points or emojis, and focused on practical eco-friendly disposal, recycling, reuse, zero waste lifestyle, and UN SDGs (11, 12, 13).
User question: ${message}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API call returned non-200 status:', response.status, errText);
      return res.json({
        reply: getFallbackDemoResponse(message),
        isDemoMode: true,
        modeNotice: `Demo Mode: Gemini API responded with status ${response.status}. Using verified local eco knowledge base.`
      });
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidate) {
      return res.json({
        reply: candidate,
        isDemoMode: false
      });
    } else {
      return res.json({
        reply: getFallbackDemoResponse(message),
        isDemoMode: true,
        modeNotice: 'Demo Mode: Empty response received from AI provider.'
      });
    }
  } catch (error) {
    console.error('Error contacting Gemini service:', error);
    return res.json({
      reply: getFallbackDemoResponse(message),
      isDemoMode: true,
      modeNotice: 'Demo Mode: Network error contacting AI endpoint. Showing local sustainability answer.'
    });
  }
});

// ===================== ACTIVE IMAGE RECOGNITION ENDPOINT =====================
app.post('/api/identify-image', async (req, res) => {
  const { image, mimeType = 'image/jpeg' } = req.body;

  if (!image || typeof image !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'No image data was provided. Please select or capture an image to identify.'
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Genuine check: If API key is missing or placeholder, indicate clearly without faking
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return res.json({
      success: false,
      isKeyMissing: true,
      error: 'AI Image Recognition requires GEMINI_API_KEY configured in backend .env. Please configure the key or use the search option.'
    });
  }

  // Clean base64 string
  let cleanBase64 = image;
  if (image.includes(',')) {
    cleanBase64 = image.split(',')[1];
  }

  try {
    const prompt = `You are a specialized computer vision sustainability classifier for EcoWise.
Analyze the provided image and identify the primary waste, recyclable, or household material.
You must return ONLY a raw JSON object (strictly no markdown code blocks, no backticks, no explanatory text outside JSON).

Required JSON structure:
{
  "item": "Specific item name (e.g. Plastic Bottle, Banana Peel, Cardboard Box, Alkaline Battery, Old Mobile Phone, Clothes)",
  "category": "One of: Wet Waste, Dry Waste, Recyclable, E-Waste, Donate / Reuse, Hazardous Disposal",
  "categoryKey": "One of: WET, DRY, RECYCLABLE, E_WASTE, DONATE_REUSE, HAZARDOUS",
  "recommendedAction": "Concrete, practical disposal or recycling instruction",
  "explanation": "Short rationale explaining why this disposal method is required",
  "ecoTip": "Short practical eco tip for reduction, reuse, or proper disposal",
  "confidence": "high" or "uncertain"
}

If the image is blurry, contains no identifiable waste, or you cannot identify it with reasonable confidence, return:
{
  "item": null,
  "confidence": "uncertain",
  "message": "Unable to confidently identify this item. Try a clearer image or use the search option."
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 600,
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.warn('Gemini Vision API error status:', response.status, errBody);
      return res.json({
        success: false,
        error: 'Unable to confidently identify this item. Try a clearer image or use the search option.',
        geminiStatus: response.status,
        geminiError: errBody
      });
    }

    // Clone response to read raw text for debugging while still being able to parse JSON
    const responseClone = response.clone();
    const rawResponse = await responseClone.text();
    console.log('⚡ Gemini raw response (text):', rawResponse);
    // Write raw response to a debug log file in /tmp (Netlify writable dir)
const logPath = path.join(process.env.TEMP || '/tmp', 'gemini_image_debug.log');
appendFile(logPath, `\n---\n${new Date().toISOString()}\nStatus: ${response.status}\nResponse: ${rawResponse}\n`, (err) => {
  if (err) console.warn('Failed to write Gemini debug log:', err);
});

// Optional debug query param to return raw Gemini response
if (req.query.debug === 'true') {
  return res.json({
    debug: true,
    rawResponse,
    status: response.status
  });
}

// Parse Gemini response from rawResponse
let rawText = null;
try {
  const parsedResponse = JSON.parse(rawResponse);
  rawText = parsedResponse.candidates?.[0]?.content?.parts?.[0]?.text;
} catch (parseErr) {
  console.warn('Failed to parse Gemini raw response as JSON:', parseErr);
}
if (!rawText) {
  return res.json({
    success: false,
    error: 'Unable to confidently identify this item. Try a clearer image or use the search option.'
  });
}


    // Attempt to extract JSON from rawText regardless of surrounding text or markdown
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('No JSON found in Gemini response:', rawText);
      return res.json({
        success: false,
        error: 'Unable to confidently identify this item. Try a clearer image or use the search option.'
      });
    }
    const cleanedText = jsonMatch[0];
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.warn('Failed to parse extracted JSON:', cleanedText, parseErr);
      return res.json({
        success: false,
        error: 'Unable to confidently identify this item. Try a clearer image or use the search option.'
      });
    }
    // If JSON parsing failed, attempt simple keyword extraction as fallback
    if (!parsed && rawText) {
      const lower = rawText.toLowerCase();
      const keywordMap = [
        { kw: ['plastic bottle', 'bottle'], item: 'Plastic Bottle', category: 'Recyclable', categoryKey: 'RECYCLABLE' },
        { kw: ['banana peel', 'banana'], item: 'Banana Peel', category: 'Wet Waste', categoryKey: 'WET' },
        { kw: ['battery'], item: 'Alkaline Battery', category: 'Hazardous', categoryKey: 'HAZARDOUS' },
        { kw: ['cardboard'], item: 'Cardboard Box', category: 'Dry Waste', categoryKey: 'DRY' }
      ];
      for (const entry of keywordMap) {
        if (entry.kw.some(k => lower.includes(k))) {
          parsed = {
            item: entry.item,
            category: entry.category,
            categoryKey: entry.categoryKey,
            confidence: 'high',
            recommendedAction: `Dispose the ${entry.item.toLowerCase()} in the appropriate ${entry.category.toLowerCase()} bin.`,
            explanation: `Identified as ${entry.item.toLowerCase()} based on visual cues.`,
            ecoTip: 'Reduce waste by reusing or recycling where possible.'
          };
          break;
        }
      }
    }
    // Final confidence check after possible fallback
    if (!parsed || !parsed.item) {
      return res.json({
        success: false,
        error: parsed?.message || 'Unable to confidently identify this item. Try a clearer image or use the search option.'
      });
    }

    // Normalization of categoryKey
    let catKey = parsed.categoryKey;
    const catName = parsed.category || 'Dry Waste';
    if (!catKey) {
      const upper = catName.toUpperCase();
      if (upper.includes('WET')) catKey = 'WET';
      else if (upper.includes('RECYCL')) catKey = 'RECYCLABLE';
      else if (upper.includes('E_WASTE') || upper.includes('E-WASTE') || upper.includes('ELECTRONIC')) catKey = 'E_WASTE';
      else if (upper.includes('DONATE') || upper.includes('REUSE')) catKey = 'DONATE_REUSE';
      else if (upper.includes('HAZARD')) catKey = 'HAZARDOUS';
      else catKey = 'DRY';
    }

    return res.json({
      success: true,
      item: parsed.item,
      category: parsed.category || 'Recyclable',
      categoryKey: catKey,
      recommendedAction: parsed.recommendedAction || 'Dispose in appropriate collection stream.',
      explanation: parsed.explanation || 'Segregating this item preserves materials and avoids landfill contamination.',
      ecoTip: parsed.ecoTip || 'Practice the 3R hierarchy: Reduce, Reuse, and Recycle.'
    });
  } catch (err) {
    console.error('Exception during image identification:', err);
    return res.json({
      success: false,
      error: 'Unable to confidently identify this item. Try a clearer image or use the search option.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EcoWise Backend',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// Start server only in development environment
if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => console.log(`🌿 EcoWise Server listening on port ${PORT}`));
}

export default app;
