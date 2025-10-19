# Image Generation Guide

Complete guide to using the enhanced Image Generation tab in Venice Studio.

## Overview

The Image Generation tab provides a powerful interface for creating AI-generated images using Venice AI's image models. It includes advanced features like multiple image generation, aspect ratio presets, seed control, and an interactive gallery.

## Quick Start

1. **Navigate to Image Tab**: Click the 🖼️ Image button in the sidebar
2. **Enter a Prompt**: Describe the image you want to generate
3. **Generate**: Click "Generate Image" or press `Ctrl+Enter`
4. **View Results**: Generated images appear in the gallery below

## Interface Components

### Model Selection
Choose from available image generation models (e.g., flux-1.1-pro, stable-diffusion, etc.)

### Prompt
- **Character Counter**: Shows prompt length in real-time
- **Copy Button**: Click 📋 to copy prompt to clipboard
- **Keyboard Shortcut**: Press `Ctrl+Enter` to generate quickly

### Aspect Ratio Presets
Quick buttons for common image dimensions:
- **⬜ Square**: 1024×1024 - Perfect for profile pictures, social media posts
- **📱 Portrait**: 768×1344 - Ideal for phone wallpapers, vertical designs
- **🖼️ Landscape**: 1344×768 - Great for desktop wallpapers, banners
- **📺 Widescreen**: 1536×640 - Best for ultra-wide displays, headers

### Negative Prompt
Specify what you *don't* want in the image (e.g., "blurry, low quality, distorted")

### Advanced Settings
Enable "Advanced Options" in the sidebar to access:

#### Steps (1-100)
Number of inference steps. Higher values = better quality but slower generation.
- **Recommended**: 20-30 for quick results
- **High Quality**: 50-100 for best results

#### # of Images (1-4)
Generate multiple variations in a single request
- Useful for comparing different results
- All images share the same parameters

#### Width & Height (256-2048)
Custom dimensions in pixels
- Must be multiples of 64
- Larger images take longer to generate

#### CFG Scale (1-20)
Classifier Free Guidance Scale - controls how closely the image follows the prompt
- **Lower (1-7)**: More creative, less strict adherence
- **Higher (7-20)**: More accurate to prompt, less creative

#### Seed
Random seed for reproducible results
- **Random**: Leave empty for random generation
- **🎲 Button**: Generate a random seed value
- **Specific**: Enter a number to reproduce exact results

#### Style Preset
Optional artistic style (if available from API)

## Image Gallery

### Thumbnail View
- Grid layout showing all generated images
- Hover to see preview overlay
- Click thumbnail to open full-screen view

### Image Information
Each thumbnail displays:
- **Prompt**: Original text prompt (truncated)
- **Seed**: Generation seed (if available)
- **Actions**: Download and Reuse Seed buttons

### Gallery Actions
- **Download**: Save individual images
- **♻️ Reuse Seed**: Copy seed to input for regeneration
- **🗑️ Clear All**: Remove all images (with confirmation)

## Full-Screen Preview Modal

Click any thumbnail to open the modal:

### Features
- Large image display
- Image counter (e.g., "2 of 4")
- Full metadata (prompt, seed, timestamp)
- Navigation buttons (Previous/Next)
- Keyboard navigation (Arrow keys)
- Close button or press `Escape`

### Actions in Modal
- **⬇️ Download Image**: Save with descriptive filename
- **♻️ Reuse Seed**: Apply seed to new generation
- **← Previous / Next →**: Navigate between images

### Keyboard Shortcuts in Modal
- `Escape`: Close modal
- `←` (Left Arrow): Previous image
- `→` (Right Arrow): Next image

## Tips for Best Results

### Prompt Writing
1. **Be Specific**: Include details about subject, style, mood, lighting
2. **Use Descriptive Language**: "vibrant colors", "soft lighting", "detailed"
3. **Reference Styles**: "in the style of...", "photorealistic", "anime style"
4. **Include Composition**: "close-up", "wide angle", "centered"

### Example Prompts
```
Good: "A majestic dragon flying over a medieval castle at sunset, 
       detailed scales, vibrant orange and purple sky, cinematic lighting"

Better: "Photorealistic dragon with iridescent scales soaring above 
         an ancient stone castle, golden hour lighting, dramatic clouds, 
         4k quality, trending on artstation"
```

### Negative Prompts
Common things to exclude:
- `blurry, low quality, distorted, disfigured`
- `text, watermark, signature`
- `multiple heads, deformed, ugly`
- `oversaturated, underexposed`

### Parameter Recommendations

**For Speed**:
- Steps: 20-25
- Single image
- Standard resolution (1024×1024)

**For Quality**:
- Steps: 40-60
- CFG Scale: 7-9
- Higher resolution
- Multiple images to choose from

**For Experimentation**:
- Generate 4 images with different seeds
- Try variations of similar prompts
- Adjust CFG scale to see differences

## Workflow Examples

### Creating Character Art
1. Enter detailed character description
2. Use Portrait aspect ratio (768×1344)
3. Add negative prompt: "blurry, low quality, distorted face"
4. Generate 4 variations
5. Select best result
6. Reuse seed and refine prompt

### Landscape Photography
1. Describe scene with lighting and weather
2. Use Landscape aspect ratio (1344×768)
3. Set higher steps (40-50) for quality
4. Add style keywords like "cinematic", "high detail"
5. Download best result

### Logo/Icon Design
1. Simple, clear description
2. Use Square aspect ratio (1024×1024)
3. Add negative prompt for unwanted elements
4. Generate multiple versions
5. Compare and select

## Troubleshooting

### "Network error: Unable to connect"
- Check internet connection
- Verify API key in Settings
- Check Venice AI status

### "Width and height must be between 256 and 2048"
- Adjust dimensions to valid range
- Use aspect ratio presets for common sizes

### Images look different than expected
- Adjust CFG scale (higher = more accurate)
- Increase steps for better quality
- Refine prompt with more details
- Try negative prompts to exclude unwanted elements

### Slow generation
- Reduce steps (try 20-25)
- Use smaller dimensions
- Generate fewer images at once

## File Naming

Downloaded images use descriptive names:
```
venice-{model}-{timestamp}-seed{seed}.png
```

Example:
```
venice-flux-1.1-pro-2025-10-19T05-30-15-seed813033683.png
```

This helps organize and track generated images, especially when reusing seeds.

## Advanced Techniques

### Seed Management
- Use same seed with modified prompts to maintain composition
- Save successful seeds for future reference
- Experiment with nearby seed values (±1000)

### Batch Generation
1. Generate 4 images with different seeds
2. Compare results
3. Reuse best seed
4. Refine prompt incrementally

### Iterative Refinement
1. Start with broad prompt
2. Generate and review
3. Add specific details
4. Regenerate with same seed
5. Compare improvements

## Keyboard Shortcuts Summary

| Action | Shortcut |
|--------|----------|
| Generate Image | `Ctrl+Enter` |
| Close Modal | `Escape` |
| Previous Image | `←` (in modal) |
| Next Image | `→` (in modal) |

## Privacy & Storage

- Images are stored in browser memory only
- No automatic save to disk
- Clear browser cache to remove images
- Download to save permanently

## API Considerations

- Each generation counts as one API request
- Multiple images (n=4) may cost 4× credits
- Check Venice AI pricing for details
- Higher steps and resolution may cost more

## Best Practices

1. **Start Simple**: Test with default settings first
2. **Iterate**: Refine prompts based on results
3. **Save Good Seeds**: Note seeds that work well
4. **Organize Downloads**: Use descriptive folder names
5. **Experiment**: Try different models and settings
6. **Learn from Examples**: Study successful prompts

## Support

For issues or questions:
- Check Venice AI documentation
- Review error messages carefully
- Verify API key and connection
- Try with default parameters first

---

**Last Updated**: 2025-10-19
**Version**: 1.0
