<!--
Guidance for automated coding agents working on the Venice Studio frontend.
Keep this file short and specific. Include examples and files to consult.
-->

# Copilot / AI Agent Instructions — Venice Studio (frontend)

Short, actionable guidance to help automated coding agents be productive in this repo.

- Project type: React + TypeScript (Vite). Entry: `src/main.tsx`, `src/App.tsx`.
- State: Zustand store in `src/stores/appStore.ts`. API client wrapper: `src/providers/VeniceProvider.ts`.
- Important types: `src/types/venice.ts` (models, requests, venice_parameters).

What to change and where
- UI views live under `src/components/` (Chat, ImageGenerate, Characters, TTS, Embeddings, Settings).
- Provider logic and HTTP contracts live in `src/providers/VeniceProvider.ts`. Changes to API surface should be mirrored in `src/types/venice.ts` and usages in `src/stores/appStore.ts`.
- Global wiring: `App.tsx` mounts components and reads/writes the store; update it only when adding new global UI modes or top-level state.

Key conventions and patterns
- API key is stored in browser localStorage (loaded in `App.tsx`); prefer `useAppStore().initializeProvider(key)` when programmatically setting the provider.
- All Venice API requests go through `VeniceProvider`. For streaming chat, use `provider.chatStream(...)` and iterate the AsyncGenerator (see `src/components/Chat.tsx`).
- Venice-specific runtime options are passed via `venice_parameters` (see `VeniceParametersPanel.tsx` and `types/venice.ts`). Preserve this field when forwarding requests.
- Stats and response metadata are captured from HTTP response headers by `VeniceProvider.extractHeaders()` and stored via `useAppStore().addStats(...)` (used by `StatsPanel.tsx`).

Build/test/dev workflows
- Local dev: `npm install` then `npm run dev` (Vite server at http://localhost:5173).
- Build: `npm run build` (runs `tsc && vite build`). Preview: `npm run preview`.
- Lint/format: `npm run lint` and `npm run format`.

Patterns to follow when editing
- Keep provider HTTP errors as thrown Errors (the UI surfaces them). If adding fields to responses, add types to `src/types/venice.ts`, update `VeniceProvider` parsing, then update consuming components.
- For streaming responses: maintain the same SSE parsing strategy (lines starting with `data:`). Unit changes to stream parsing must keep compatibility with `Chat.tsx`'s for-await usage.
- When adding new features that need config, expose them via the Zustand store (`src/stores/appStore.ts`) and toggle in `App.tsx` sidebar.

Integration points and external dependencies
- Venice API base: https://api.venice.ai/api/v1 (used in `VeniceProvider`). Auth: Bearer token.
- Third-party libs of note: `zustand` (state), `tailwindcss` (styles), `vite` (build), `@tauri-apps/*` (desktop support). Avoid introducing new global state libraries.

Small examples (copyable patterns)
- Initialize provider with an API key:
  const { initializeProvider } = useAppStore();
  initializeProvider(apiKey);

- Streaming chat consumption (consumer pattern used in `Chat.tsx`):
  for await (const { chunk } of provider.chatStream({ model, messages, stream: true })) {
    // append chunk
  }

Files to inspect first for any change
- `src/providers/VeniceProvider.ts`
- `src/stores/appStore.ts`
- `src/types/venice.ts`
- `src/components/Chat.tsx`, `VeniceParametersPanel.tsx`, `Characters.tsx`, `StatsPanel.tsx`

When to ask the human
- If a change requires a new API scope, credential, or backend contract (new endpoint or auth flow), stop and ask.
- If unsure about persisting sensitive data differently (localStorage vs keychain for Tauri), ask for platform/UX requirements.

Keep edits small and testable: add or update a single component, provider method, or store slice and verify with `npm run dev` and the browser UI.
