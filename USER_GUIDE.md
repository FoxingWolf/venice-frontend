# User Guide - Venice Studio

Welcome to Venice Studio! This guide will help you get started with using all the features of this private AI workspace.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Chat Mode](#chat-mode)
3. [Image Generation](#image-generation)
4. [Text-to-Speech](#text-to-speech)
5. [Embeddings](#embeddings)
6. [Characters](#characters)
7. [Venice Parameters](#venice-parameters)
8. [Stats Panel](#stats-panel)
9. [Tips & Tricks](#tips--tricks)

## Getting Started

### First Time Setup

1. **Launch Venice Studio**
   - Open the application in your browser
   - You'll see a Settings dialog on first launch

2. **Configure Your API Key**
   - Get your API key from [venice.ai](https://venice.ai/)
   - Paste it into the Settings dialog
   - Click "Save"
   - Your key is stored locally and only used to communicate with Venice AI

3. **Verify Connection**
   - The app will automatically test your API key
   - Once verified, you're ready to use all features!

### Understanding the Interface

The Venice Studio interface has three main areas:

- **Left Sidebar**: Mode selection and settings
- **Center Panel**: Your workspace (chat, image generation, etc.)
- **Right Panel**: Stats and usage monitoring

## Chat Mode

Chat with AI models powered by Venice.

### Basic Usage

1. Click "💬 Chat" in the sidebar
2. Type your message in the input field at the bottom
3. Press Enter or click "Send"
4. Watch your response stream in real-time

### Features

- **Streaming Responses**: See the AI's response as it's generated
- **Message History**: All messages stay in the conversation
- **Multi-line Input**: Use Shift+Enter for new lines
- **Character Support**: Select a character from Characters mode to chat in their persona

### Example Prompts

```
"Explain quantum computing in simple terms"
"Write a Python function to sort a list"
"Plan a 7-day trip to Japan"
"Help me debug this error: [paste error]"
```

## Image Generation

Generate stunning images from text descriptions.

### Basic Generation

1. Click "🖼️ Image" in the sidebar
2. Enter a detailed prompt describing your desired image
3. (Optional) Add negative prompts to exclude unwanted elements
4. Click "Generate Image"
5. Wait for the image to generate
6. Download your image when ready

### Prompt Tips

Good prompts are:
- **Detailed**: "ultra-detailed neon cyberpunk skyline at dusk"
- **Specific**: Include style, mood, lighting, perspective
- **Clear**: Avoid contradictory descriptions

Example good prompt:
```
ultra-detailed neon cyberpunk skyline at dusk, 
rain-soaked streets, volumetric light, 35mm, 
f/1.8, film grain, cinematic
```

### Advanced Settings

Enable "Advanced Options" in the sidebar to access:

- **Model Selection**: Choose between Qwen Image or Venice SD 3.5
- **Width/Height**: Set custom dimensions (256-2048px)
- **Steps**: Higher = better quality but slower (1-100)
- **CFG Scale**: How closely to follow the prompt (1-20)
- **Seed**: Use the same seed for reproducible results
- **Negative Prompt**: Things to avoid in the image

### Common Sizes

- Square: 1024x1024 (default)
- Portrait: 768x1024
- Landscape: 1024x768
- Wide: 1920x1080

## Text-to-Speech

Convert text to natural-sounding speech.

### Usage

1. Click "🔊 TTS" in the sidebar
2. Enter the text you want to convert to speech
3. Select a voice from the dropdown
4. Adjust speed if needed (0.5-2.0x)
5. Choose output format (MP3 recommended)
6. Click "Generate Speech"
7. Play or download the audio

### Available Voices

- **Female Voices**: af_sky, af_bella, af_sarah, af_nicole
- **Male Voices**: am_adam, am_michael
- **British Voices**: bf_emma, bf_isabella, bm_george, bm_lewis

### Tips

- Use natural punctuation for better pacing
- Longer texts take more time to generate
- MP3 format works everywhere
- FLAC is best for quality

## Embeddings

Convert text into numerical vectors for semantic search and analysis.

### Usage

1. Click "🔢 Embeddings" in the sidebar
2. Enter text to embed
3. Choose encoding format (Float or Base64)
4. Click "Generate Embeddings"
5. View or download the embeddings JSON

### Use Cases

- **Semantic Search**: Find similar documents
- **Clustering**: Group related content
- **Classification**: Categorize text
- **Recommendation**: Find related items

### Understanding Output

- **Dimensions**: 1024 numbers per text
- **Format**: JSON array of arrays
- **Usage**: Use in vector databases or ML models

## Characters

Chat with AI personas and characters.

### Using Characters

1. Click "🎭 Characters" in the sidebar
2. Browse available characters
3. Click on a character to select them
4. Switch to Chat mode
5. Your messages will now be answered by that character

### Character Info

Each character has:
- **Name**: The character's identity
- **Description**: Background and personality
- **Avatar**: Visual representation
- **Slug**: Unique identifier

### Deselecting

Click "Deselect" to return to normal chat mode.

## Venice Parameters

Venice-specific features that enhance your AI interactions.

### Accessing Parameters

1. Click "Advanced Options" in the sidebar
2. Venice Parameters panel appears above the toggle
3. Check/uncheck features as needed

### Available Parameters

#### Web Search
- **Auto**: AI decides when to search
- **Always**: Search on every request
- **Never**: Disable web search

Use for: Up-to-date information, current events, facts

#### Web Citations
Include source links in responses.
Great for research and fact-checking.

#### Web Scraping
Full page content augmentation.
More comprehensive than basic search.

#### Venice System Prompt
Use Venice's optimized system prompts.
Uncheck to provide your own system message.

#### Disable/Strip Thinking
Control reasoning output visibility.

## Stats Panel

Monitor your usage and performance in real-time.

### What You'll See

**Request Info**
- Request ID: For support/troubleshooting
- Model: Which AI model was used

**Token Usage**
- Prompt: Input tokens
- Completion: Output tokens
- Total: Sum of both
- Context Limit: Model's maximum capacity

**Rate Limits**
- Remaining Requests: Before rate limit
- Remaining Tokens: Before token limit

**Balances**
- USD: Dollar balance
- DIEM: Venice credits

**Deprecation Warnings**
- Alerts when using deprecated models
- Migration suggestions

### Reading Stats

- Green numbers = good (balances)
- White numbers = info (usage)
- Yellow = warnings (deprecation)
- Red = errors (problems)

## Tips & Tricks

### Optimizing Costs

1. Use appropriate models for each task
2. Monitor token usage in Stats panel
3. Keep prompts focused and clear
4. Use shorter responses when possible

### Better Results

**For Chat:**
- Be specific about what you want
- Provide context and examples
- Break complex tasks into steps
- Use web search for current info

**For Images:**
- Describe style, mood, lighting
- Use negative prompts effectively
- Experiment with CFG scale
- Save seeds for good results

**For TTS:**
- Use proper punctuation
- Choose appropriate voice
- Test different speeds
- Use SSML if needed

### Privacy

- Your API key never leaves your device
- No data is stored by Venice Studio
- Venice doesn't log your prompts/responses
- All communication is encrypted (HTTPS)

### Troubleshooting

**API Key Issues:**
- Verify your key at venice.ai
- Check for typos when pasting
- Ensure key has proper permissions

**Rate Limits:**
- Wait for rate limit reset
- Monitor Stats panel
- Reduce request frequency

**Image Generation:**
- Try different models
- Adjust prompt clarity
- Check dimension constraints
- Reduce steps if timing out

**Connection Issues:**
- Check internet connection
- Verify Venice API status
- Try refreshing the page
- Clear browser cache

### Keyboard Shortcuts

- **Enter**: Send chat message (single-line)
- **Shift+Enter**: New line in chat input
- **Ctrl/Cmd+R**: Refresh app

### Advanced Usage

**Model Selection:**
- llama-3.3-70b: Balanced, general purpose
- qwen3-235b: Deep reasoning
- venice-uncensored: Creative, unfiltered
- qwen3-coder-480b: Code generation (beta)

**JSON Schema:**
Request structured outputs by providing a schema in advanced settings (future feature).

**Function Calling:**
Use tools and function definitions for agentic workflows (future feature).

## Getting Help

- **Documentation**: Check README.md
- **Issues**: Open on GitHub
- **Venice Support**: Contact for API issues
- **Community**: Share tips and tricks

## Updates

Venice Studio is regularly updated with:
- New Venice API features
- Performance improvements
- Bug fixes
- UI enhancements

Check the changelog for latest updates!

---

Enjoy using Venice Studio! 🚀
