# Contributing to Venice Studio

Thank you for your interest in contributing to Venice Studio! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to maintain a welcoming and inclusive community.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- A clear description of the enhancement
- Use cases and benefits
- Potential implementation approach (optional)

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Add or update tests as needed
5. Ensure all tests pass: `npm test`
6. Build the project: `npm run build`
7. Commit your changes with clear commit messages
8. Push to your fork
9. Create a pull request

#### Pull Request Guidelines

- Keep changes focused and atomic
- Update documentation if needed
- Add tests for new features
- Follow the existing code style
- Write clear commit messages

## Development Setup

See the main README.md for detailed setup instructions.

## Testing

Run tests with:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test
```

## Building

Build the application:

```bash
npm run build
npm run tauri build
```

## Style Guide

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful variable and function names
- Add comments for complex logic
- Use consistent formatting (the project uses Prettier-compatible style)

## Questions?

Feel free to open an issue for questions or discussion!
