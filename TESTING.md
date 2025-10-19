# Testing Guide - Venice Studio

This document describes the testing strategy for Venice Studio.

## Test Structure (Planned)

```
tests/
├── unit/
│   ├── providers/
│   │   └── VeniceProvider.test.ts
│   ├── stores/
│   │   └── appStore.test.ts
│   └── utils/
│       └── helpers.test.ts
├── integration/
│   ├── chat.test.ts
│   ├── image.test.ts
│   └── settings.test.ts
└── e2e/
    ├── user-flows.test.ts
    └── scenarios.test.ts
```

## Setting Up Tests

### Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Update package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Create vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Unit Tests

### Example: VeniceProvider Test

```typescript
// tests/unit/providers/VeniceProvider.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VeniceProvider } from '@/providers/VeniceProvider';

describe('VeniceProvider', () => {
  let provider: VeniceProvider;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    provider = new VeniceProvider(mockApiKey);
    global.fetch = vi.fn();
  });

  it('should initialize with API key', () => {
    expect(provider).toBeDefined();
  });

  it('should extract headers correctly', async () => {
    const mockHeaders = new Headers({
      'CF-RAY': '1234567890',
      'x-ratelimit-remaining-requests': '100',
      'x-venice-balance-usd': '10.50',
    });

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
      headers: mockHeaders,
    });

    const { headers } = await provider.getModels();
    
    // Note: getModels doesn't return headers yet
    // This is an example of what the test would look like
  });

  it('should handle API errors', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'Unauthorized' } }),
    });

    await expect(provider.getModels()).rejects.toThrow();
  });
});
```

### Example: Store Test

```typescript
// tests/unit/stores/appStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/stores/appStore';

describe('appStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      apiKey: '',
      models: [],
      selectedModel: 'llama-3.3-70b',
    });
  });

  it('should initialize with default values', () => {
    const state = useAppStore.getState();
    expect(state.apiKey).toBe('');
    expect(state.selectedModel).toBe('llama-3.3-70b');
  });

  it('should update API key', () => {
    const { setApiKey } = useAppStore.getState();
    setApiKey('new-key');
    
    const state = useAppStore.getState();
    expect(state.apiKey).toBe('new-key');
  });

  it('should add stats', () => {
    const { addStats } = useAppStore.getState();
    const stats = {
      requestId: '123',
      modelId: 'llama-3.3-70b',
      timestamp: Date.now(),
    };

    addStats(stats);
    
    const state = useAppStore.getState();
    expect(state.stats).toHaveLength(1);
    expect(state.stats[0]).toEqual(stats);
  });

  it('should limit stats to 50 entries', () => {
    const { addStats } = useAppStore.getState();
    
    // Add 60 stats
    for (let i = 0; i < 60; i++) {
      addStats({
        requestId: `${i}`,
        modelId: 'llama-3.3-70b',
        timestamp: Date.now(),
      });
    }
    
    const state = useAppStore.getState();
    expect(state.stats).toHaveLength(50);
  });
});
```

## Integration Tests

### Example: Chat Component Test

```typescript
// tests/integration/chat.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chat } from '@/components/Chat';
import { useAppStore } from '@/stores/appStore';

describe('Chat Component', () => {
  it('should render input field', () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/type your message/i);
    expect(input).toBeInTheDocument();
  });

  it('should show error when no provider', () => {
    useAppStore.setState({ provider: null });
    render(<Chat />);
    
    expect(screen.getByText(/configure your API key/i)).toBeInTheDocument();
  });

  it('should send message when user types and clicks send', async () => {
    const mockProvider = {
      chatStream: vi.fn(async function* () {
        yield { chunk: 'Hello', headers: {} };
        yield { chunk: ' world', headers: {} };
      }),
    };

    useAppStore.setState({ 
      provider: mockProvider as any,
      selectedModel: 'llama-3.3-70b',
    });

    render(<Chat />);
    
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(input, 'Hello AI');
    await user.click(sendButton);

    await waitFor(() => {
      expect(mockProvider.chatStream).toHaveBeenCalled();
    });
  });
});
```

## E2E Tests

### Example: User Flow Test

```typescript
// tests/e2e/user-flows.test.ts
import { describe, it, expect } from 'vitest';
// Note: E2E tests would use Playwright or Cypress

describe('Complete User Flow', () => {
  it('should allow user to configure key and chat', async () => {
    // 1. Visit app
    // 2. See settings dialog
    // 3. Enter API key
    // 4. Save
    // 5. Navigate to Chat
    // 6. Send message
    // 7. Receive response
    // 8. Check stats panel updated
  });

  it('should generate an image', async () => {
    // 1. Navigate to Image mode
    // 2. Enter prompt
    // 3. Click generate
    // 4. Wait for image
    // 5. Verify image displayed
    // 6. Download image
  });
});
```

## Manual Testing Checklist

### Initial Setup
- [ ] App loads without errors
- [ ] Settings dialog appears on first launch
- [ ] Can enter and save API key
- [ ] API key is validated
- [ ] Models are loaded

### Chat Mode
- [ ] Can type messages
- [ ] Send button works
- [ ] Streaming responses display
- [ ] Message history persists
- [ ] Error handling works
- [ ] Stats panel updates

### Image Generation
- [ ] Can enter prompts
- [ ] Advanced options toggle works
- [ ] Generate button works
- [ ] Image displays
- [ ] Download works
- [ ] Error messages show

### TTS
- [ ] Can enter text
- [ ] Voice selection works
- [ ] Generate works
- [ ] Audio plays
- [ ] Download works

### Embeddings
- [ ] Can enter text
- [ ] Generate works
- [ ] JSON displays
- [ ] Download works

### Characters
- [ ] Characters load
- [ ] Can select character
- [ ] Character details show
- [ ] Chat integration works
- [ ] Can deselect

### Venice Parameters
- [ ] Advanced options toggle works
- [ ] All checkboxes work
- [ ] Web search dropdown works
- [ ] Parameters persist
- [ ] Parameters sent in requests

### Stats Panel
- [ ] Request ID shows
- [ ] Token usage displays
- [ ] Rate limits update
- [ ] Balances show
- [ ] Deprecation warnings appear

### Settings
- [ ] Can open settings
- [ ] Can change API key
- [ ] Validation works
- [ ] Can cancel

### Error Handling
- [ ] Network errors show messages
- [ ] API errors display
- [ ] Rate limits handled
- [ ] Invalid inputs prevented

### Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast adequate

## Performance Testing

### Metrics to Monitor
- Initial load time
- Time to interactive
- Bundle size
- Memory usage
- Network requests

### Tools
- Chrome DevTools
- Lighthouse
- WebPageTest
- Bundle analyzer

## Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- VeniceProvider.test.ts

# Run in watch mode
npm test -- --watch
```

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## Test Coverage Goals

- Unit tests: 80%+
- Integration tests: Key user flows
- E2E tests: Critical paths
- Manual testing: Full checklist before release

## Best Practices

1. **Write tests first** (TDD when possible)
2. **Keep tests isolated** (no shared state)
3. **Mock external dependencies** (API calls)
4. **Test behavior, not implementation**
5. **Use descriptive test names**
6. **Organize by feature**
7. **Run tests in CI/CD**
8. **Maintain test coverage**

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

Last Updated: 2025-10-19
