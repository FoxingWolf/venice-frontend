# Venice Studio - Complete Feature List

This document lists all features implemented in Venice Studio.

## Core Features

### 🔥 Model Selection
Every feature now includes intelligent model selection:

- **Chat**: Automatically filters and displays chat-compatible models with context length info
- **Image Generation**: Shows available image generation models with descriptions
- **Text-to-Speech**: Lists TTS/audio models
- **Embeddings**: Displays embedding models

Models are dynamically loaded from the Venice API and filtered by their capabilities.

### 💬 Chat

#### Basic Features
- Real-time streaming responses
- Message history
- System message support
- Character integration (select from Characters tab)
- Clear conversation button

#### Advanced Parameters (Show/Hide with "Advanced Options")
- **Temperature** (0-2): Controls creativity/randomness
  - 0 = Deterministic, 2 = Very creative
- **Max Tokens**: Limit response length
  - Leave blank for automatic
- **Top P** (0-1): Nucleus sampling
  - Controls diversity of word selection
- **Frequency Penalty** (-2 to 2): Penalizes repeated tokens based on frequency
- **Presence Penalty** (-2 to 2): Penalizes repeated tokens based on presence

### 🖼️ Image Generation

#### Basic Features
- Text-to-image generation
- Model selection
- Prompt and negative prompt inputs
- Image preview and download

#### Advanced Parameters
- **Width & Height**: 256-2048px (64px increments)
- **Steps**: 1-100 (controls detail/quality)
- **CFG Scale**: 1-20 (prompt adherence)
- **Seed**: Optional for reproducible results
- **Style Preset**: Choose from available Venice styles

### 🔊 Text-to-Speech

- Model selection
- Voice selection (10+ voices)
- Speed control (0.5-2.0x)
- Multiple audio formats (MP3, Opus, AAC, FLAC, WAV, PCM)
- Audio preview and download

### 🔢 Embeddings

- Model selection
- Text to vector conversion
- Encoding format (Float/Base64)
- JSON export
- Dimension and vector count display

### 🎭 Characters

- Browse available characters
- View character details and avatars
- Select character for chat integration
- Automatic character parameter injection

## Venice-Specific Features

These parameters are available in the sidebar when "Advanced Options" is enabled:

### Web Integration
- **Web Search** (Auto/Always/Never): Allow AI to search the web
- **Web Citations**: Include source citations
- **Web Scraping**: Enable deeper web content analysis

### AI Behavior
- **Venice System Prompt**: Include Venice's default system instructions
- **Disable Thinking**: Turn off chain-of-thought for thinking-capable models
- **Strip Thinking Response**: Remove thinking tags from output

## UI Features

### Sidebar Navigation
- Quick access to all features
- Visual indicators for active mode
- Compact Venice Parameters panel

### Stats Panel
Real-time display of:
- Request ID (CF-RAY)
- Current model
- Token usage (prompt/completion/total)
- Rate limits (requests and tokens remaining)
- Account balances (USD and DIEM)
- Deprecation warnings

### Settings
- Secure API key storage
- Key verification on save
- Easy access from sidebar

## Developer Features

### Store Architecture
- Zustand-based state management
- Separate stores for models, parameters, and UI state
- Model filtering by traits (chat, image, audio, embedding)

### API Integration
- Complete Venice API wrapper (VeniceProvider)
- Streaming support for chat
- Automatic header extraction (stats, rate limits)
- Error handling and reporting

### Type Safety
- Full TypeScript implementation
- Comprehensive type definitions
- Type-safe API calls and state management

## Keyboard Shortcuts

- **Enter**: Send chat message (Shift+Enter for new line)

## Upcoming Features

Based on the Venice API, these features could be added:

- ⬆️ **Image Upscale**: Enhance image resolution
- ✏️ **Image Edit**: Modify existing images with prompts
- **Response Format**: JSON schema validation for structured outputs
- **Function Calling**: Tool/function support in chat
- **Vision**: Image input support in chat (for vision-capable models)

## Getting Started

1. Click **Settings** in the sidebar
2. Enter your Venice API key from [venice.ai](https://venice.ai)
3. Click **Save** to verify and store your key
4. Select a feature from the sidebar
5. Choose your preferred model
6. Start creating!

## Tips

- **Model Context**: Check the context length (shown in parentheses) when selecting chat models
- **Temperature**: Start with 0.7 for balanced responses
- **Web Search**: Set to "Auto" to let the AI decide when to search
- **Image Generation**: Use negative prompts to avoid unwanted elements
- **Characters**: Select a character before chatting for personality-driven conversations
- **Advanced Options**: Toggle to show/hide advanced parameters and keep the UI clean

## Support

For issues or feature requests, visit the [GitHub repository](https://github.com/FoxingWolf/venice-frontend).
