# Architecture Documentation - Venice Studio

This document describes the technical architecture, design decisions, and implementation details of Venice Studio.

## Overview

Venice Studio is a web-based application that provides a private, local interface to the Venice AI API. It's built with modern web technologies and designed for easy deployment and future desktop packaging with Tauri.

## Technology Stack

### Frontend
- **React 18**: UI framework with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management

### Build & Development
- **npm**: Package management
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

### Future Additions
- **Tauri**: Desktop app packaging (planned)
- **Vitest**: Unit testing (planned)

## Project Structure

```
venice-frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Chat.tsx
│   │   ├── ImageGenerate.tsx
│   │   ├── TTS.tsx
│   │   ├── Embeddings.tsx
│   │   ├── Characters.tsx
│   │   ├── Settings.tsx
│   │   ├── StatsPanel.tsx
│   │   └── VeniceParametersPanel.tsx
│   ├── providers/           # API providers
│   │   └── VeniceProvider.ts
│   ├── stores/              # State management
│   │   └── appStore.ts
│   ├── types/               # TypeScript types
│   │   └── venice.ts
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── dist/                    # Build output
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Core Modules

### 1. VeniceProvider (`src/providers/VeniceProvider.ts`)

The VeniceProvider is the main interface to the Venice AI API.

**Responsibilities:**
- HTTP communication with Venice API
- Request/response handling
- Header parsing and extraction
- Error handling
- Streaming support

**Key Methods:**
```typescript
chat()              // Non-streaming chat
chatStream()        // Streaming chat with SSE
getModels()         // Fetch available models
generateImage()     // Text-to-image generation
upscaleImage()      // Image upscaling
editImage()         // Image editing/inpainting
generateSpeech()    // Text-to-speech
createEmbeddings()  // Text embeddings
getCharacters()     // Fetch characters
getRateLimits()     // Get rate limits
getBillingUsage()   // Get billing info
```

**Design Decisions:**
- Uses native `fetch` instead of OpenAI SDK for full control
- Extracts Venice-specific headers on every response
- Supports both streaming and non-streaming modes
- Type-safe with TypeScript interfaces

### 2. App Store (`src/stores/appStore.ts`)

Centralized state management using Zustand.

**State Structure:**
```typescript
{
  apiKey: string                    // User's API key
  provider: VeniceProvider | null   // API provider instance
  models: ModelSpec[]               // Available models
  selectedModel: string             // Current model ID
  veniceParameters: VeniceParameters // Venice-specific settings
  stats: RequestStats[]             // Request history
  characters: Character[]           // Available characters
  selectedCharacter: string | null  // Active character
  activeMode: Mode                  // Current UI mode
  showAdvanced: boolean             // Advanced options toggle
  deprecationWarnings: Warning[]    // Deprecation alerts
}
```

**Actions:**
- `initializeProvider()`: Create VeniceProvider instance
- `setVeniceParameters()`: Update Venice settings
- `addStats()`: Record request metadata
- `setSelectedCharacter()`: Activate character
- `addDeprecationWarning()`: Track deprecations

**Why Zustand:**
- Minimal boilerplate
- No context providers needed
- Easy to use with hooks
- Small bundle size
- TypeScript-friendly

### 3. Components

#### Chat (`src/components/Chat.tsx`)

Real-time chat interface with streaming support.

**Features:**
- Message history display
- Streaming response rendering
- Character support via venice_parameters
- Token usage tracking
- Error handling

**Flow:**
1. User types message
2. Message added to state
3. Stream initiated with VeniceProvider
4. Chunks rendered as they arrive
5. Stats updated on completion

#### ImageGenerate (`src/components/ImageGenerate.tsx`)

Text-to-image generation interface.

**Features:**
- Prompt input with negative prompts
- Advanced controls (steps, CFG, dimensions)
- Model selection
- Image preview and download
- Base64 or URL handling

**Parameters:**
- `model`: qwen-image or venice-sd35
- `prompt`: Detailed description
- `negative_prompt`: Things to avoid
- `width/height`: 256-2048px
- `steps`: 1-100
- `cfg_scale`: 1-20
- `seed`: For reproducibility

#### TTS (`src/components/TTS.tsx`)

Text-to-speech generation.

**Features:**
- Multiple voice options
- Speed control (0.5-2.0x)
- Format selection (MP3, Opus, etc.)
- Audio preview
- Download capability

#### Embeddings (`src/components/Embeddings.tsx`)

Text embedding generation for ML/AI applications.

**Features:**
- Single or batch text input
- Encoding format selection
- Dimension display
- JSON export
- Vector visualization (planned)

#### Characters (`src/components/Characters.tsx`)

Browse and select AI characters.

**Features:**
- Character gallery with avatars
- Character details view
- Selection state management
- Integration with Chat mode

#### Settings (`src/components/Settings.tsx`)

API key configuration and testing.

**Features:**
- Secure API key input
- Local storage persistence
- Key verification
- User feedback

#### StatsPanel (`src/components/StatsPanel.tsx`)

Real-time usage monitoring.

**Displays:**
- Request ID (CF-RAY)
- Model used
- Token usage breakdown
- Rate limits
- Account balances
- Deprecation warnings

#### VeniceParametersPanel (`src/components/VeniceParametersPanel.tsx`)

Venice-specific feature toggles.

**Controls:**
- Web search mode
- Web citations
- Web scraping
- System prompts
- Thinking control

## API Integration

### Base URL
```
https://api.venice.ai/api/v1
```

### Authentication
```typescript
headers: {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
}
```

### Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/chat/completions` | POST | Chat with AI models |
| `/models` | GET | List available models |
| `/models/traits` | GET | Get model traits |
| `/models/compatibility_mapping` | GET | OpenAI name mapping |
| `/image/generate` | POST | Generate images |
| `/image/upscale` | POST | Upscale images |
| `/image/edit` | POST | Edit/inpaint images |
| `/image/styles` | GET | Available styles |
| `/audio/speech` | POST | Text-to-speech |
| `/embeddings` | POST | Generate embeddings |
| `/characters` | GET | List characters |
| `/characters/{slug}` | GET | Get character details |
| `/api_keys/rate_limits` | GET | Rate limit info |
| `/billing/usage` | GET | Usage statistics |

### Header Extraction

Venice API returns metadata in headers:

```typescript
{
  'CF-RAY': string                               // Request ID
  'x-ratelimit-remaining-requests': number       // Requests left
  'x-ratelimit-remaining-tokens': number         // Tokens left
  'x-ratelimit-reset-requests': timestamp        // Reset time
  'x-venice-balance-usd': number                 // USD balance
  'x-venice-balance-diem': number                // DIEM balance
  'x-venice-model-deprecation-warning': string   // Warning message
  'x-venice-model-deprecation-date': string      // Deprecation date
}
```

These are parsed and stored for display in StatsPanel.

### Streaming Implementation

Server-Sent Events (SSE) for streaming:

```typescript
async *chatStream() {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const text = decoder.decode(value);
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        
        const parsed = JSON.parse(data);
        yield parsed.choices[0].delta.content;
      }
    }
  }
}
```

## Data Flow

### Chat Flow
```
User Input
  ↓
App Store (messages)
  ↓
VeniceProvider.chatStream()
  ↓
Venice API
  ↓
SSE Stream
  ↓
Component State
  ↓
UI Update (streaming)
  ↓
Stats Panel
```

### Image Generation Flow
```
User Prompt + Settings
  ↓
VeniceProvider.generateImage()
  ↓
Venice API
  ↓
Base64 or URL Response
  ↓
Component State
  ↓
Image Display
  ↓
Stats Panel
```

## Security

### API Key Storage
- Stored in browser `localStorage`
- Never transmitted except to Venice API
- Not included in logs or error messages
- User-controlled (can be cleared)

### Data Privacy
- No telemetry or analytics
- No third-party services
- All data stays local
- Venice doesn't store prompts/responses

### CORS
- Not applicable (browser-based, same origin)
- Venice API allows browser requests
- `dangerouslyAllowBrowser: true` for development

### Future (Tauri Desktop)
- OS keychain integration
- Encrypted storage
- No browser storage
- Better isolation

## Performance Optimization

### Bundle Size
- Code splitting by route (future)
- Tree shaking with Vite
- Minification in production
- Lazy loading for heavy components

### Rendering
- React.memo for expensive components
- Virtual scrolling for long lists (planned)
- Debounced inputs for search/filter
- Optimistic UI updates

### Network
- Streaming for long responses
- Request deduplication
- Retry with exponential backoff
- Connection pooling

### State Management
- Minimal global state
- Local component state when possible
- Computed values with useMemo
- Efficient selectors with Zustand

## Error Handling

### Strategy
1. Try to complete the operation
2. Catch and log errors
3. Show user-friendly messages
4. Provide recovery options
5. Track in console for debugging

### Error Types

**Network Errors:**
```typescript
try {
  await fetch(...)
} catch (error) {
  // Network failure, timeout, CORS, etc.
}
```

**API Errors:**
```typescript
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}
```

**Rate Limits:**
```typescript
if (status === 429) {
  // Show retry countdown
  // Wait for x-ratelimit-reset-requests
}
```

**Validation Errors:**
```typescript
if (!apiKey) {
  setError('API key required');
  return;
}
```

### User Feedback
- Inline error messages
- Toast notifications (planned)
- Error boundaries (planned)
- Detailed console logs

## Testing Strategy

### Unit Tests (Planned)
- Component rendering
- Store actions
- Provider methods
- Utility functions

### Integration Tests (Planned)
- API communication
- State updates
- User flows
- Error scenarios

### E2E Tests (Planned)
- Full user journeys
- Cross-browser testing
- Performance benchmarks
- Accessibility checks

## Deployment

### Web Deployment
```bash
npm run build
# Upload dist/ to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3
```

### Environment Variables
```env
VENICE_API_KEY=xxx  # User provides via UI
```

### Build Output
- Static HTML, CSS, JS
- No server required
- CDN-friendly
- Cacheable assets

## Future Enhancements

### Desktop App (Tauri)
- Native window
- File system access
- OS notifications
- Auto-updates
- Better performance

### Features
- Image upscale implementation
- Image edit implementation
- Prompt templates library
- Response history
- Export conversations
- Custom model presets

### Technical
- Test coverage
- Error boundaries
- Service worker
- Offline mode
- PWA support

## Development Workflow

### Local Development
```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run lint     # Check code style
npm run build    # Production build
```

### Code Style
- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Consistent naming

### Git Workflow
- Feature branches
- Descriptive commits
- Pull requests
- Code review

## API Versioning

Venice API: v1
- Stable endpoints
- Deprecation warnings
- Migration paths
- Backward compatibility

## Browser Support

### Minimum Requirements
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used
- ES2020
- Fetch API
- Async/await
- CSS Grid
- localStorage

## Accessibility

### Current
- Semantic HTML
- Keyboard navigation
- Focus indicators
- Color contrast

### Planned
- ARIA labels
- Screen reader support
- Keyboard shortcuts
- High contrast mode

## Documentation

### Maintained Docs
- README.md: Overview and setup
- USER_GUIDE.md: End-user instructions
- ARCHITECTURE.md: This document
- API comments: Inline documentation

### Code Comments
- Complex logic
- Venice-specific behavior
- Workarounds
- TODOs

## Contributing

See README.md for contribution guidelines.

## License

MIT License - See LICENSE file.

---

Last Updated: 2025-10-19
