# Venice Studio

A cross-platform desktop application for private, local use of Venice AI. Built with React, TypeScript, and designed for easy deployment as a web application or future Tauri desktop app.

## Features

Venice Studio provides a comprehensive interface to all Venice AI capabilities:

### Core Features
- **Chat Interface**: Stream-based chat with full Venice API support
- **Image Generation**: Text-to-image with advanced controls (CFG scale, steps, negative prompts)
- **Image Upscale**: Enhance and upscale images (Coming Soon)
- **Image Edit**: Edit and inpaint images (Coming Soon)
- **Text-to-Speech**: Generate audio from text (Coming Soon)
- **Embeddings**: Create text embeddings (Coming Soon)
- **Characters**: Chat with AI characters (Coming Soon)

### Venice-Specific Features
- **Venice Parameters**: Full support for `enable_web_search`, `enable_web_citations`, `enable_web_scraping`, `character_slug`, and more
- **Model Management**: Dynamic model discovery with traits and compatibility mapping
- **Structured Outputs**: JSON schema support with strict mode
- **Stats Panel**: Real-time monitoring of tokens, rate limits, balances, and request metadata
- **Deprecation Detection**: Automatic detection and warning of deprecated models/features
- **OpenAI Compatibility**: Use Venice API with OpenAI-compatible endpoints

### Privacy & Security
- **Local Storage**: API keys stored locally in browser localStorage
- **No Data Exfiltration**: All data stays on your device
- **HTTPS Only**: Secure communication with Venice API
- **No Server Required**: Runs entirely in the browser

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Venice AI API key (get one at [venice.ai](https://venice.ai/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FoxingWolf/venice-frontend.git
cd venice-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.sample .env
```

4. Add your Venice API key to `.env`:
```
VENICE_API_KEY=your_venice_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage Guide

### Getting Started

1. **Configure API Key**
   - On first launch, click "Settings" in the sidebar
   - Paste your Venice API key
   - The key is stored locally and only used to communicate with Venice AI

2. **Select a Mode**
   - Choose from Chat, Image, Upscale, Edit, TTS, Embeddings, or Characters
   - Each mode provides specialized features for different tasks

3. **Advanced Options**
   - Toggle "Advanced Options" in the sidebar to access additional settings
   - Configure model parameters, Venice-specific features, and more

### Chat Mode

- Type your message in the input field
- Press Enter or click "Send" to submit
- View streaming responses in real-time
- Monitor token usage and rate limits in the Stats panel

### Image Generation

1. Enter a detailed prompt describing your desired image
2. (Optional) Add negative prompts to exclude unwanted elements
3. Configure advanced settings:
   - Model selection (Qwen Image, Venice SD 3.5)
   - Image dimensions (width/height)
   - Steps (quality vs speed tradeoff)
   - CFG Scale (prompt adherence)
   - Seed (for reproducibility)
4. Click "Generate Image"
5. Download the generated image

### Venice Parameters

Enable Venice-specific features:
- **Web Search**: Auto-augment responses with web search results
- **Web Citations**: Include citations in responses
- **Web Scraping**: Full page content augmentation
- **Character Slug**: Chat as a specific character
- **System Prompts**: Use Venice's system prompts or provide your own

### Stats Panel

Monitor your usage in real-time:
- **Request ID**: CF-RAY for troubleshooting
- **Token Usage**: Prompt, completion, and total tokens
- **Context Limit**: Model's context window
- **Rate Limits**: Remaining requests and tokens
- **Balances**: USD and DIEM balance
- **Deprecation Warnings**: Alerts for deprecated models/features

## Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Native fetch with OpenAI types

### Project Structure
```
venice-frontend/
├── src/
│   ├── components/      # React components
│   │   ├── Chat.tsx
│   │   ├── ImageGenerate.tsx
│   │   ├── Settings.tsx
│   │   └── StatsPanel.tsx
│   ├── providers/       # API providers
│   │   └── VeniceProvider.ts
│   ├── stores/          # State management
│   │   └── appStore.ts
│   ├── types/           # TypeScript types
│   │   └── venice.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Venice API Integration

The app uses the Venice API with OpenAI compatibility:
- **Base URL**: `https://api.venice.ai/api/v1`
- **Authentication**: Bearer token (API key)
- **Endpoints**: Chat, Images, Audio, Embeddings, Characters, Models

All requests include Venice-specific parameters via the `venice_parameters` field and extract metadata from response headers for the Stats panel.

## API Key Security

⚠️ **Important**: Keep your API keys secure!

- API keys are stored in browser localStorage
- Never commit `.env` files to version control
- Never share your API keys publicly
- Keys are only sent to Venice AI over HTTPS
- No third-party services have access to your keys

## Development

### Code Style

Format code with Prettier:
```bash
npm run format
```

Lint code with ESLint:
```bash
npm run lint
```

### Testing

The project uses the Venice API directly. To test:
1. Configure a valid API key
2. Run the development server
3. Test each feature through the UI
4. Monitor the browser console for errors

## Deployment

### Web Deployment

Deploy to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build and deploy:
```bash
npm run build
# Upload the dist/ folder to your hosting service
```

### Desktop App (Future)

The architecture supports future Tauri integration for a native desktop app with:
- Native file system access
- OS-level API key storage (keychain)
- Auto-updates
- Offline mode

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Resources

- [Venice AI](https://venice.ai/) - Get your API key
- [Venice API Documentation](https://api.venice.ai/doc/api/) - Official API docs
- [Venice API Swagger](https://api.venice.ai/doc/api/swagger.yaml) - API specification

## Support

For issues and questions:
- Open an issue on GitHub
- Check Venice AI documentation
- Contact Venice AI support for API-related questions

---

Built with ❤️ for private, local AI workloads
