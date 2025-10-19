# Venice Studio

> Private AI Assistant - Local Venice AI Client

Venice Studio is a cross-platform desktop application built with Tauri, React, and TypeScript for private, local use of Venice AI. It provides a clean, modern interface for accessing various AI capabilities including chat, image generation, embeddings, text-to-speech, character management, and model browsing.

![CI](https://github.com/FoxingWolf/venice-frontend/workflows/CI/badge.svg)

## Features

- **💬 Chat**: Interactive chat interface with streaming support, configurable models, temperature, and token limits
- **🖼️ Images**: Generate, edit, and upscale images using AI models
- **🔢 Embeddings**: Generate vector embeddings for text inputs
- **🔊 TTS**: Convert text to natural-sounding speech with multiple voice options
- **👥 Characters**: Create and manage AI characters with custom traits and system prompts
- **🤖 Models**: Browse and explore available AI models with filtering and deprecation tracking
- **📊 Stats**: Real-time tracking of token usage, rate limits, and API balances

## Technical Features

- ✅ **Venice Parameters**: Full support for `venice_parameters` in API requests
- ✅ **Streaming**: Server-sent events (SSE) streaming for real-time chat responses
- ✅ **Structured Outputs**: JSON schema support for structured responses
- ✅ **Traits & Compatibility**: Character traits and model compatibility mapping
- ✅ **Deprecation Headers**: Automatic handling and warning of deprecated endpoints
- ✅ **Rate Limiting**: Track and display rate limit information
- ✅ **Token Stats**: Monitor token usage across all operations
- ✅ **Cross-Platform**: Runs on Windows, macOS, and Linux

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Rust](https://www.rust-lang.org/) (latest stable)
- Platform-specific dependencies:
  - **Linux**: `webkit2gtk-4.1`, `libappindicator3`, `librsvg2`, `patchelf`
  - **macOS**: Xcode Command Line Tools
  - **Windows**: WebView2 (usually pre-installed on Windows 10/11)

### Linux Dependencies

```bash
sudo apt-get update
sudo apt-get install -y libwebkit2gtk-4.1-dev \
  libappindicator3-dev \
  librsvg2-dev \
  patchelf
```

### Build from Source

```bash
# Clone the repository
git clone https://github.com/FoxingWolf/venice-frontend.git
cd venice-frontend

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Configuration

### API Key

Venice Studio requires a Venice AI API key. You can obtain one from [venice.ai](https://venice.ai).

The API key can be set in the application through the Settings panel (accessible from the stats footer). It will be stored securely in your browser's localStorage.

Alternatively, you can set the `VENICE_API_KEY` environment variable:

```bash
export VENICE_API_KEY="your-api-key-here"
```

### Base URL

The application uses the Venice AI API at: `https://api.venice.ai/api/v1`

## Usage

### Chat Module

1. Select your preferred model (Llama 3.3 70B, Mistral Large, etc.)
2. Adjust temperature and max tokens as needed
3. Enable/disable streaming for real-time responses
4. Type your message and press Send
5. View conversation history with clear role indicators

### Images Module

**Generate**: Create images from text prompts with configurable models, sizes, and quality settings

**Edit**: Modify existing images with AI using prompts and optional masks

**Upscale**: Enhance image resolution with 2x-4x scaling

### Embeddings Module

Generate vector embeddings for text inputs (one per line). View embedding statistics including dimensions and token usage. Copy embeddings to clipboard for use in other applications.

### TTS Module

Convert text to speech with:
- Multiple voice options (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- Speed control (0.25x - 4x)
- High-quality audio output
- Download audio files

### Characters Module

Create custom AI characters with:
- Name and description
- Comma-separated traits
- Custom system prompts
- Edit and delete existing characters

### Models Module

Browse all available AI models with:
- Search/filter functionality
- Capability tags
- Deprecation status
- Owner and creation date information

## Development

### Scripts

```bash
# Development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run build

# Tauri development
npm run tauri dev

# Build production app
npm run tauri build
```

### Project Structure

```
venice-frontend/
├── src/
│   ├── api/           # API client implementation
│   ├── components/    # React components for each module
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── __tests__/     # Test files
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # React entry point
│   └── styles.css     # Global styles
├── src-tauri/         # Tauri backend (Rust)
├── .github/           # CI/CD workflows
└── package.json       # Dependencies and scripts
```

### Testing

The project uses Vitest for testing with jsdom for DOM simulation:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with coverage
npm test -- --coverage
```

### CI/CD

GitHub Actions workflows automatically:
- Run tests on push and pull requests
- Build the application for all platforms (Linux, Windows, macOS)
- Upload build artifacts

## API Documentation

Venice Studio uses the Venice AI API v1. All requests include:
- Authorization header with Bearer token
- Support for `venice_parameters` in request bodies
- Proper handling of streaming responses
- Rate limit and deprecation header processing

### Example API Request

```typescript
const response = await client.createChatCompletion({
  model: "llama-3.3-70b",
  messages: [
    { role: "user", content: "Hello!" }
  ],
  venice_parameters: {
    temperature: 0.7,
    max_tokens: 2048,
  },
  stream: true,
});
```

## Security

- API keys are stored locally in browser localStorage
- All API communication uses HTTPS
- No data is sent to third parties
- Application runs entirely on your local machine

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Tauri](https://tauri.app/)
- UI powered by [React](https://react.dev/)
- Bundled with [Vite](https://vite.dev/)
- Venice AI API by [Venice.ai](https://venice.ai)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/FoxingWolf/venice-frontend).

