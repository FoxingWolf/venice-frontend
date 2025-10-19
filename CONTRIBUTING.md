# Contributing to Venice Studio

Thank you for your interest in contributing to Venice Studio! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help maintain a positive community

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/FoxingWolf/venice-frontend/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Check existing feature requests
2. Open a new issue with:
   - Clear use case description
   - Expected behavior
   - Mockups or examples if applicable
   - Potential implementation approach

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/venice-frontend.git
   cd venice-frontend
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm test
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe what your PR does
   - Link related issues
   - Include screenshots for UI changes
   - Request review

## Development Setup

### Prerequisites
- Node.js 18+
- npm
- Git

### Installation
```bash
npm install
```

### Development
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Lint code
npm run format    # Format code
```

## Code Style

### TypeScript
- Use TypeScript for all new files
- Define types for props and state
- Avoid `any` type
- Use interfaces for objects

### React
- Use functional components with hooks
- Keep components small and focused
- Use meaningful prop names
- Add prop validation

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Functions: camelCase (`handleClick`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: PascalCase for components, camelCase for utilities

### File Organization
```
src/
├── components/    # React components
├── providers/     # API providers
├── stores/        # State management
├── types/         # TypeScript types
├── utils/         # Utility functions
└── hooks/         # Custom hooks
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

Examples:
```
feat: add image upscale feature
fix: resolve streaming chat issue
docs: update README with new examples
```

## Testing

### Writing Tests
- Write tests for new features
- Update tests for bug fixes
- Aim for good coverage
- Test edge cases

### Running Tests
```bash
npm test                # Run all tests
npm run test:ui         # Run with UI
npm run test:coverage   # Check coverage
```

## Documentation

Update relevant documentation:
- README.md for overview changes
- USER_GUIDE.md for user-facing features
- ARCHITECTURE.md for technical changes
- Inline comments for complex logic

## Review Process

1. Maintainers review PRs
2. Address feedback
3. Get approval
4. Merge to main

## Questions?

- Open an issue for questions
- Check existing documentation
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
