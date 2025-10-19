# Quick Start Guide - Venice Studio

Get up and running with Venice Studio in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A Venice AI API key ([get one here](https://venice.ai/))

## Installation

```bash
# Clone the repository
git clone https://github.com/FoxingWolf/venice-frontend.git
cd venice-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser to `http://localhost:5173`

## First Run Setup

1. **Enter Your API Key**
   - The Settings dialog opens automatically on first launch
   - Paste your Venice AI API key
   - Click "Save"

2. **Start Using Venice Studio**
   - Select a mode from the sidebar (Chat, Image, TTS, etc.)
   - Start creating!

## Quick Examples

### Chat with AI
1. Click "💬 Chat"
2. Type: "Explain quantum computing in simple terms"
3. Press Enter
4. Watch the response stream in real-time

### Generate an Image
1. Click "🖼️ Image"
2. Enter: "cyberpunk city at night, neon lights, rain"
3. Click "Generate Image"
4. Download your creation

### Text-to-Speech
1. Click "🔊 TTS"
2. Enter some text
3. Select a voice
4. Click "Generate Speech"
5. Play or download the audio

### Create Embeddings
1. Click "🔢 Embeddings"
2. Enter text to embed
3. Click "Generate Embeddings"
4. Download the JSON output

## Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

The build output is in the `dist/` folder, ready to deploy to any static hosting service.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts, and your Venice Studio will be live!

## Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Point to the `dist` folder when prompted.

## Troubleshooting

### "API key not verified"
- Check that your API key is correct
- Visit [venice.ai](https://venice.ai/) to verify your key

### "Failed to fetch models"
- Check your internet connection
- Verify Venice API is accessible

### Build errors
- Ensure Node.js version is 18 or higher
- Delete `node_modules` and run `npm install` again

## Next Steps

- Read the [User Guide](USER_GUIDE.md) for detailed feature documentation
- Check out [Architecture](ARCHITECTURE.md) to understand the codebase
- Explore Venice-specific parameters in Advanced Options

## Support

- **Issues**: Open on [GitHub](https://github.com/FoxingWolf/venice-frontend/issues)
- **Venice API**: Contact [Venice AI Support](https://venice.ai/)
- **Documentation**: [README.md](README.md)

---

Happy creating! 🚀
