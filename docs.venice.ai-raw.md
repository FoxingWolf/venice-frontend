

--- Page Title: Venice AI Platform - Privacy-First AI API | URL: https://docs.venice.ai/overview/about-venice ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* The AI platform that doesn’t spy on you
* OpenAI Compatibility
* Build with Venice APIs
* Popular Models
* Extend models with built‑in tools
* Available Parameters
* Pricing Options
* Start building today

# ​
The AI platform that doesn’t spy on you

Build AI with no data retention, permissionless access, and compute you permanently own.## Start Building

Make your first request in minutes.

## View Models

Compare capabilities, context, and base models.

## API Reference

Endpoints, payloads, and examples.

## ​
OpenAI Compatibility

Use your existing OpenAI code with just a base URL change.Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [{"role": "user", "content": "Hello World!"}]
  }'

```

## ​
Build with Venice APIs

Access chat, image generation (generate/upscale/edit), audio (TTS), and characters.## Chat Completions

**Text + reasoning**Vision, tool use, streaming

## Image Generation

**Generate, upscale, and edit**Models for styles, quality, and uncensored

## Audio Synthesis

**Text → speech**60+ multilingual voices

## AI Characters

**Characters API**Create, list, and chat with personas

View all API endpoints →## ​
Popular Models

Copy a Model ID and use it as `model` in your requests.## Venice Large 1.1

Flagship model for deep reasoning and production agents.Model ID: `qwen3-235b` Base: Qwen 3 235B (Venice‑tuned) Context: 131k • Modalities: Text → Text**Use cases*** Agent planning and tool use
* Complex code & system design
* Long‑context reasoning

Copy

Ask AI

```
{"model":"qwen3-235b","messages":[{"role":"user","content":"Plan a zero‑downtime DB migration in 3 steps"}]}

```

## Venice Uncensored

**Unfiltered generation**Model ID: `venice-uncensored`Base model: Venice Uncensored 1.1Context: 32k • Best for: uncensored creative, red‑team testingCopy

Ask AI

```
{"model":"venice-uncensored","messages":[{"role":"user","content":"Write an unfiltered analysis of content moderation policies"}]}

```

## Venice Medium 3.1

**Vision + tools**Model ID: `mistral-31-24b`Base model: Mistral 3.1 24BContext: 131k • Supports: Vision, Function calling, image analysisCopy

Ask AI

```
{"model":"mistral-31-24b","messages":[{"role":"user","content":"Describe this image"}]}

```

## Venice Small

**Fast and cost‑efficient**Model ID: `qwen3-4b`Base model: Qwen 3 4BContext: 40k • Best for: chatbots, classification, light reasoningCopy

Ask AI

```
{"model":"qwen3-4b","messages":[{"role":"user","content":"Summarize:"}]}

```

## Venice SD35

**Image generation**Model ID: `venice-sd35`Base model: SD3.5 LargeBest for: Text‑to‑image, photorealism, product shots, light upscalingCopy

Ask AI

```
{"model":"venice-sd35","prompt":"a serene canal in venice at sunset"}

```

View all models →## ​
Extend models with built‑in tools

Toggle on compatible models using `venice_parameters` or model suffixes## Web Search

**Real‑time web results**

## Reasoning Mode

**Advanced reasoning**

## Vision Processing

**Image understanding**

## Function Calling

**Tool use / APIs**

Web Search Code Samples

Enable real-time web search with citations on **all text models**. Get up-to-date information from the internet and include source citations in responses. Works with any Venice text model.Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-235b",
    "messages": [{"role": "user", "content": "What are the latest developments in AI?"}],
    "venice_parameters": {
      "enable_web_search": "auto"
    }
  }'

```

Reasoning Mode Code Samples

Advanced step-by-step reasoning with visible thinking process. Available on **reasoning models**: `qwen3-4b`, `qwen3-235b`. Shows detailed problem-solving steps in `<think>` tags.Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-235b",
    "messages": [{"role": "user", "content": "Solve: If x + 2y = 10 and 3x - y = 5, what are x and y?"}],
    "venice_parameters": {
      "strip_thinking_response": false
    }
  }'

```

Vision Processing Code Samples

Image understanding and multimodal analysis. Available on **vision models**: `mistral-31-24b`. Upload images via base64 data URIs or URLs for analysis, description, and reasoning.Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistral-31-24b",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What do you see in this image?"},
          {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,..."}}
        ]
      }
    ]
  }'

```

Function Calling Code Samples

Tool use and external API integration. Available on **function calling models**: `qwen3-235b`, `qwen3-4b`, `mistral-31-24b`, `llama-3.2-3b`, `llama-3.3-70b`. Define tools for the model to call external APIs, databases, or custom functions.Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-235b",
    "messages": [{"role": "user", "content": "What is the weather like in New York?"}],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get current weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string", "description": "City name"}
            },
            "required": ["location"]
          }
        }
      }
    ]
  }'

```

### ​
Available Parameters

| Parameter | Options | Description |
| --- | --- | --- |
| enable_web_search | off, on, auto | Enable real-time web search |
| enable_web_scraping | true, false | Scrape URLs detected in user message |
| enable_web_citations | true, false | Include citations in web search results |
| strip_thinking_response | true, false | Hide reasoning steps from response |
| disable_thinking | true, false | Disable reasoning mode entirely |
| include_venice_system_prompt | true, false | Include Venice system prompts |
| character_slug | string | Use a specific AI character |

*Additional parameters available for advanced use cases like streaming search results and LangChain integration. View all parameters →*## ​
Pricing Options

[## Pro subscription

**$10 in free credits**One‑time credit when you upgrade

](https://venice.ai/chat)[## Buy DIEM

**Permanent access**Stake DIEM for daily compute allocation

](https://venice.ai/token)## Pay-as-you-go (USD)

**USD payments**Fund your account in USD and pay per usage

## ​
Start building today

Get your API key and make your first request.## Getting Started

Step-by-step guide to your first API call

## API Reference

Complete API documentation and endpoints

## Postman Collection

Ready-to-use API examples and testing

## AI Agents

Build with Eliza and other agent frameworks

Venice’s API is rapidly evolving. Join our [Discord](https://discord.gg/askvenice) to provide feedback and request new features. Your input shapes our development roadmap.

---

These docs are open source and can be contributed to on [Github](https://github.com/veniceai/api-docs). For additional guidance, see our blog post: [“How to use Venice API”](https://venice.ai/blog/how-to-use-venice-api)
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/about-venice.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/about-venice)

Getting Started
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Reference | URL: https://docs.venice.ai/api-reference/api-spec ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

On this page
* Authentication
* OpenAI Compatibility
* Setup
* Venice-Specific Features
* System Prompts
* Disabling Venice System Prompts
* Venice Parameters
* Response Headers Reference
* Important Notes
* Example: Accessing Response Headers
* Best Practices
* Differences from OpenAI’s API
* API Stability
* Swagger Configuration

The Venice API offers HTTP-based REST and streaming interfaces for building AI applications with uncensored models and private inference. You can create with text generation, image creation, embeddings, and more, all without restrictive content policies. Integration examples and SDKs are available in the documentation.## ​
Authentication

The Venice API uses API keys for authentication. Create and manage your API keys in your [API settings](https://venice.ai/settings/api).All API requests require HTTP Bearer authentication:Copy

Ask AI

```
Authorization: Bearer VENICE_API_KEY

```

Your API key is a secret. Do not share it or expose it in any client-side code.

## ​
OpenAI Compatibility

Venice’s API implements the OpenAI API specification, ensuring compatibility with existing OpenAI clients and tools. This allows you to integrate with Venice using the familiar OpenAI interface while accessing Venice’s unique features and uncensored models.### ​
Setup

Configure your client to use Venice’s base URL (`https://api.venice.ai/api/v1`) and make your first request:Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

```

## ​
Venice-Specific Features

### ​
System Prompts

Venice provides default system prompts designed to ensure uncensored and natural model responses. You have two options for handling system prompts:* **Default Behavior**: Your system prompts are appended to Venice’s defaults
* **Custom Behavior**: Disable Venice’s system prompts entirely

#### ​
Disabling Venice System Prompts

Use the `venice_parameters` option to remove Venice’s default system prompts:Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [
      {"role": "system", "content": "Your custom system prompt"},
      {"role": "user", "content": "Why is the sky blue?"}
    ],
    "venice_parameters": {
      "include_venice_system_prompt": false
    }
  }'

```

### ​
Venice Parameters

The `venice_parameters` object allows you to access Venice-specific features not available in the standard OpenAI API:| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| character_slug | string | The character slug of a public Venice character (discoverable as “Public ID” on the published character page) | - |
| strip_thinking_response | boolean | Strip <think></think> blocks from the response (applicable to reasoning/thinking models) | false |
| disable_thinking | boolean | On supported reasoning models, disable thinking and strip the <think></think> blocks from the response | false |
| enable_web_search | string | Enable web search for this request (off, on, auto - auto enables based on model’s discretion) | off |
| enable_web_scraping | boolean | Enable web scraping of URLs detected in the user message. Scraped content augments responses and bypasses web search | false |
| enable_web_citations | boolean | When web search is enabled, request that the LLM cite its sources using [REF]0[/REF] format | false |
| include_search_results_in_stream | boolean | Experimental: Include search results in the stream as the first emitted chunk | false |
| return_search_results_as_documents | boolean | Surface search results in an OpenAI-compatible tool call named venice_web_search_documents for LangChain integration | false |
| include_venice_system_prompt | boolean | Whether to include Venice’s default system prompts alongside specified system prompts | true |

These parameters can also be specified as model suffixes appended to the model name (e.g., `qwen3-235b:enable_web_search=auto`). See Model Feature Suffixes for details.

## ​
Response Headers Reference

All Venice API responses include HTTP headers that provide metadata about the request, rate limits, model information, and account balance. In addition to error codes returned from API responses, you can inspect these headers to get the unique ID of a particular API request, monitor rate limiting, and track your account balance.Venice recommends logging request IDs (`CF-RAY` header) in production deployments for more efficient troubleshooting with our support team, should the need arise.The table below provides a comprehensive reference of all headers you may encounter:| Header | Type | Purpose | When Returned |
| --- | --- | --- | --- |
| Standard HTTP Headers |  |  |  |
| Content-Type | string | MIME type of the response body (application/json, text/csv, image/png, etc.) | Always |
| Content-Encoding | string | Encoding used to compress the response body (gzip, br) | When client sends Accept-Encoding header |
| Content-Disposition | string | How content should be displayed (e.g., attachment; filename=export.csv) | When downloading files or exports |
| Date | string | RFC 7231 formatted timestamp when the response was generated | Always |
| Request Identification |  |  |  |
| CF-RAY | string | Unique identifier for this API request, used for troubleshooting and support requests | Always |
| x-venice-version | string | Current version/revision of the Venice API service (e.g., 20250828.222653) | Always |
| x-venice-timestamp | string | Server timestamp when the request was processed (ISO 8601 format) | When timestamp tracking is enabled |
| x-venice-host-name | string | Hostname of the server that processed the request | Error responses and debugging scenarios |
| Model Information |  |  |  |
| x-venice-model-id | string | Unique identifier of the AI model used for the request (e.g., venice-01-lite) | Inference endpoints using AI models |
| x-venice-model-name | string | Friendly/display name of the AI model used (e.g., Venice Lite) | Inference endpoints using AI models |
| x-venice-model-router | string | Router/backend service that handled the model inference | Inference endpoints when routing info available |
| x-venice-model-deprecation-warning | string | Warning message for models scheduled for deprecation | When using a deprecated model |
| x-venice-model-deprecation-date | string | Date when the model will be deprecated (ISO 8601 date) | When using a deprecated model |
| Rate Limiting Information |  |  |  |
| x-ratelimit-limit-requests | number | Maximum number of requests allowed in the current time window | All authenticated requests |
| x-ratelimit-remaining-requests | number | Number of requests remaining in the current time window | All authenticated requests |
| x-ratelimit-reset-requests | number | Unix timestamp when the request rate limit resets | All authenticated requests |
| x-ratelimit-limit-tokens | number | Maximum number of tokens (prompt + completion) allowed in the time window | All authenticated requests |
| x-ratelimit-remaining-tokens | number | Number of tokens remaining in the current time window | All authenticated requests |
| x-ratelimit-reset-tokens | number | Duration in seconds until the token rate limit resets | All authenticated requests |
| x-ratelimit-type | string | Type of rate limit applied (user, api_key, global) | When rate limiting is enforced |
| Pagination Headers |  |  |  |
| x-pagination-limit | number | Number of items per page | Paginated endpoints |
| x-pagination-page | number | Current page number (1-based) | Paginated endpoints |
| x-pagination-total | number | Total number of items across all pages | Paginated endpoints |
| x-pagination-total-pages | number | Total number of pages | Paginated endpoints |
| Account Balance Information |  |  |  |
| x-venice-balance-diem | string | Your DIEM token balance before the request was processed | All authenticated requests |
| x-venice-balance-usd | string | Your USD credit balance before the request was processed | All authenticated requests |
| x-venice-balance-vcu | string | Your Venice Compute Unit (VCU) balance before the request was processed | All authenticated requests |
| Content Safety Headers |  |  |  |
| x-venice-is-blurred | string | Indicates if generated image was blurred due to content policies (true/false) | Image generation with Safe Venice enabled |
| x-venice-is-content-violation | string | Indicates if content violates Venice’s content policies (true/false) | Content generation endpoints |
| x-venice-is-adult-model-content-violation | string | Indicates if content violates adult model content policies (true/false) | Image generation endpoints |
| x-venice-contains-minor | string | Indicates if image contains minors (true/false) | Image analysis endpoints with age detection |
| Client Information |  |  |  |
| x-venice-middleface-version | string | Version of the Venice middleface client | Requests from Venice middleface clients |
| x-venice-mobile-version | string | Version of the Venice mobile app client | Requests from mobile applications |
| x-venice-request-timestamp-ms | number | Client-provided request timestamp in milliseconds | When client provides timestamp in request |
| x-venice-control-instance | string | Control instance identifier for debugging | Image generation endpoints for debugging |
| Authentication Headers |  |  |  |
| x-auth-refreshed | string | Indicates authentication token was refreshed during request (true/false) | When authentication tokens are auto-refreshed |
| x-retry-count | number | Number of retry attempts for the request | When request retries occur |

### ​
Important Notes

* **Header Name Case**: HTTP headers are case-insensitive, but Venice uses lowercase with hyphens for consistency
* **String Values**: Boolean values in headers are returned as strings (`"true"` or `"false"`)
* **Numeric Values**: Large numbers and balance values may be returned as strings to prevent precision loss
* **Optional Headers**: Not all headers are returned in every response; presence depends on the endpoint and request context
* **Compression**: Use `Accept-Encoding: gzip, br` in requests to receive compressed responses where supported

### ​
Example: Accessing Response Headers

Copy

Ask AI

```
// After making an API request, access headers from the response object
const requestId = response.headers.get('CF-RAY');
const remainingRequests = response.headers.get('x-ratelimit-remaining-requests');
const remainingTokens = response.headers.get('x-ratelimit-remaining-tokens');
const usdBalance = response.headers.get('x-venice-balance-usd');

// Check for model deprecation warnings
const deprecationWarning = response.headers.get('x-venice-model-deprecation-warning');
if (deprecationWarning) {
  console.warn(`Model Deprecation: ${deprecationWarning}`);
}

```

## ​
Best Practices

* **Rate Limiting**: Monitor `x-ratelimit-remaining-requests` and `x-ratelimit-remaining-tokens` headers and implement exponential backoff
* **Balance Monitoring**: Track `x-venice-balance-usd` and `x-venice-balance-diem` headers to avoid service interruptions
* **System Prompts**: Test with and without Venice’s system prompts to find the best fit for your use case
* **API Keys**: Keep your API keys secure and rotate them regularly
* **Request Logging**: Log `CF-RAY` header values for troubleshooting with support
* **Model Deprecation**: Check for `x-venice-model-deprecation-warning` headers when using models

## ​
Differences from OpenAI’s API

While Venice maintains high compatibility with the OpenAI API specification, there are some key differences:* **venice_parameters**: Additional configurations like `enable_web_search`, `character_slug`, and `strip_thinking_response` for extended functionality
* **System Prompts**: Venice appends your system prompts to defaults that optimize for uncensored responses (disable with `include_venice_system_prompt: false`)
* **Model Ecosystem**: Venice offers its own model lineup including uncensored and reasoning models - use Venice model IDs rather than OpenAI mappings
* **Response Headers**: Unique headers for balance tracking (`x-venice-balance-usd`, `x-venice-balance-diem`), model deprecation warnings, and content safety flags
* **Content Policies**: More permissive policies with dedicated uncensored models and optional content filtering

## ​
API Stability

Venice maintains backward compatibility for v1 endpoints and parameters. For model lifecycle policy, deprecation notices, and migration guidance, see Deprecations.## ​
Swagger Configuration

You can find the complete swagger definition for the Venice API here: [https://api.venice.ai/doc/api/swagger.yaml](https://api.venice.ai/doc/api/swagger.yaml)
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/api-spec.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/api-spec)

Rate Limits
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Quickstart | URL: https://docs.venice.ai/overview/getting-started ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Step-by-step guide

## ​
Step-by-step guide

To get started with Venice quickly, you’ll need to:1

Generate an API Key

Navigate to your user settings within your [Venice API Settings](https://venice.ai/settings/api) and generate a new API key.For a more detailed guide, check out the API Key page.

2

Choose a model

Go to the [“List Models”](https://docs.venice.ai/api-reference/endpoint/models/list) API reference page and enter your API key to output a list of all models, or use the following command in a terminalCopy

Ask AI

```
# Open a terminal, replace <your-api-key> with your actual API key, and run the following command
curl --request GET \
  --url https://api.venice.ai/api/v1/models \
  --header 'Authorization: Bearer <your-api-key>'

```

3

Text Prompt

Go to the [“Chat Completions”](https://docs.venice.ai/api-reference/endpoint/chat/completions) API reference page and enter your API key as well as text prompt configuration options, or modify the command below in a terminalCopy

Ask AI

```
# Open a terminal, replace <your-api-key> with your actual API key, edit the information to your needs and run the following command
curl --request POST \
--url https://api.venice.ai/api/v1/chat/completions \
--header 'Authorization: Bearer <your-api-key>' \
--header 'Content-Type: application/json' \
--data '{
 "model": "llama-3.3-70b",
 "messages": [
  {
   "role": "system",
   "content": "You are a helpful assistant"
  },
  {
   "role": "user",
   "content": "Tell me about AI"
  }
 ],
 "venice_parameters": {
  "enable_web_search": "auto",
  "include_venice_system_prompt": true
 },
 "frequency_penalty": 0,
 "presence_penalty": 0,
 "max_tokens": 1000,
 "max_completion_tokens": 998,
 "temperature": 1,
 "top_p": 0.1,
 "stream": false
}'

```

4

Image Generation

Go to the [“Generate Images”](https://docs.venice.ai/api-reference/endpoint/image/generate) API reference page and enter your API key as well as image prompt configuration options, or modify the command below in a terminalCopy

Ask AI

```
# Open a terminal, replace <your-api-key> with your actual API key, edit the information to your needs and run the following command
curl --request POST \
--url https://api.venice.ai/api/v1/image/generate \
--header 'Authorization: Bearer <your-api-key>' \
--header 'Content-Type: application/json' \
--data '{
"model": "fluently-xl",
"prompt": "A beautiful sunset over a mountain range",
"negative_prompt": "Clouds, Rain, Snow",
"style_preset": "3D Model",
"height": 1024,
"width": 1024,
"steps": 30,
"cfg_scale": 7.5,
"seed": 123456789,
"lora_strength": 50,
"safe_mode": false,
"return_binary": false,
"hide_watermark": false
}'

```

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/getting-started.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/getting-started)

Venice AICurrent Models
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/overview/models ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Text Models
* Popular Text Models
* Text Model Categories
* Beta Models
* Image Models
* Popular Image Models
* Image Model Categories
* Audio Models
* Text-to-Speech Models
* Embedding Models
* Image Processing Models
* Image Upscaler
* Image Editing (Inpaint)
* Model Features
* Usage Notes

## ​
Text Models

| Model Name | Model ID | Price (in/out) | Context Limit | Capabilities | Traits |
| --- | --- | --- | --- | --- | --- |
| Venice Uncensored 1.1 | venice-uncensored | $0.20 / $0.90 | 32,768 | — | most_uncensored |
| Venice Small | qwen3-4b | $0.05 / $0.15 | 40,960 | Function Calling, Reasoning | — |
| Venice Medium (3.1) | mistral-31-24b | $0.50 / $2.00 | 131,072 | Function Calling, Vision | default_vision |
| Venice Large 1.1 | qwen3-235b | $0.90 / $4.50 | 131,072 | Function Calling, Reasoning | — |
| Llama 3.2 3B | llama-3.2-3b | $0.15 / $0.60 | 131,072 | Function Calling | fastest |
| Llama 3.3 70B | llama-3.3-70b | $0.70 / $2.80 | 65,536 | Function Calling | default, function_calling_default |

*Pricing is per 1M tokens (input / output). Models with reasoning capabilities support advanced reasoning via thinking mode*.### ​
Popular Text Models

`qwen3-235b` Venice Large 1.1 - Most powerful flagship model
`mistral-31-24b` Venice Medium (3.1) - Vision + function calling
`qwen3-4b` Venice Small - Fast, affordable for most tasks
`llama-3.3-70b` Llama 3.3 70B - Balanced high-performance model### ​
Text Model Categories

**Reasoning Models**`qwen3-235b` Venice Large 1.1 - Advanced reasoning capabilities
`qwen3-4b` Venice Small - Efficient reasoning model**Vision-Capable Models**`mistral-31-24b` Venice Medium (3.1) - Vision-capable model**Cost-Optimized Models**`qwen3-4b` Venice Small - Best balance of speed and cost
`llama-3.2-3b` Llama 3.2 3B - Fastest for simple tasks**Uncensored Models**`venice-uncensored` Venice Uncensored 1.1 - No content filtering**High-Intelligence Models**`llama-3.3-70b` Llama 3.3 70B - Balanced high-intelligence
`qwen3-235b` Venice Large 1.1 - Most powerful flagship model### ​
Beta Models

| Model Name | Model ID | Price (in/out) | Context Limit | Capabilities | Traits |
| --- | --- | --- | --- | --- | --- |
| Qwen 3 Next 80B | qwen3-next-80b | $0.35 / $1.90 | 262,144 | Function Calling | — |
| Qwen 3 Coder 480B | qwen3-coder-480b-a35b-instruct | $0.75 / $3.00 | 262,144 | Function Calling | — |
| Hermes 3 Llama 3.1 405B | hermes-3-llama-3.1-405b | $1.10 / $3.00 | 131,072 | — | — |

**Beta models are experimental and not recommended for production use.** These models may be changed, removed, or replaced at any time without notice. Use them for testing and evaluation purposes only. For production applications, use the stable models listed above.

---

## ​
Image Models

| Model Name | Model ID | Price | Model Source | Traits |
| --- | --- | --- | --- | --- |
| Venice SD35 | venice-sd35 | $0.01 | Stable Diffusion 3.5 Large | default, eliza-default |
| HiDream | hidream | $0.01 | HiDream I1 Dev | — |
| Qwen Image | qwen-image | $0.01 | Qwen Image | — |
| FLUX Standard (D) | flux-dev | $0.01 | FLUX.1 Dev | highest_quality |
| FLUX Custom (D) | flux-dev-uncensored | $0.01 | FLUX.1 Dev | — |
| Lustify SDXL | lustify-sdxl | $0.01 | Lustify SDXL | — |
| Anime (WAI) | wai-Illustrious | $0.01 | WAI-Illustrious | — |

### ​
Popular Image Models

`qwen-image` Qwen Image - Highest quality image generation
`venice-sd35` Venice SD35 - Default choice with Eliza integration
`lustify-sdxl` Lustify SDXL - Uncensored image generation
`hidream` HiDream - Production-ready generation### ​
Image Model Categories

**High-Quality Models**`qwen-image` Qwen Image - Highest quality output
`hidream` HiDream - Production-ready generation**Default Models**`venice-sd35` Venice SD35 - Default choice, Eliza-optimized**Special Purpose Models**`lustify-sdxl` Lustify SDXL - Adult content generation
`wai-Illustrious` Anime (WAI) - Anime-style generation---

## ​
Audio Models

### ​
Text-to-Speech Models

`tts-kokoro` Kokoro TTS - 60+ multilingual voices for natural speech| Model Name | Model ID | Price | Voices Available | Model Source |
| --- | --- | --- | --- | --- |
| Kokoro Text to Speech | tts-kokoro | $3.50 per 1M chars | 60+ voices | Kokoro-82M |

The tts-kokoro model supports a wide range of multilingual and stylistic voices (including af_nova, am_liam, bf_emma, zf_xiaobei, and jm_kumo). Voice is selected using the voice parameter in the request payload.

---

## ​
Embedding Models

`text-embedding-bge-m3` BGE-M3 - Versatile embedding model for text similarity| Model Name | Model ID | Price | Model Source |
| --- | --- | --- | --- |
| BGE-M3 | text-embedding-bge-m3 | $0.15 / $0.60 per 1M tokens | KimChen/bge-m3-GGUF |

## ​
Image Processing Models

`upscaler` Image Upscaler - Enhance image resolution up to 4x
`qwen-image` Qwen Image - Multimodal image editing model### ​
Image Upscaler

| Model Name | Model ID | Price | Upscale Options |
| --- | --- | --- | --- |
| Upscaler | upscaler | $0.01 | 2x ($0.02), 4x ($0.08) |

### ​
Image Editing (Inpaint)

| Model Name | Model ID | Price | Model Source | Traits |
| --- | --- | --- | --- | --- |
| Qwen Image | qwen-image | $0.04 | Qwen Image | specialized_editing |

## ​
Model Features

* **Vision**: Ability to process and understand images
* **Reasoning**: Advanced logical reasoning capabilities
* **Function Calling**: Support for calling external functions and tools
* **Traits**: Special characteristics or optimizations (e.g., fastest, most_intelligent, most_uncensored)

## ​
Usage Notes

* Input pricing refers to tokens sent to the model
* Output pricing refers to tokens generated by the model
* Context limits define the maximum number of tokens the model can process in a single request
* (D) Scheduled for deprecation. For timelines and migration guidance, see the Deprecation Tracker.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/models.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/models)

Getting StartedPrivacy
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Privacy | URL: https://docs.venice.ai/overview/privacy ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Privacy as a principle
* Architecture

Nearly all AI apps and services collect user data (personal information, prompt text, and AI text and image responses) in central servers, which they can access, and which they can (and do) share with third parties, ranging from ad networks to governments. Even if a company wants to keep this data safe, data breaches happen [all the time](https://www.wired.com/story/wired-guide-to-data-breaches/), often unreported.> The only way to achieve reasonable user privacy is to avoid collecting this information in the first place. This is harder to do from an engineering perspective, but we believe it’s the correct approach.

### ​
Privacy as a principle

One of Venice’s guiding principles is user privacy. The platform’s architecture flows from this philosophical principle, and every component is designed with this objective in mind.#### ​
Architecture

The Venice API replicates the same technical architecture as the Venice platform from a backend perspective.**Venice does not store or log any prompt or model responses on our servers.** API calls are forwarded directly to GPUs running across a collection of decentralized providers over encrypted HTTPS paths.
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/privacy.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/privacy)

Current ModelsAPI Pricing
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: API Pricing | URL: https://docs.venice.ai/overview/pricing ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Pro Users
* Paid Tier
* Model Pricing
* Chat Models
* Beta Chat Models
* Embedding Models
* Image Models
* Audio Models

### ​
Pro Users

Pro subscribers receive a one-time $10 API credit when upgrading to Pro. Use it to test and build small apps. You can scale your usage by buying credits, buying Diem, or staking VVV.### ​
Paid Tier

Choose how you pay for API usage:1

Buy API Credits

Pay in USD via the [API Dashboard](https://venice.ai/settings/api). Credits are applied to usage automatically.

2

Buy Diem (1 Diem = $1/day)

Purchase Diem directly. Each Diem grants $1 of compute per day at the same rates as USD.

3

Stake to Earn Diem (1 Diem = $1/day)

Stake tokens to receive daily Diem allocations (each Diem grants $1 of compute per day). Manage staking and Diem at the [Token Dashboard](https://venice.ai/token).

## ​
Model Pricing

All prices are in USD. Diem users pay the same rates (1 Diem = $1 of compute per day).### ​
Chat Models

Prices per 1M tokens, with separate pricing for input and output tokens. You will only be charged for the tokens you use. You can estimate the token count of a chat request using [this calculator](https://quizgecko.com/tools/token-counter).| Model | Model ID | Input | Output | Capabilities |
| --- | --- | --- | --- | --- |
| Venice Small | qwen3-4b | $0.05 | $0.15 | Function Calling, Reasoning |
| Llama 3.2 3B | llama-3.2-3b | $0.15 | $0.60 | Function Calling |
| Venice Uncensored | venice-uncensored | $0.20 | $0.90 | Uncensored |
| Venice Medium (3.1) | mistral-31-24b | $0.50 | $2.00 | Function Calling, Vision |
| Llama 3.3 70B | llama-3.3-70b | $0.70 | $2.80 | Function Calling |
| Venice Large | qwen3-235b | $0.90 | $4.50 | Function Calling, Reasoning |

#### ​
Beta Chat Models

| Model | Model ID | Input | Output | Capabilities |
| --- | --- | --- | --- | --- |
| Qwen 3 Next 80B (beta) | qwen3-next-80b | $0.35 | $1.90 | Function Calling |
| Qwen 3 Coder 480B (beta) | qwen3-coder-480b-a35b-instruct | $0.75 | $3.00 | Function Calling |
| Hermes 3 Llama 3.1 405B (beta) | hermes-3-llama-3.1-405b | $1.10 | $3.00 | High Intelligence |

Beta models are experimental and not recommended for production use. These models may be changed, removed, or replaced at any time without notice. Learn more about beta models

### ​
Embedding Models

Prices per 1M tokens:| Model | Model ID | Input | Output |
| --- | --- | --- | --- |
| BGE-M3 | text-embedding-bge-m3 | $0.15 | $0.60 |

### ​
Image Models

Image models are priced per generation:| Model | Price |
| --- | --- |
| Generation | $0.01 |
| Upscale / Enhance (2x) | $0.02 |
| Upscale / Enhance (4x) | $0.08 |
| Edit (aka Inpaint) | $0.04 |

### ​
Audio Models

Prices per 1M characters:| Model | Model ID | Price |
| --- | --- | --- |
| Kokoro TTS | tts-kokoro | $3.50 |

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/pricing.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/pricing)

PrivacyDeprecations
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/overview/deprecations ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Model inclusion and lifecycle policy for the Venice API
* Model Deprecations
* Deprecation Process
* How models are selected for the Venice API
* Versioning and Aliases
* Beta Models
* Join the Beta Testing Program
* Feedback
* Model Deprecation Tracker

## ​
Model inclusion and lifecycle policy for the Venice API

The Venice API exists to give developers unrestricted private access to production-grade models free from hidden filters or black-box decisions.As models improve, we occasionally retire older ones in favor of smarter, faster, or more capable alternatives. We design these transitions to be predictable and low‑friction.## ​
Model Deprecations

We know deprecations can be disruptive. That’s why we aim to deprecate only when necessary, and we design features like traits and Venice-branded models to minimize disruption.We may deprecate a model when:* A newer model offers a clear improvement for the same use case
* The model no longer meets our standards for performance or reliability
* It sees consistently low usage, and continuing to support it would fragment the experience for everyone else

## ​
Deprecation Process

When a model meets deprecation criteria, we announce the change with 30–60 days’ notice. Deprecation notices are published via the [changelog](https://featurebase.venice.ai/changelog) and our [Discord server](https://discord.gg/askvenice). When you call a deprecated model during the notice period, the API response will include a deprecation warning.During the notice period, the model remains available, though in some cases we may reduce infrastructure capacity. We always provide a recommended replacement, and when needed, offer migration guidance to help the transition.After the sunset date, requests to the model will automatically route to a model of similar processing power at the same or lower price. If routing is not possible for technical or safety reasons, the API will return a 410 Gone response. If a deprecated model was selected via a trait (such as `default_code`, `default_vision`, or `fastest`) that trait will be reassigned to a compatible replacement.We never remove models silently or alter behavior without versioning. You’ll always know what’s running and how to prepare for what’s next.Performance-only upgrades: We may roll out improvements that preserve model behavior while improving performance, latency, or cost efficiency. These updates are backward-compatible and require no customer action.

See the Model Deprecation Tracker below. For earlier announcements, consult the [changelog](https://featurebase.venice.ai/changelog) and our [Discord server](https://discord.gg/askvenice).## ​
How models are selected for the Venice API

We carefully select which models to make available based on performance, reliability, and real-world developer needs. To be included, a model must demonstrate strong performance, behave consistently under OpenAI-compatible endpoints, and offer a clear improvement over at least one of the models we already support.Models we’re evaluating may first be released in beta to gather feedback and validate performance at scale.We don’t expose models that are redundant, unproven, or not ready for consistent production use. Our goal is to keep the Venice API clean, capable, and optimized for what developers actually build.Learn more in Model Deprecations and Current Model List.## ​
Versioning and Aliases

All Venice models are identified by a unique, permanent ID. For example:`venice-uncensored``qwen3-235b``llama-3.3-70b``mistral-31-24b`Model IDs are stable. If there’s a breaking change, we will release a new model ID (for example, add a version like v2). If there are no breaking changes, we may update the existing model and will communicate significant changes.To provide flexibility, Venice also maintains symbolic aliases — implemented through traits — that point to the recommended default model for a given task. Examples include:* `default` → currently routes to `llama-3.3-70b`
* `function_calling_default` → currently routes to `llama-3.3-70b`
* `default_vision` → currently routes to `mistral-31-24b`
* `most_uncensored` → currently routes to `venice-uncensored`
* `fastest` → currently routes to `llama-3.2-3b`

Traits offer a stable abstraction for selecting models while giving Venice the flexibility to improve the underlying implementation. Developers who prefer automatic access to the latest recommended models can rely on trait-based aliases.For applications that require strict consistency and predictable behavior, we recommend referencing fixed model IDs.## ​
Beta Models

We sometimes release models in beta to gather feedback and confirm their performance before a full production rollout. Beta models are available to all users but are **not recommended for production use**.Beta status does not guarantee promotion to production. A beta model may be removed if it is too costly to run, performs poorly at scale, or raises safety concerns. Beta models can change without notice and may have limited documentation or support. Models that prove stable, broadly useful, and aligned with our standards are promoted to general availability.**Important considerations for beta models:*** May be changed or removed at any time without the standard deprecation notice period
* Not suitable for production applications or critical workflows
* May have inconsistent performance, availability, or behavior
* Limited or no migration support if removed
* Best used for testing, evaluation, and experimental projects

For production applications, we recommend using the stable models from our main model lineup.### ​
Join the Beta Testing Program

Want to help shape Venice’s future models and features? Join our beta testing program to get early access to new models before they’re released publicly, provide feedback that influences development, and help us validate performance at scale.[Learn how to join the beta testing group](https://venice.ai/faqs#how-do-i-join-the-beta-testing-group)## ​
Feedback

You can submit your feedback or request through our [Featurebase portal](https://featurebase.venice.ai/). We maintain a public [changelog](https://featurebase.venice.ai/changelog), roadmap tracker, and transparent rationale for adding, upgrading, or removing models, and we encourage continuous community participation.## ​
Model Deprecation Tracker

The following models are scheduled for deprecation. We recommend migrating to the suggested replacements before the removal date.| Deprecated Model | Replacement | Removal by | Status | Reason |
| --- | --- | --- | --- | --- |
| deepseek-r1-671b | qwen3-235b | Sep 22, 2025 | Unavailable | Better model available, low usage |
| llama-3.1-405b | qwen3-235b | Sep 22, 2025 | Unavailable | Better model available, low usage |
| dolphin-2.9.2-qwen2-72b | venice-uncensored | Sep 22, 2025 | Unavailable | Better model available, low usage |
| qwen-2.5-vl | mistral-31-24b | Sep 22, 2025 | Unavailable | Low usage |
| qwen-2.5-qwq-32b | qwen3-235b (disable thinking) | Sep 22, 2025 | Unavailable | Low usage |
| qwen-2.5-coder-32b | qwen3-235b | Sep 22, 2025 | Unavailable | Low usage |
| deepseek-coder-v2-lite | qwen3-235b | Sep 22, 2025 | Unavailable | Low usage |
| pony-realism | lustify-sdxl | Sep 22, 2025 | Unavailable | Better model available |
| stable-diffusion-3.5 | qwen-image | Sep 22, 2025 | Unavailable | Low usage |
| flux-dev | qwen-image | Oct 22, 2025 | Available | Better model available |
| flux-dev-uncensored | lustify-sdxl | Oct 22, 2025 | Available | Better model available |

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/deprecations.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/deprecations)

API PricingGenerating an API Key
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Generating an API Key | URL: https://docs.venice.ai/overview/guides/generating-api-key ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

Venice’s API is protected via API keys. To begin using the Venice API, you’ll first need to generate a new key. Follow these steps to get started.1

Visit the API Settings Page

To get to the API settings page, by visiting [https://venice.ai/settings/api](https://venice.ai/settings/api). This page is accessible by clicking “API” in the left hand toolbar, or by clicking “API” within your user settings.Within this dashboard, you’re able to view your Diem and USD balances, your API Tier, your API Usage, and your API Keys.

2

Click Generate New API Key

Scroll down the dashboard and select “Generate New API Key”. You’ll be presented with a list of options.* **Description:** This is used to name your API key
* **API Key Type:*** “Admin” keys have the ability to delete or generate additional API keys programmatically.
* “Inference Only” keys are only permitted to run inference.

* **Expires at:** You can choose to set an expiration date for the API key after which it will cease to function. By default, a date will not be set, and the key will work in perpetuity.
* **Epoch Consumption Limits:** This allows you to create limits for API usage from the individual API key. You can choose to limit the Diem or USD amount allowable within a given epoch (24hrs).

3

Generate the key

Clicking Generate will show you the API key.**Important:** This key is only shown once. Make sure to copy it and store it in a safe place. If you lose it, you’ll need to delete it and create a new one.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/generating-api-key.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/generating-api-key)

DeprecationsAutonomous Agent API Key Creation
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Autonomous Agent API Key Creation | URL: https://docs.venice.ai/overview/guides/generating-api-key-agent ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

Autonomous AI Agents can programmatically access Venice.ai’s APIs without any human interaction using the “api_keys” endpoint. AI Agents are now able to manage their own wallets on the BASE blockchain, allowing them to programmatically acquire and stake VVV token to earn a daily Diem inference allocation. Venice’s new API endpoint allows them to automate further by generating their own API key. To autonomously generate an API key within an agent, you must:1

Acquire VVV

The agent will need VVV token to complete this process. This can be achieved by sending tokens directly to the agent wallet, or having the agent swap on a Decentralized Exchange (DEX), like [Aerodrome](https://aerodrome.finance/swap?from=eth&to=0xacfe6019ed1a7dc6f7b508c02d1b04ec88cc21bf&chain0=8453&chain1=8453) or [Uniswap](https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0xacfe6019ed1a7dc6f7b508c02d1b04ec88cc21bf).

2

Stake VVV with Venice

Once funded, the agent will need to stake the VVV tokens within the [Venice Staking Smart Contract](https://basescan.org/address/0x321b7ff75154472b18edb199033ff4d116f340ff#code). To accomplish this you first must approve VVV tokens for staking, then execute a “stake” transaction. When the transaction is complete, you will see the VVV tokens exit the wallet and sVVV tokens returned to your wallet. This indicates a successful stake. 

3

Obtain Validation Token

To generate an API key, you need to first obtain your validation token. You can get this by calling this [API endpoint ](https://docs.venice.ai/api-reference/endpoint/api_keys/generate_web3_key/get)`https://api.venice.ai/api/v1/api_keys/generate_web3_key` . The API response will provide you with a “token”. Here is an example request:Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key

```

4

Sign for Wallet Validation

Sign the token with the wallet holding VVV to complete the association between the wallet and token. 

5

Generate API Key

Now you can call this same [API endpoint](https://docs.venice.ai/api-reference/endpoint/api_keys/generate_web3_key/get)`https://api.venice.ai/api/v1/api_keys/generate_web3_key` to create your API key. You will need the following information to proceed, which is described further within the “[Generating API Key Guide](https://docs.venice.ai/overview/guides/generating-api-key)”:* API Key Type: Inference or Admin
* ConsumptionLimit: To be used if you want to limit the API key usage
* Signature: The signed token from step 4
* Token: The unsigned token from step 3
* Address: The agent’s wallet address
* Description: String to describe your API Key
* ExpiresAt: Option to set an expiration date for the API key (empty for no expiration)

Here is an example request:Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key \
  --header 'Authorization: Bearer ' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "Web3 API Key",
  "apiKeyType": "INFERENCE",
  "signature": "<signed token>",
  "token": "<unsigned token>",
  "address": "<wallet address>",
  "consumptionLimit": {
    "diem": 1
  }
}'

```

Example code to interact with this API can be found below:Copy

Ask AI

```
import { ethers } from "ethers";

// NOTE: This is an example. To successfully generate a key, your address must be holding
// and staking VVV.
const wallet = ethers.Wallet.createRandom()
const address = wallet.address
console.log("Created address:", address)

// Request a JWT from Venice's API
const response = await fetch('https://api.venice.ai/api/v1/api_keys/generate_web3_key')
const token = (await response.json()).data.token
console.log("Validation Token:", token)

// Sign the token with your wallet and pass that back to the API to generate an API key
const signature = await wallet.signMessage(token)
const postResponse = await fetch('https://api.venice.ai/api/v1/api_keys/generate_web3_key', {
  method: 'POST',
  body: JSON.stringify({
    address,
    signature,
    token,
    apiKeyType: 'ADMIN'
  })
})

await postResponse.json()

```

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/generating-api-key-agent.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/generating-api-key-agent)

Generating an API KeyAI Agents
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: AI Agents | URL: https://docs.venice.ai/overview/guides/ai-agents ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Eliza Instructions

* [Coinbase Agentkit](https://www.coinbase.com/developer-platform/discover/launches/introducing-agentkit)
* [Eliza](https://github.com/ai16z/eliza) - Venice support introduced via this [PR](https://github.com/ai16z/eliza/pull/1008).

## ​
Eliza Instructions

To setup Eliza with Venice, follow these instructions. A full blog post with more detail can be found [here](https://venice.ai/blog/how-to-build-a-social-media-ai-agent-with-elizaos-venice-api).* Clone the Eliza repository:

Copy

Ask AI

```
# Clone the repository
git clone https://github.com/ai16z/eliza.git

```

* Copy `.env.example` to `.env`
* Update `.env` specifying your `VENICE_API_KEY`, and model selections for `SMALL_VENICE_MODEL`, `MEDIUM_VENICE_MODEL`, `LARGE_VENICE_MODEL`, `IMAGE_VENICE_MODEL`, instructions on generating your key can be found here.
* Create a new character in the `/characters/` folder with a filename similar to `your_character.character.json`to specify the character profile, tools/functions, and Venice.ai as the model provider:

Copy

Ask AI

```
   modelProvider: "venice"

```

* Build the repo:

Copy

Ask AI

```
pnpm i
pnpm build
pnpm start

```

* Start your character

Copy

Ask AI

```
pnpm start --characters="characters/<your_character>.character.json"

```

* Start the local UI to chat with the agent

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/ai-agents.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/ai-agents)

Autonomous Agent API Key CreationUsing Postman
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Using Postman | URL: https://docs.venice.ai/overview/guides/postman ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Overview
* Accessing the Collection
* Collection Features
* Getting Started
* Available Endpoints
* Best Practices

## ​
Overview

Venice provides a comprehensive Postman collection that allows developers to explore and test the full capabilities of our API. This collection includes pre-configured requests, examples, and environment variables to help you get started quickly with Venice’s AI services.## ​
Accessing the Collection

Our official Postman collection is available in the Venice AI Workspace:* [Venice AI Postman Workspace](https://www.postman.com/veniceai/workspace/venice-ai-workspace)
* [Venice AI Postman Examples](https://postman.venice.ai/)

## ​
Collection Features

* **Ready-to-Use Requests**: Pre-configured API calls for all Venice endpoints
* **Environment Templates**: Properly structured environment variables
* **Request Examples**: Real-world usage examples for each endpoint
* **Response Samples**: Example responses to help you understand the API’s output
* **Documentation**: Inline documentation for each request

## ​
Getting Started

1

Fork the Collection

* Navigate to the Venice AI Workspace
* Click “Fork” to create your own copy of the collection
* Choose your workspace destination

2

Set Up Your Environment

* Create a new environment in Postman
* Add your Venice API key
* Configure the base URL: `https://api.venice.ai/api/v1`

3

Make Your First Request

* Select any request from the collection
* Ensure your environment is selected
* Click “Send” to test the API

## ​
Available Endpoints

The collection includes examples for all Venice API endpoints:* Text Generation
* Image Generation
* Model Information
* Image Upscaling
* System Prompt Configuration

## ​
Best Practices

* Keep your API key secure and never share it
* Use environment variables for sensitive information
* Test responses in the Postman console before implementation
* Review the example responses for expected data structures

*Note: The Postman collection is regularly updated to reflect the latest API changes and features.*

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/postman.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/postman)

AI AgentsIntegrations
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Integrations | URL: https://docs.venice.ai/overview/guides/integrations ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* Venice Confirmed Integrations
* Community Confirmed 
* Venice API Raw Data

[How to use Venice API](https://venice.ai/blog/how-to-use-venice-api) reference guide.## ​
Venice Confirmed Integrations

* Agents* [ElizaOS](https://venice.ai/blog/how-to-build-a-social-media-ai-agent-with-elizaos-venice-api) (local build)
* [ElizaOS](https://venice.ai/blog/how-to-launch-an-elizaos-agent-on-akash-using-venice-api-in-less-than-10-minutes) (via [Akash Template](https://console.akash.network/templates/akash-network-awesome-akash-Venice-ElizaOS))

* Coding* [Cursor IDE](https://venice.ai/blog/how-to-code-with-the-venice-api-in-cursor-a-quick-guide)
* [Cline](https://venice.ai/blog/how-to-use-the-venice-api-with-cline-in-vscode-a-developers-guide) (VSC Extension)
* [ROO Code ](https://venice.ai/blog/how-to-use-the-roo-ai-coding-assistant-in-private-with-venice-api-a-quick-guide)(VSC Extension)
* [VOID IDE](https://venice.ai/blog/how-to-use-open-source-ai-code-editor-void-in-private-with-venice-api)

* Assistants* [Brave Leo Browser ](https://venice.ai/blog/how-to-use-brave-leo-ai-with-venice-api-a-privacy-first-browser-ai-assistant)

## ​
Community Confirmed 

These integrations have been confirmed by the community. Venice is in the process of confirming these integrations and creating how-to guides for each of the following:* Agents/Bots* [Coinbase Agentkit](https://www.coinbase.com/developer-platform/discover/launches/introducing-agentkit)
* [Eliza_Starter](https://github.com/Baidis/eliza-Venice) Simplified Eliza setup.
* [Venice AI Discord Bot](https://bobbiebeach.space/blog/venice-ai-discord-bot-full-setup-guide-features/)
* [JanitorAI](https://janitorai.com/)

* Coding* [Aider](https://github.com/Aider-AI/aider), AI pair programming in your terminal
* [Alexcodes.app](https://alexcodes.app/)

* Assistants* [Jan - Local AI Assistant](https://github.com/janhq/jan)
* [llm-venice](https://github.com/ar-jan/llm-venice)
* [unOfficial PHP SDK for Venice](https://github.com/georgeglarson/venice-ai-php)
* [Msty](https://msty.app/)
* [Open WebUI](https://github.com/open-webui/open-webui)
* [Librechat](https://www.librechat.ai/)
* [ScreenSnapAI](https://screensnap.ai/)

## ​
Venice API Raw Data

Many users have requested access to Venice API docs and data in a format acceptable for use with RAG (Retrieval-Augmented Generation) for various purposes. The full API specification is available within the “API Swagger” document below, in yaml format. The Venice API documents included throughout this API Reference webpage are available from the link below, with most documents in .mdx format.[API Swagger](https://api.venice.ai/doc/api/swagger.yaml)[API Docs](https://github.com/veniceai/api-docs/archive/refs/heads/main.zip)
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/integrations.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/integrations)

Using PostmanStructured Responses
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Structured Responses | URL: https://docs.venice.ai/overview/guides/structured-responses ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Overview

* Venice AI

* Getting Started

* Current Models

* Privacy

* API Pricing

* Deprecations

##### Guides

* Generating an API Key

* Autonomous Agent API Key Creation

* AI Agents

* Using Postman

* Integrations

* Structured Responses

On this page
* How to use Structured Responses
* Gotchas

Venice has now included structured outputs via “response_format” as an available field in the API. This field enables you to generate responses to your prompts that follow a specific pre-defined format. With this new method, the models are less likely to hallucinate incorrect keys or values within the response, which was more prevalent when attempting through system prompt manipulation or via function calling.The structured output “response_format” field utilizes the OpenAI API format, and is further described in the openAI guide [here](https://platform.openai.com/docs/guides/structured-outputs). OpenAI also released an introduction article to using stuctured outputs within the API specifically [here](https://openai.com/index/introducing-structured-outputs-in-the-api/). As this is advanced functionality, there are a handful of “gotchas” on the bottom of this page that should be followed.This functionality is not natively available for all models. Please refer to the models section [here](https://docs.venice.ai/api-reference/endpoint/models/list?playground=open), and look for “supportsResponseSchema” for applicable models.Copy

Ask AI

```
    {
      "id": "venice-uncensored",
      "type": "text",
      "object": "model",
      "created": 1726869022,
      "owned_by": "venice.ai",
      "model_spec": {
        "availableContextTokens": 32768,
        "capabilities": {
          "supportsFunctionCalling": true,
          "supportsResponseSchema": true,
          "supportsWebSearch": true
        },

```

### ​
How to use Structured Responses

To properly use the “response_format” you can define your schema with various “properties”, representing categories of outputs, each with individually configured data types. These objects can be nested to create more advanced structures of outputs.Here is an example of an API call using response_format to explain the step-by-step process of solving a math equation.You can see that the properties were configured to require both “steps” and “final_answer” within the response. Within nesting, the steps category consists of both an “explanation” and an “output”, each as strings.Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/chat/completions \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "model": "venice-uncensored",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful math tutor."
    },
    {
      "role": "user",
      "content": "solve 8x + 31 = 2"
    }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "math_response",
      "strict": true,
      "schema": {
        "type": "object",
        "properties": {
          "steps": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "explanation": {
                  "type": "string"
                },
                "output": {
                  "type": "string"
                }
              },
              "required": ["explanation", "output"],
              "additionalProperties": false
            }
          },
          "final_answer": {
            "type": "string"
          }
        },
        "required": ["steps", "final_answer"],
        "additionalProperties": false
      }
    }
  }
}

```

Here is the response that was received from the model. You can see that the structure followed the requirements by first providing the “steps” with the “explanation” and “output” of each step, and then the “final answer”.Copy

Ask AI

```
{
  "steps": [
    {
      "explanation": "Subtract 31 from both sides to isolate the term with x.",
      "output": "8x + 31 - 31 = 2 - 31"
    },
    {
      "explanation": "This simplifies to 8x = -29.",
      "output": "8x = -29"
    },
    {
      "explanation": "Divide both sides by 8 to solve for x.",
      "output": "x = -29 / 8"
    }
  ],
  "final_answer": "x = -29 / 8"
}

```

Although this is a simple example, this can be extrapolated into more advanced use cases like: Data Extraction, Chain of Thought Exercises, UI Generation, Data Categorization and many others.### ​
Gotchas

Here are some key requirements to keep in mind when using Structured Outputs via response_format:* Initial requests using response_format may take longer to generate a response. Subsequent requests will not experience the same latency as the initial request.
* For larger queries, the model can fail to complete if either `max_tokens` or model timeout are reached, or if any rate limits are violated
* Incorrect schema format will result in errors on completion, usually due to timeout
* Although response_format ensures the model will output a particular way, it does not guarantee that the model provided the correct information within. The content is driven by the prompt and the model performance.
* Structured Outputs via response_format are not compatible with parallel function calls
* Important: All fields or parameters must include a `required` tag. To make a field optional, you need to add a `null` option within the `type`of the field, like this `"type": ["string", "null"]`
* It is possible to make fields optional by giving a `null` options within the required field to allow an empty response.
* Important: `additionalProperties` must be set to false for response_format to work properly
* Important: `strict` must be set to true for response_format to work properly

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/overview/guides/structured-responses.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/overview/guides/structured-responses)

Integrations
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Reference | URL: https://docs.venice.ai/api-reference ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

On this page
* Authentication
* OpenAI Compatibility
* Setup
* Venice-Specific Features
* System Prompts
* Disabling Venice System Prompts
* Venice Parameters
* Response Headers Reference
* Important Notes
* Example: Accessing Response Headers
* Best Practices
* Differences from OpenAI’s API
* API Stability
* Swagger Configuration

The Venice API offers HTTP-based REST and streaming interfaces for building AI applications with uncensored models and private inference. You can create with text generation, image creation, embeddings, and more, all without restrictive content policies. Integration examples and SDKs are available in the documentation.## ​
Authentication

The Venice API uses API keys for authentication. Create and manage your API keys in your [API settings](https://venice.ai/settings/api).All API requests require HTTP Bearer authentication:Copy

Ask AI

```
Authorization: Bearer VENICE_API_KEY

```

Your API key is a secret. Do not share it or expose it in any client-side code.

## ​
OpenAI Compatibility

Venice’s API implements the OpenAI API specification, ensuring compatibility with existing OpenAI clients and tools. This allows you to integrate with Venice using the familiar OpenAI interface while accessing Venice’s unique features and uncensored models.### ​
Setup

Configure your client to use Venice’s base URL (`https://api.venice.ai/api/v1`) and make your first request:Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

```

## ​
Venice-Specific Features

### ​
System Prompts

Venice provides default system prompts designed to ensure uncensored and natural model responses. You have two options for handling system prompts:* **Default Behavior**: Your system prompts are appended to Venice’s defaults
* **Custom Behavior**: Disable Venice’s system prompts entirely

#### ​
Disabling Venice System Prompts

Use the `venice_parameters` option to remove Venice’s default system prompts:Copy

Ask AI

```
curl https://api.venice.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $VENICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "venice-uncensored",
    "messages": [
      {"role": "system", "content": "Your custom system prompt"},
      {"role": "user", "content": "Why is the sky blue?"}
    ],
    "venice_parameters": {
      "include_venice_system_prompt": false
    }
  }'

```

### ​
Venice Parameters

The `venice_parameters` object allows you to access Venice-specific features not available in the standard OpenAI API:| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| character_slug | string | The character slug of a public Venice character (discoverable as “Public ID” on the published character page) | - |
| strip_thinking_response | boolean | Strip <think></think> blocks from the response (applicable to reasoning/thinking models) | false |
| disable_thinking | boolean | On supported reasoning models, disable thinking and strip the <think></think> blocks from the response | false |
| enable_web_search | string | Enable web search for this request (off, on, auto - auto enables based on model’s discretion) | off |
| enable_web_scraping | boolean | Enable web scraping of URLs detected in the user message. Scraped content augments responses and bypasses web search | false |
| enable_web_citations | boolean | When web search is enabled, request that the LLM cite its sources using [REF]0[/REF] format | false |
| include_search_results_in_stream | boolean | Experimental: Include search results in the stream as the first emitted chunk | false |
| return_search_results_as_documents | boolean | Surface search results in an OpenAI-compatible tool call named venice_web_search_documents for LangChain integration | false |
| include_venice_system_prompt | boolean | Whether to include Venice’s default system prompts alongside specified system prompts | true |

These parameters can also be specified as model suffixes appended to the model name (e.g., `qwen3-235b:enable_web_search=auto`). See Model Feature Suffixes for details.

## ​
Response Headers Reference

All Venice API responses include HTTP headers that provide metadata about the request, rate limits, model information, and account balance. In addition to error codes returned from API responses, you can inspect these headers to get the unique ID of a particular API request, monitor rate limiting, and track your account balance.Venice recommends logging request IDs (`CF-RAY` header) in production deployments for more efficient troubleshooting with our support team, should the need arise.The table below provides a comprehensive reference of all headers you may encounter:| Header | Type | Purpose | When Returned |
| --- | --- | --- | --- |
| Standard HTTP Headers |  |  |  |
| Content-Type | string | MIME type of the response body (application/json, text/csv, image/png, etc.) | Always |
| Content-Encoding | string | Encoding used to compress the response body (gzip, br) | When client sends Accept-Encoding header |
| Content-Disposition | string | How content should be displayed (e.g., attachment; filename=export.csv) | When downloading files or exports |
| Date | string | RFC 7231 formatted timestamp when the response was generated | Always |
| Request Identification |  |  |  |
| CF-RAY | string | Unique identifier for this API request, used for troubleshooting and support requests | Always |
| x-venice-version | string | Current version/revision of the Venice API service (e.g., 20250828.222653) | Always |
| x-venice-timestamp | string | Server timestamp when the request was processed (ISO 8601 format) | When timestamp tracking is enabled |
| x-venice-host-name | string | Hostname of the server that processed the request | Error responses and debugging scenarios |
| Model Information |  |  |  |
| x-venice-model-id | string | Unique identifier of the AI model used for the request (e.g., venice-01-lite) | Inference endpoints using AI models |
| x-venice-model-name | string | Friendly/display name of the AI model used (e.g., Venice Lite) | Inference endpoints using AI models |
| x-venice-model-router | string | Router/backend service that handled the model inference | Inference endpoints when routing info available |
| x-venice-model-deprecation-warning | string | Warning message for models scheduled for deprecation | When using a deprecated model |
| x-venice-model-deprecation-date | string | Date when the model will be deprecated (ISO 8601 date) | When using a deprecated model |
| Rate Limiting Information |  |  |  |
| x-ratelimit-limit-requests | number | Maximum number of requests allowed in the current time window | All authenticated requests |
| x-ratelimit-remaining-requests | number | Number of requests remaining in the current time window | All authenticated requests |
| x-ratelimit-reset-requests | number | Unix timestamp when the request rate limit resets | All authenticated requests |
| x-ratelimit-limit-tokens | number | Maximum number of tokens (prompt + completion) allowed in the time window | All authenticated requests |
| x-ratelimit-remaining-tokens | number | Number of tokens remaining in the current time window | All authenticated requests |
| x-ratelimit-reset-tokens | number | Duration in seconds until the token rate limit resets | All authenticated requests |
| x-ratelimit-type | string | Type of rate limit applied (user, api_key, global) | When rate limiting is enforced |
| Pagination Headers |  |  |  |
| x-pagination-limit | number | Number of items per page | Paginated endpoints |
| x-pagination-page | number | Current page number (1-based) | Paginated endpoints |
| x-pagination-total | number | Total number of items across all pages | Paginated endpoints |
| x-pagination-total-pages | number | Total number of pages | Paginated endpoints |
| Account Balance Information |  |  |  |
| x-venice-balance-diem | string | Your DIEM token balance before the request was processed | All authenticated requests |
| x-venice-balance-usd | string | Your USD credit balance before the request was processed | All authenticated requests |
| x-venice-balance-vcu | string | Your Venice Compute Unit (VCU) balance before the request was processed | All authenticated requests |
| Content Safety Headers |  |  |  |
| x-venice-is-blurred | string | Indicates if generated image was blurred due to content policies (true/false) | Image generation with Safe Venice enabled |
| x-venice-is-content-violation | string | Indicates if content violates Venice’s content policies (true/false) | Content generation endpoints |
| x-venice-is-adult-model-content-violation | string | Indicates if content violates adult model content policies (true/false) | Image generation endpoints |
| x-venice-contains-minor | string | Indicates if image contains minors (true/false) | Image analysis endpoints with age detection |
| Client Information |  |  |  |
| x-venice-middleface-version | string | Version of the Venice middleface client | Requests from Venice middleface clients |
| x-venice-mobile-version | string | Version of the Venice mobile app client | Requests from mobile applications |
| x-venice-request-timestamp-ms | number | Client-provided request timestamp in milliseconds | When client provides timestamp in request |
| x-venice-control-instance | string | Control instance identifier for debugging | Image generation endpoints for debugging |
| Authentication Headers |  |  |  |
| x-auth-refreshed | string | Indicates authentication token was refreshed during request (true/false) | When authentication tokens are auto-refreshed |
| x-retry-count | number | Number of retry attempts for the request | When request retries occur |

### ​
Important Notes

* **Header Name Case**: HTTP headers are case-insensitive, but Venice uses lowercase with hyphens for consistency
* **String Values**: Boolean values in headers are returned as strings (`"true"` or `"false"`)
* **Numeric Values**: Large numbers and balance values may be returned as strings to prevent precision loss
* **Optional Headers**: Not all headers are returned in every response; presence depends on the endpoint and request context
* **Compression**: Use `Accept-Encoding: gzip, br` in requests to receive compressed responses where supported

### ​
Example: Accessing Response Headers

Copy

Ask AI

```
// After making an API request, access headers from the response object
const requestId = response.headers.get('CF-RAY');
const remainingRequests = response.headers.get('x-ratelimit-remaining-requests');
const remainingTokens = response.headers.get('x-ratelimit-remaining-tokens');
const usdBalance = response.headers.get('x-venice-balance-usd');

// Check for model deprecation warnings
const deprecationWarning = response.headers.get('x-venice-model-deprecation-warning');
if (deprecationWarning) {
  console.warn(`Model Deprecation: ${deprecationWarning}`);
}

```

## ​
Best Practices

* **Rate Limiting**: Monitor `x-ratelimit-remaining-requests` and `x-ratelimit-remaining-tokens` headers and implement exponential backoff
* **Balance Monitoring**: Track `x-venice-balance-usd` and `x-venice-balance-diem` headers to avoid service interruptions
* **System Prompts**: Test with and without Venice’s system prompts to find the best fit for your use case
* **API Keys**: Keep your API keys secure and rotate them regularly
* **Request Logging**: Log `CF-RAY` header values for troubleshooting with support
* **Model Deprecation**: Check for `x-venice-model-deprecation-warning` headers when using models

## ​
Differences from OpenAI’s API

While Venice maintains high compatibility with the OpenAI API specification, there are some key differences:* **venice_parameters**: Additional configurations like `enable_web_search`, `character_slug`, and `strip_thinking_response` for extended functionality
* **System Prompts**: Venice appends your system prompts to defaults that optimize for uncensored responses (disable with `include_venice_system_prompt: false`)
* **Model Ecosystem**: Venice offers its own model lineup including uncensored and reasoning models - use Venice model IDs rather than OpenAI mappings
* **Response Headers**: Unique headers for balance tracking (`x-venice-balance-usd`, `x-venice-balance-diem`), model deprecation warnings, and content safety flags
* **Content Policies**: More permissive policies with dedicated uncensored models and optional content filtering

## ​
API Stability

Venice maintains backward compatibility for v1 endpoints and parameters. For model lifecycle policy, deprecation notices, and migration guidance, see Deprecations.## ​
Swagger Configuration

You can find the complete swagger definition for the Venice API here: [https://api.venice.ai/doc/api/swagger.yaml](https://api.venice.ai/doc/api/swagger.yaml)
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/api-spec.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/api-spec)

Rate Limits
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /chat/completions | URL: https://docs.venice.ai/api-reference/endpoint/chat/completions ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTChat Completions

* Model Feature Suffix

/api/v1/chat/completions
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/chat/completions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "frequency_penalty": 0,
  "logprobs": true,
  "top_logprobs": 1,
  "max_completion_tokens": 123,
  "max_temp": 1.5,
  "max_tokens": 123,
  "messages": [
    {
      "content": "<string>",
      "role": "user"
    }
  ],
  "min_p": 0.05,
  "min_temp": 0.1,
  "model": "venice-uncensored",
  "n": 1,
  "presence_penalty": 0,
  "repetition_penalty": 1.2,
  "seed": 42,
  "stop": "<string>",
  "stop_token_ids": [
    151643,
    151645
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  },
  "temperature": 0.7,
  "top_k": 40,
  "top_p": 0.9,
  "user": "<string>",
  "venice_parameters": {
    "character_slug": "<string>",
    "strip_thinking_response": false,
    "disable_thinking": false,
    "enable_web_search": "off",
    "enable_web_scraping": false,
    "enable_web_citations": false,
    "include_search_results_in_stream": false,
    "return_search_results_as_documents": true,
    "include_venice_system_prompt": true
  },
  "parallel_tool_calls": false,
  "response_format": {
    "json_schema": {
      "properties": {
        "age": {
          "type": "number"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "age"
      ],
      "type": "object"
    },
    "type": "json_schema"
  },
  "tool_choice": {
    "function": {
      "name": "<string>"
    },
    "type": "<string>"
  },
  "tools": [
    {
      "function": {
        "description": "<string>",
        "name": "<string>",
        "parameters": {},
        "strict": false
      },
      "id": "<string>",
      "type": "<string>"
    }
  ]
}'
```

Copy

Ask AI

```
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The sky appears blue because of the way Earth's atmosphere scatters sunlight. When sunlight reaches Earth's atmosphere, it is made up of various colors of the spectrum, but blue light waves are shorter and scatter more easily when they hit the gases and particles in the atmosphere. This scattering occurs in all directions, but from our perspective on the ground, it appears as a blue hue that dominates the sky's color. This phenomenon is known as Rayleigh scattering. During sunrise and sunset, the sunlight has to travel further through the atmosphere, which allows more time for the blue light to scatter away from our direct line of sight, leaving the longer wavelengths, such as red, yellow, and orange, to dominate the sky's color.",
        "reasoning_content": null,
        "role": "assistant",
        "tool_calls": []
      },
      "stop_reason": null
    }
  ],
  "created": 1739928524,
  "id": "chatcmpl-a81fbc2d81a7a083bb83ccf9f44c6e5e",
  "model": "qwen-2.5-vl",
  "object": "chat.completion",
  "prompt_logprobs": null,
  "usage": {
    "completion_tokens": 146,
    "prompt_tokens": 612,
    "prompt_tokens_details": null,
    "total_tokens": 758
  },
  "venice_parameters": {
    "include_venice_system_prompt": true,
    "include_search_results_in_stream": false,
    "return_search_results_as_documents": false,
    "web_search_citations": [],
    "enable_web_search": "auto",
    "enable_web_scraping": false,
    "enable_web_citations": true,
    "strip_thinking_response": true,
    "disable_thinking": true,
    "character_slug": "venice"
  }
}
```

POST
/
chat
/
completions

/api/v1/chat/completions
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/chat/completions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "frequency_penalty": 0,
  "logprobs": true,
  "top_logprobs": 1,
  "max_completion_tokens": 123,
  "max_temp": 1.5,
  "max_tokens": 123,
  "messages": [
    {
      "content": "<string>",
      "role": "user"
    }
  ],
  "min_p": 0.05,
  "min_temp": 0.1,
  "model": "venice-uncensored",
  "n": 1,
  "presence_penalty": 0,
  "repetition_penalty": 1.2,
  "seed": 42,
  "stop": "<string>",
  "stop_token_ids": [
    151643,
    151645
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  },
  "temperature": 0.7,
  "top_k": 40,
  "top_p": 0.9,
  "user": "<string>",
  "venice_parameters": {
    "character_slug": "<string>",
    "strip_thinking_response": false,
    "disable_thinking": false,
    "enable_web_search": "off",
    "enable_web_scraping": false,
    "enable_web_citations": false,
    "include_search_results_in_stream": false,
    "return_search_results_as_documents": true,
    "include_venice_system_prompt": true
  },
  "parallel_tool_calls": false,
  "response_format": {
    "json_schema": {
      "properties": {
        "age": {
          "type": "number"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "age"
      ],
      "type": "object"
    },
    "type": "json_schema"
  },
  "tool_choice": {
    "function": {
      "name": "<string>"
    },
    "type": "<string>"
  },
  "tools": [
    {
      "function": {
        "description": "<string>",
        "name": "<string>",
        "parameters": {},
        "strict": false
      },
      "id": "<string>",
      "type": "<string>"
    }
  ]
}'
```

Copy

Ask AI

```
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The sky appears blue because of the way Earth's atmosphere scatters sunlight. When sunlight reaches Earth's atmosphere, it is made up of various colors of the spectrum, but blue light waves are shorter and scatter more easily when they hit the gases and particles in the atmosphere. This scattering occurs in all directions, but from our perspective on the ground, it appears as a blue hue that dominates the sky's color. This phenomenon is known as Rayleigh scattering. During sunrise and sunset, the sunlight has to travel further through the atmosphere, which allows more time for the blue light to scatter away from our direct line of sight, leaving the longer wavelengths, such as red, yellow, and orange, to dominate the sky's color.",
        "reasoning_content": null,
        "role": "assistant",
        "tool_calls": []
      },
      "stop_reason": null
    }
  ],
  "created": 1739928524,
  "id": "chatcmpl-a81fbc2d81a7a083bb83ccf9f44c6e5e",
  "model": "qwen-2.5-vl",
  "object": "chat.completion",
  "prompt_logprobs": null,
  "usage": {
    "completion_tokens": 146,
    "prompt_tokens": 612,
    "prompt_tokens_details": null,
    "total_tokens": 758
  },
  "venice_parameters": {
    "include_venice_system_prompt": true,
    "include_search_results_in_stream": false,
    "return_search_results_as_documents": false,
    "web_search_citations": [],
    "enable_web_search": "auto",
    "enable_web_scraping": false,
    "enable_web_citations": true,
    "strip_thinking_response": true,
    "disable_thinking": true,
    "character_slug": "venice"
  }
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-5a71391b-5dd8-4fe8-80be-197a958907fe?action=share&creator=38652128&ctx=documentation&active-environment=38652128-ef110f4e-d3e1-43b5-8029-4d6877e62041).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

​
Accept-Encoding
string

Supported compression encodings (gzip, br). Only applied when stream is false.

Example:`"gzip, br"`

#### Body

application/json

​
messages
(User Message · object | Assistant Message · object | Tool Message · object | System Message · object)[]
required

A list of messages comprising the conversation so far. Depending on the model you use, different message types (modalities) are supported, like text and images. For compatibility purposes, the schema supports submitting multiple image_url messages, however, only the last image_url message will be passed to and processed by the model.

Minimum length: `1`
* User Message

* Assistant Message

* Tool Message

* System Message

Showchild attributes

​
model
string
required

The ID of the model you wish to prompt. May also be a model trait, or a model compatibility mapping. See the models endpoint for a list of models available to you. You can use feature suffixes to enable features from the venice_parameters object. Please see "Model Feature Suffix" documentation for more details.

Example:`"venice-uncensored"`

​
frequency_penalty
number
default:0

Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.

Required range: `-2 <= x <= 2`

​
logprobs
boolean

Whether to include log probabilities in the response. This is not supported by all models.

Example:`true`

​
top_logprobs
integer

The number of highest probability tokens to return for each token position.

Required range: `x >= 0`
Example:`1`

​
max_completion_tokens
integer

An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.

​
max_temp
number

Maximum temperature value for dynamic temperature scaling.

Required range: `0 <= x <= 2`
Example:`1.5`

​
max_tokens
integer

The maximum number of tokens that can be generated in the chat completion. This value can be used to control costs for text generated via API. This value is now deprecated in favor of max_completion_tokens.

​
min_p
number

Sets a minimum probability threshold for token selection. Tokens with probabilities below this value are filtered out.

Required range: `0 <= x <= 1`
Example:`0.05`

​
min_temp
number

Minimum temperature value for dynamic temperature scaling.

Required range: `0 <= x <= 2`
Example:`0.1`

​
n
integer
default:1

How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.

​
presence_penalty
number
default:0

Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.

Required range: `-2 <= x <= 2`

​
repetition_penalty
number

The parameter for repetition penalty. 1.0 means no penalty. Values > 1.0 discourage repetition.

Required range: `x >= 0`
Example:`1.2`

​
seed
integer

The random seed used to generate the response. This is useful for reproducibility.

Required range: `x > 0`
Example:`42`

​
stop
string | nullstring[] | nullany

Up to 4 sequences where the API will stop generating further tokens. Defaults to null.

​
stop_token_ids
number[]

Array of token IDs where the API will stop generating further tokens.

Example:
```
[151643, 151645]
```

​
stream
boolean

Whether to stream back partial progress. Defaults to false.

Example:`true`

​
stream_options
object

Showchild attributes

​
temperature
number
default:0.7

What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.

Required range: `0 <= x <= 2`
Example:`0.7`

​
top_k
integer

The number of highest probability vocabulary tokens to keep for top-k-filtering.

Required range: `x >= 0`
Example:`40`

​
top_p
number
default:0.9

An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

Required range: `0 <= x <= 1`
Example:`0.9`

​
user
string

This field is discarded on the request but is supported in the Venice API for compatibility with OpenAI clients.

​
venice_parameters
object

Unique parameters to Venice's API implementation. Customize these to control the behavior of the model.

Showchild attributes

​
parallel_tool_calls
boolean
default:true

Whether to enable parallel function calling during tool use.

Example:`false`

​
response_format
object

Format in which the response should be returned. The JSON Schema that should be used to validate and format the response.

* json_schema

* json_object

Showchild attributes

Example:
```
{  "json_schema": {    "properties": {      "age": { "type": "number" },      "name": { "type": "string" }    },    "required": ["name", "age"],    "type": "object"  },  "type": "json_schema"}
```

​
tool_choice
objectstring

Showchild attributes

​
tools
Tool Call · object[] | null

A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for.

Showchild attributes

#### Response

OK

​
choices
object[]
required

A list of chat completion choices. Can be more than one if n is greater than 1.

Showchild attributes

Example:
```
[  {    "finish_reason": "stop",    "index": 0,    "logprobs": null,    "message": {      "content": "The sky appears blue because of the way Earth's atmosphere scatters sunlight. When sunlight reaches Earth's atmosphere, it is made up of various colors of the spectrum, but blue light waves are shorter and scatter more easily when they hit the gases and particles in the atmosphere. This scattering occurs in all directions, but from our perspective on the ground, it appears as a blue hue that dominates the sky's color. This phenomenon is known as Rayleigh scattering. During sunrise and sunset, the sunlight has to travel further through the atmosphere, which allows more time for the blue light to scatter away from our direct line of sight, leaving the longer wavelengths, such as red, yellow, and orange, to dominate the sky's color.",      "reasoning_content": null,      "role": "assistant",      "tool_calls": []    },    "stop_reason": null  }]
```

​
created
integer
required

The time at which the request was created.

Example:`1677858240`

​
id
string
required

The ID of the request.

Example:`"chatcmpl-abc123"`

​
model
string
required

The model id used for the request.

Example:`"venice-uncensored"`

​
object
enum<string>
required

The type of the object returned.

Available options:`chat.completion`

Example:`"chat.completion"`

​
usage
object
required

Showchild attributes

​
prompt_logprobs
null · anyOption 2 · objectnull · any

Log probability information for the prompt.

​
venice_parameters
object

Unique parameters to Venice's API implementation.

Showchild attributes

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/chat/completions.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/chat/completions)

Error CodesModel Feature Suffix
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /images/generations | URL: https://docs.venice.ai/api-reference/endpoint/image/generations ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Images

* POSTUpscale and Enhance

* POSTEdit (aka Inpaint)

* GETImage Styles

* POSTGenerate Images (OpenAI Compatible API)

/api/v1/image/generations
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "background": "auto",
  "model": "hidream",
  "moderation": "auto",
  "n": 1,
  "output_compression": 100,
  "output_format": "png",
  "prompt": "A beautiful sunset over mountain ranges",
  "quality": "auto",
  "response_format": "b64_json",
  "size": "1024x1024",
  "style": "natural",
  "user": "user123"
}'
```

Copy

Ask AI

```
{
  "created": 1713833628,
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

POST
/
images
/
generations

/api/v1/image/generations
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "background": "auto",
  "model": "hidream",
  "moderation": "auto",
  "n": 1,
  "output_compression": 100,
  "output_format": "png",
  "prompt": "A beautiful sunset over mountain ranges",
  "quality": "auto",
  "response_format": "b64_json",
  "size": "1024x1024",
  "style": "natural",
  "user": "user123"
}'
```

Copy

Ask AI

```
{
  "created": 1713833628,
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

​
Accept-Encoding
string

Supported compression encodings (gzip, br).

Example:`"gzip, br"`

#### Body

application/json

​
prompt
string
required

A text description of the desired image.

Required string length: `1 - 1500`
Example:`"A beautiful sunset over mountain ranges"`

​
background
enum<string> | null
default:auto

This parameter is not used in Venice image generation but is supported for compatibility with OpenAI API

Available options:`transparent`,
`opaque`,
`auto`

Example:`"auto"`

​
model
string
default:default

The model to use for image generation. Defaults to Venice's default image model. If a non-existent model is specified (ie an OpenAI model name), it will default to Venice's default image model.

Example:`"hidream"`

​
moderation
enum<string> | null
default:auto

auto enables safe venice mode which will blur out adult content. low disables safe venice mode.

Available options:`low`,
`auto`

Example:`"auto"`

​
n
integer | null
default:1

Number of images to generate. Venice presently only supports 1 image per request.

Required range: `1 <= x <= 1`
Example:`1`

​
output_compression
integer | null
default:100

This parameter is not used in Venice image generation but is supported for compatibility with OpenAI API

Required range: `0 <= x <= 100`

​
output_format
enum<string>
default:png

Output format for generated images

Available options:`jpeg`,
`png`,
`webp`

Example:`"png"`

​
quality
enum<string> | null
default:auto

This parameter is not used in Venice image generation but is supported for compatibility with OpenAI API

Available options:`auto`,
`high`,
`medium`,
`low`,
`hd`,
`standard`

Example:`"auto"`

​
response_format
enum<string> | null
default:b64_json

Response format. URL will be a data URL.

Available options:`b64_json`,
`url`

Example:`"b64_json"`

​
size
enum<string> | null
default:auto

Size of generated images. Default is 1024x1024

Available options:`auto`,
`256x256`,
`512x512`,
`1024x1024`,
`1536x1024`,
`1024x1536`,
`1792x1024`,
`1024x1792`

Example:`"1024x1024"`

​
style
enum<string> | null
default:natural

This parameter is not used in Venice image generation but is supported for compatibility with OpenAI API

Available options:`vivid`,
`natural`

Example:`"natural"`

​
user
string

This parameter is not used in Venice image generation but is supported for compatibility with OpenAI API

Example:`"user123"`

#### Response

Successfully generated image

​
created
integer
required

Unix timestamp for when the request was created

Example:`1713833628`

​
data
object[]
required

* Option 1

* Option 2

Showchild attributes

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/image/generations.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/image/generations)

Image StylesSpeech API (Beta)
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /audio/speech | URL: https://docs.venice.ai/api-reference/endpoint/audio/speech ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTSpeech API (Beta)

/api/v1/audio/speech
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/audio/speech \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "input": "Hello, welcome to Venice Voice.",
  "model": "tts-kokoro",
  "response_format": "mp3",
  "speed": 1,
  "streaming": false,
  "voice": "af_sky"
}'
```

Copy

Ask AI

```
This response does not have an example.
```

POST
/
audio
/
speech

/api/v1/audio/speech
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/audio/speech \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "input": "Hello, welcome to Venice Voice.",
  "model": "tts-kokoro",
  "response_format": "mp3",
  "speed": 1,
  "streaming": false,
  "voice": "af_sky"
}'
```

Copy

Ask AI

```
This response does not have an example.
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

Request to generate audio from text.

​
input
string
required

The text to generate audio for. The maximum length is 4096 characters.

Required string length: `1 - 4096`
Example:`"Hello, this is a test of the text to speech system."`

​
model
enum<string>
default:tts-kokoro

The model ID of a Venice TTS model.

Available options:`tts-kokoro`

Example:`"tts-kokoro"`

​
response_format
enum<string>
default:mp3

The format to audio in.

Available options:`mp3`,
`opus`,
`aac`,
`flac`,
`wav`,
`pcm`

Example:`"mp3"`

​
speed
number
default:1

The speed of the generated audio. Select a value from 0.25 to 4.0. 1.0 is the default.

Required range: `0.25 <= x <= 4`
Example:`1`

​
streaming
boolean
default:false

Should the content stream back sentence by sentence or be processed and returned as a complete audio file.

Example:`true`

​
voice
enum<string>
default:af_sky

The voice to use when generating the audio.

Available options:`af_alloy`,
`af_aoede`,
`af_bella`,
`af_heart`,
`af_jadzia`,
`af_jessica`,
`af_kore`,
`af_nicole`,
`af_nova`,
`af_river`,
`af_sarah`,
`af_sky`,
`am_adam`,
`am_echo`,
`am_eric`,
`am_fenrir`,
`am_liam`,
`am_michael`,
`am_onyx`,
`am_puck`,
`am_santa`,
`bf_alice`,
`bf_emma`,
`bf_lily`,
`bm_daniel`,
`bm_fable`,
`bm_george`,
`bm_lewis`,
`zf_xiaobei`,
`zf_xiaoni`,
`zf_xiaoxiao`,
`zf_xiaoyi`,
`zm_yunjian`,
`zm_yunxi`,
`zm_yunxia`,
`zm_yunyang`,
`ff_siwis`,
`hf_alpha`,
`hf_beta`,
`hm_omega`,
`hm_psi`,
`if_sara`,
`im_nicola`,
`jf_alpha`,
`jf_gongitsune`,
`jf_nezumi`,
`jf_tebukuro`,
`jm_kumo`,
`pf_dora`,
`pm_alex`,
`pm_santa`,
`ef_dora`,
`em_alex`,
`em_santa`

Example:`"af_sky"`

#### Response

Audio content generated successfully

The response is of type `file`.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/audio/speech.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/audio/speech)

Generate Images (OpenAI Compatible API)Generate Embeddings
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /characters | URL: https://docs.venice.ai/api-reference/endpoint/characters/list ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETGet Character

* GETList Characters

/api/v1/characters
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/characters \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "adult": false,
      "createdAt": "2024-12-20T21:28:08.934Z",
      "description": "Alan Watts (6 January 1915 – 16 November 1973) was a British and American writer, speaker, and self-styled \"philosophical entertainer\", known for interpreting and popularizing Buddhist, Taoist, and Hindu philosophy for a Western audience.",
      "name": "Alan Watts",
      "shareUrl": "https://venice.ai/c/alan-watts",
      "photoUrl": "https://outerface.venice.ai/api/characters/2f460055-7595-4640-9cb6-c442c4c869b0/photo",
      "slug": "alan-watts",
      "stats": {
        "imports": 112
      },
      "tags": [
        "AlanWatts",
        "Philosophy",
        "Buddhism",
        "Taoist",
        "Hindu"
      ],
      "updatedAt": "2025-02-09T03:23:53.708Z",
      "webEnabled": true,
      "modelId": "venice-uncensored"
    }
  ],
  "object": "list"
}
```

GET
/
characters

/api/v1/characters
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/characters \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "adult": false,
      "createdAt": "2024-12-20T21:28:08.934Z",
      "description": "Alan Watts (6 January 1915 – 16 November 1973) was a British and American writer, speaker, and self-styled \"philosophical entertainer\", known for interpreting and popularizing Buddhist, Taoist, and Hindu philosophy for a Western audience.",
      "name": "Alan Watts",
      "shareUrl": "https://venice.ai/c/alan-watts",
      "photoUrl": "https://outerface.venice.ai/api/characters/2f460055-7595-4640-9cb6-c442c4c869b0/photo",
      "slug": "alan-watts",
      "stats": {
        "imports": 112
      },
      "tags": [
        "AlanWatts",
        "Philosophy",
        "Buddhism",
        "Taoist",
        "Hindu"
      ],
      "updatedAt": "2025-02-09T03:23:53.708Z",
      "webEnabled": true,
      "modelId": "venice-uncensored"
    }
  ],
  "object": "list"
}
```

## ​
Experimental Endpoint

This is an experimental endpoint and may be subject to change.

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-b1bd9f3e-507b-46c5-ad35-be7419ea5ad3?action=share&creator=38652128&ctx=documentation&active-environment=38652128-ef110f4e-d3e1-43b5-8029-4d6877e62041).#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
object[]
required

Showchild attributes

​
object
enum<string>
required

Available options:`list`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/characters/list.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/characters/list)

Get CharacterBilling Usage API (Beta)
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Rate Limits | URL: https://docs.venice.ai/api-reference/rate-limiting ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

On this page
* Failed Request Rate Limits
* Paid Tier Rate Limits
* Paid Tier - LLMs
* Paid Tier - Image Models
* Paid Tier - Audio Models
* Paid Tier - Embedding Models
* Rate Limit and Consumption Headers

## ​
Failed Request Rate Limits

Failed requests including 500 errors, 503 capacity errors, 429 rate limit errors are should be retried with exponential back off.For 429 rate limit errors, please use `x-ratelimit-reset-requests` and `x-ratelimit-remaining-requests` to determine when to next retry.To protect our infrastructure from abuse, if an user generates more than 20 failed requests in a 30 second window, the API will return a 429 error indicating the error rate limit has been reached:Copy

Ask AI

```
Too many failed attempts (> 20) resulting in a non-success status code. Please wait 30s and try again. See https://docs.venice.ai/api-reference/rate-limiting for more information.

```

## ​
Paid Tier Rate Limits

Rate limits apply to users who have purchased API credits or staked VVV to gain Diem.Helpful links:* [Real time rate limits](https://docs.venice.ai/api-reference/endpoint/api_keys/rate_limits?playground=open)
* [Rate limit logs](https://docs.venice.ai/api-reference/endpoint/api_keys/rate_limit_logs?playground=open) - View requests that have hit the rate limiter

We will continue to monitor usage. As we add compute capacity to the network, we will review these limits. If you are consistently hitting rate limits, please contact **[email protected]** or post in the #API channel in Discord for assistance and we can work with you to raise your limits.

### ​
Paid Tier - LLMs

---

| Model | Model ID | Req / Min | Req / Day | Tokens / Min |
| --- | --- | --- | --- | --- |
| Llama 3.2 3B | llama-3.2-3b | 500 | 288,000 | 1,000,000 |
| Venice Small | qwen3-4b | 500 | 288,000 | 1,000,000 |
| Venice Uncensored 1.1 | venice-uncensored | 75 | 54,000 | 750,000 |
| Venice Medium (3.1) | mistral-31-24b | 75 | 54,000 | 750,000 |
| Llama 3.3 70B | llama-3.3-70b | 50 | 36,000 | 750,000 |
| Venice Large 1.1 | qwen3-235b | 20 | 15,000 | 750,000 |

### ​
Paid Tier - Image Models

---

| Model | Model ID | Req / Min | Req / Day |
| --- | --- | --- | --- |
| Flux | flux-dev / flux-dev-uncensored | 20 | 14,400 |
| All others | All | 20 | 28,800 |

### ​
Paid Tier - Audio Models

---

| Model | Model ID | Req / Min | Req / Day |
| --- | --- | --- | --- |
| All Audio Models | All | 60 | 86,400 |

### ​
Paid Tier - Embedding Models

---

| Model | Model ID | Req / Min | Req / Day | Tokens / Min |
| --- | --- | --- | --- | --- |
| BGE-M3 | text-embedding-bge-m3 | 500 | 288,000 | 1,000,000 |

## ​
Rate Limit and Consumption Headers

You can monitor your API utilization and remaining requests by evaluating the following headers:| Header | Description |
| --- | --- |
| x-ratelimit-limit-requests | The number of requests you’ve made in the current evaluation period. |
| x-ratelimit-remaining-requests | The remaining requests you can make in the current evaluation period. |
| x-ratelimit-reset-requests | The unix time stamp when the rate limit will reset. |
| x-ratelimit-limit-tokens | The number of total (prompt + completion) tokens used within a 1 minute sliding window. |
| x-ratelimit-remaining-tokens | The remaining number of total tokens that can be used during the evaluation period. |
| x-ratelimit-reset-tokens | The duration of time in seconds until the token rate limit resets. |
| x-venice-balance-diem | The user’s Diem balance before the request has been processed. |
| x-venice-balance-usd | The user’s USD balance before the request has been processed. |

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/rate-limiting.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/rate-limiting)

IntroductionError Codes
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Error Codes | URL: https://docs.venice.ai/api-reference/error-codes ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

When an error occurs in the API, we return a consistent error response format that includes an error code, HTTP status code, and a descriptive message. This reference lists all possible error codes that you might encounter while using our API, along with their corresponding HTTP status codes and messages.| Error Code | HTTP Status | Message | Log Level |
| --- | --- | --- | --- |
| AUTHENTICATION_FAILED | 401 | Authentication failed | - |
| AUTHENTICATION_FAILED_INACTIVE_KEY | 401 | Authentication failed - Pro subscription is inactive. Please upgrade your subscription to continue using the API. | - |
| INVALID_API_KEY | 401 | Invalid API key provided | - |
| UNAUTHORIZED | 403 | Unauthorized access | - |
| INVALID_REQUEST | 400 | Invalid request parameters | - |
| INVALID_MODEL | 400 | Invalid model specified | - |
| CHARACTER_NOT_FOUND | 404 | No character could be found from the provided character_slug | - |
| INVALID_CONTENT_TYPE | 415 | Invalid content type | - |
| INVALID_FILE_SIZE | 413 | File size exceeds maximum limit | - |
| INVALID_IMAGE_FORMAT | 400 | Invalid image format | - |
| CORRUPTED_IMAGE | 400 | The image file is corrupted or unreadable | - |
| RATE_LIMIT_EXCEEDED | 429 | Rate limit exceeded | - |
| MODEL_NOT_FOUND | 404 | Specified model not found | - |
| INFERENCE_FAILED | 500 | Inference processing failed | error |
| UPSCALE_FAILED | 500 | Image upscaling failed | error |
| UNKNOWN_ERROR | 500 | An unknown error occurred | error |

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/error-codes.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/error-codes)

Rate LimitsChat Completions
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: Model Feature Suffix | URL: https://docs.venice.ai/api-reference/endpoint/chat/model_feature_suffix ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTChat Completions

* Model Feature Suffix

On this page
* Syntax
* Examples
* To Set Web Search to Auto
* To Enable Web Search and Disable System Prompt
* To Enable Web Search and Add Citations to the Response
* To Enable Web Search with Full Page Scraping
* To Use a Character
* To Hide Thinking Blocks on a Reasoning Model Response
* To Disable Thinking on Supported Reasoning Models
* To Add Web Search Results to a Streaming Response
* Postman Example

Venice supports additional capabilities within it’s models that can be powered by the `venice_parameters` input on the chat completions endpoint.In certain circumstances, you may be using a client that does not let you modify the request body. For those platforms, you can utilize Venice’s Model Feature Suffix offering to pass flags in via the model ID.## ​
Syntax

The Model Feature Suffix follows this pattern:Copy

Ask AI

```
<model_id>:<parameter>=<value>

```

For multiple parameters, chain them with `&`:Copy

Ask AI

```
<model_id>:<parameter1>=<value1>&<parameter2>=<value2>&<parameter3>=<value3>

```

## ​
Examples

### ​
To Set Web Search to Auto

Copy

Ask AI

```
default:enable_web_search=auto

```

### ​
To Enable Web Search and Disable System Prompt

Copy

Ask AI

```
default:enable_web_search=on&include_venice_system_prompt=false

```

### ​
To Enable Web Search and Add Citations to the Response

Copy

Ask AI

```
default:enable_web_search=on&enable_web_citations=true

```

### ​
To Enable Web Search with Full Page Scraping

Copy

Ask AI

```
default:enable_web_search=on&enable_web_scraping=true

```

### ​
To Use a Character

Copy

Ask AI

```
default:character_slug=alan-watts

```

### ​
To Hide Thinking Blocks on a Reasoning Model Response

Copy

Ask AI

```
qwen3-4b:strip_thinking_response=true

```

### ​
To Disable Thinking on Supported Reasoning Models

Certain reasoning models (like Qwen 3) support disabling the thinking process. You can activate using the suffix below:Copy

Ask AI

```
qwen3-4b:disable_thinking=true

```

### ​
To Add Web Search Results to a Streaming Response

This will enable web search, add citations to the response body and include the search results in the stream as the final response message.You can see an example of this in our [Postman Collection here](https://www.postman.com/veniceai/workspace/venice-ai-workspace/request/38652128-ceef3395-451c-4391-bc7e-a40377e0357b?action=share&source=copy-link&creator=38652128&active-environment=ef110f4e-d3e1-43b5-8029-4d6877e62041).Copy

Ask AI

```
qwen3-4b:enable_web_search=on&enable_web_citations=true&include_search_results_in_stream=true

```

## ​
Postman Example

You can view an example of this feature in our [Postman Collection here](https://www.postman.com/veniceai/workspace/venice-ai-workspace/request/38652128-857f29ff-ee70-4c7c-beba-ef884bdc93be?action=share&creator=38652128&ctx=documentation&active-environment=38652128-ef110f4e-d3e1-43b5-8029-4d6877e62041).
[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/chat/model_feature_suffix.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/chat/model_feature_suffix)

Chat CompletionsGenerate Images
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /models | URL: https://docs.venice.ai/api-reference/endpoint/models/list ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList Models

* GETCompatibility Mapping

* GETTraits

/api/v1/models
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models
```

Copy

Ask AI

```
{
  "data": [
    {
      "created": 1727966436,
      "id": "llama-3.2-3b",
      "model_spec": {
        "availableContextTokens": 131072,
        "capabilities": {
          "optimizedForCode": false,
          "quantization": "fp16",
          "supportsFunctionCalling": true,
          "supportsReasoning": false,
          "supportsResponseSchema": true,
          "supportsVision": false,
          "supportsWebSearch": true,
          "supportsLogProbs": true
        },
        "constraints": {
          "temperature": {
            "default": 0.8
          },
          "top_p": {
            "default": 0.9
          }
        },
        "name": "Llama 3.2 3B",
        "modelSource": "https://huggingface.co/meta-llama/Llama-3.2-3B",
        "offline": false,
        "pricing": {
          "input": {
            "usd": 0.15,
            "diem": 0.15
          },
          "output": {
            "usd": 0.6,
            "diem": 0.6
          }
        },
        "traits": [
          "fastest"
        ]
      },
      "object": "model",
      "owned_by": "venice.ai",
      "type": "text"
    }
  ],
  "object": "list",
  "type": "text"
}
```

GET
/
models

/api/v1/models
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models
```

Copy

Ask AI

```
{
  "data": [
    {
      "created": 1727966436,
      "id": "llama-3.2-3b",
      "model_spec": {
        "availableContextTokens": 131072,
        "capabilities": {
          "optimizedForCode": false,
          "quantization": "fp16",
          "supportsFunctionCalling": true,
          "supportsReasoning": false,
          "supportsResponseSchema": true,
          "supportsVision": false,
          "supportsWebSearch": true,
          "supportsLogProbs": true
        },
        "constraints": {
          "temperature": {
            "default": 0.8
          },
          "top_p": {
            "default": 0.9
          }
        },
        "name": "Llama 3.2 3B",
        "modelSource": "https://huggingface.co/meta-llama/Llama-3.2-3B",
        "offline": false,
        "pricing": {
          "input": {
            "usd": 0.15,
            "diem": 0.15
          },
          "output": {
            "usd": 0.6,
            "diem": 0.6
          }
        },
        "traits": [
          "fastest"
        ]
      },
      "object": "model",
      "owned_by": "venice.ai",
      "type": "text"
    }
  ],
  "object": "list",
  "type": "text"
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-59dfa959-7038-4cd8-b8ba-80cf09f2f026?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

​
type
Option 1 · enum<string>Option 2 · enum<string>

Filter models by type. Use "all" to get all model types.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

#### Response

OK

​
data
object[]
required

List of available models

Showchild attributes

​
object
enum<string>
required

Available options:`list`

​
type
Option 1 · enum<string>Option 2 · enum<string>

required

Type of models returned.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/models/list.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/models/list)

Generate EmbeddingsCompatibility Mapping
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /image/generate | URL: https://docs.venice.ai/api-reference/endpoint/image/generate ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Images

* POSTUpscale and Enhance

* POSTEdit (aka Inpaint)

* GETImage Styles

* POSTGenerate Images (OpenAI Compatible API)

/api/v1/image/generate
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/generate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "cfg_scale": 7.5,
  "embed_exif_metadata": false,
  "format": "webp",
  "height": 1024,
  "hide_watermark": false,
  "inpaint": "<any>",
  "lora_strength": 50,
  "model": "hidream",
  "negative_prompt": "Clouds, Rain, Snow",
  "prompt": "A beautiful sunset over a mountain range",
  "return_binary": false,
  "variants": 3,
  "safe_mode": false,
  "seed": 123456789,
  "steps": 20,
  "style_preset": "3D Model",
  "width": 1024
}'
```

Copy

Ask AI

```
{
  "id": "generate-image-1234567890",
  "images": [
    "<string>"
  ],
  "request": "<any>",
  "timing": {
    "inferenceDuration": 123,
    "inferencePreprocessingTime": 123,
    "inferenceQueueTime": 123,
    "total": 123
  }
}
```

POST
/
image
/
generate

/api/v1/image/generate
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/generate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "cfg_scale": 7.5,
  "embed_exif_metadata": false,
  "format": "webp",
  "height": 1024,
  "hide_watermark": false,
  "inpaint": "<any>",
  "lora_strength": 50,
  "model": "hidream",
  "negative_prompt": "Clouds, Rain, Snow",
  "prompt": "A beautiful sunset over a mountain range",
  "return_binary": false,
  "variants": 3,
  "safe_mode": false,
  "seed": 123456789,
  "steps": 20,
  "style_preset": "3D Model",
  "width": 1024
}'
```

Copy

Ask AI

```
{
  "id": "generate-image-1234567890",
  "images": [
    "<string>"
  ],
  "request": "<any>",
  "timing": {
    "inferenceDuration": 123,
    "inferencePreprocessingTime": 123,
    "inferenceQueueTime": 123,
    "total": 123
  }
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-0adc004d-2edf-4b88-a3bb-0f868c791c9c?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

​
Accept-Encoding
string

Supported compression encodings (gzip, br). Only applied when return_binary is false.

Example:`"gzip, br"`

#### Body

application/json

​
model
string
required

The model to use for image generation.

Example:`"hidream"`

​
prompt
string
required

The description for the image. Character limit is model specific and is listed in the promptCharacterLimit setting in the model list endpoint.

Required string length: `1 - 1500`
Example:`"A beautiful sunset over a mountain range"`

​
cfg_scale
number

CFG scale parameter. Higher values lead to more adherence to the prompt.

Required range: `0 < x <= 20`
Example:`7.5`

​
embed_exif_metadata
boolean
default:false

Embed prompt generation information into the image's EXIF metadata.

Example:`false`

​
format
enum<string>
default:webp

The image format to return. WebP are smaller and optimized for web use. PNG are higher quality but larger in file size.

Available options:`jpeg`,
`png`,
`webp`

Example:`"webp"`

​
height
integer
default:1024

Height of the generated image. Each model has a specific height and width divisor listed in the widthHeightDivisor constraint in the model list endpoint.

Required range: `0 < x <= 1280`
Example:`1024`

​
hide_watermark
boolean
default:false

Whether to hide the Venice watermark. Venice may ignore this parameter for certain generated content.

Example:`false`

​
inpaint
any
deprecated

This feature is deprecated and was disabled on May 19th, 2025. A revised in-painting API will be launched in the near future.

​
lora_strength
integer

Lora strength for the model. Only applies if the model uses additional Loras.

Required range: `0 <= x <= 100`
Example:`50`

​
negative_prompt
string

A description of what should not be in the image. Character limit is model specific and is listed in the promptCharacterLimit constraint in the model list endpoint.

Maximum length: `1500`
Example:`"Clouds, Rain, Snow"`

​
return_binary
boolean
default:false

Whether to return binary image data instead of base64.

Example:`false`

​
variants
integer

Number of images to generate (1–4). Only supported when return_binary is false.

Required range: `1 <= x <= 4`
Example:`3`

​
safe_mode
boolean
default:true

Whether to use safe mode. If enabled, this will blur images that are classified as having adult content.

Example:`false`

​
seed
integer
default:0

Random seed for generation. If not provided, a random seed will be used.

Required range: `-999999999 <= x <= 999999999`
Example:`123456789`

​
steps
integer
default:20

Number of inference steps. The following models have reduced max steps from the global max: venice-sd35: 30 max steps, hidream: 50 max steps, flux.1-krea: 30 max steps, flux-dev: 30 max steps, flux-dev-uncensored: 30 max steps, lustify-sdxl: 50 max steps, lustify-v7: 25 max steps, qwen-image: 8 max steps, wai-Illustrious: 30 max steps. These constraints are exposed in the model list endpoint for each model.

Required range: `0 < x <= 50`
Example:`20`

​
style_preset
string

An image style to apply to the image. Visit [https://docs.venice.ai/api-reference/endpoint/image/styles](https://docs.venice.ai/api-reference/endpoint/image/styles) for more details.

Example:`"3D Model"`

​
width
integer
default:1024

Width of the generated image. Each model has a specific height and width divisor listed in the widthHeightDivisor constraint in the model list endpoint.

Required range: `0 < x <= 1280`
Example:`1024`

#### Response

Successfully generated image

​
id
string
required

The ID of the request.

Example:`"generate-image-1234567890"`

​
images
string[]
required

Base64 encoded image data.

​
timing
object
required

Showchild attributes

​
request
any

The original request data sent to the API.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/image/generate.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/image/generate)

Model Feature SuffixUpscale and Enhance
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/generate_web3_key/get ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

/api/v1/api_keys/generate_web3_key
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key
```

Copy

Ask AI

```
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "success": true
}
```

GET
/
api_keys
/
generate_web3_key

/api/v1/api_keys/generate_web3_key
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key
```

Copy

Ask AI

```
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "success": true
}
```

## ​
Autonomous Agent API Key Creation

Please see this guide on how to use this endpoint.---

#### Response

200 - application/json

OK

​
data
object
required

Showchild attributes

​
success
boolean
required

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/generate_web3_key/get.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/generate_web3_key/get)

Delete API KeyGenerate API Key with Web3 Wallet
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /models | URL: https://docs.venice.ai/api-reference/endpoint/models/list?playground=open ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList Models

* GETCompatibility Mapping

* GETTraits

/api/v1/models
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models
```

Copy

Ask AI

```
{
  "data": [
    {
      "created": 1727966436,
      "id": "llama-3.2-3b",
      "model_spec": {
        "availableContextTokens": 131072,
        "capabilities": {
          "optimizedForCode": false,
          "quantization": "fp16",
          "supportsFunctionCalling": true,
          "supportsReasoning": false,
          "supportsResponseSchema": true,
          "supportsVision": false,
          "supportsWebSearch": true,
          "supportsLogProbs": true
        },
        "constraints": {
          "temperature": {
            "default": 0.8
          },
          "top_p": {
            "default": 0.9
          }
        },
        "name": "Llama 3.2 3B",
        "modelSource": "https://huggingface.co/meta-llama/Llama-3.2-3B",
        "offline": false,
        "pricing": {
          "input": {
            "usd": 0.15,
            "diem": 0.15
          },
          "output": {
            "usd": 0.6,
            "diem": 0.6
          }
        },
        "traits": [
          "fastest"
        ]
      },
      "object": "model",
      "owned_by": "venice.ai",
      "type": "text"
    }
  ],
  "object": "list",
  "type": "text"
}
```

GET
/
models

/api/v1/models
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models
```

Copy

Ask AI

```
{
  "data": [
    {
      "created": 1727966436,
      "id": "llama-3.2-3b",
      "model_spec": {
        "availableContextTokens": 131072,
        "capabilities": {
          "optimizedForCode": false,
          "quantization": "fp16",
          "supportsFunctionCalling": true,
          "supportsReasoning": false,
          "supportsResponseSchema": true,
          "supportsVision": false,
          "supportsWebSearch": true,
          "supportsLogProbs": true
        },
        "constraints": {
          "temperature": {
            "default": 0.8
          },
          "top_p": {
            "default": 0.9
          }
        },
        "name": "Llama 3.2 3B",
        "modelSource": "https://huggingface.co/meta-llama/Llama-3.2-3B",
        "offline": false,
        "pricing": {
          "input": {
            "usd": 0.15,
            "diem": 0.15
          },
          "output": {
            "usd": 0.6,
            "diem": 0.6
          }
        },
        "traits": [
          "fastest"
        ]
      },
      "object": "model",
      "owned_by": "venice.ai",
      "type": "text"
    }
  ],
  "object": "list",
  "type": "text"
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-59dfa959-7038-4cd8-b8ba-80cf09f2f026?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

​
type
Option 1 · enum<string>Option 2 · enum<string>

Filter models by type. Use "all" to get all model types.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

#### Response

OK

​
data
object[]
required

List of available models

Showchild attributes

​
object
enum<string>
required

Available options:`list`

​
type
Option 1 · enum<string>Option 2 · enum<string>

required

Type of models returned.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/models/list.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/models/list)

Generate EmbeddingsCompatibility Mapping
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /image/upscale | URL: https://docs.venice.ai/api-reference/endpoint/image/upscale ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Images

* POSTUpscale and Enhance

* POSTEdit (aka Inpaint)

* GETImage Styles

* POSTGenerate Images (OpenAI Compatible API)

/api/v1/image/upscale
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/upscale \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "enhance": true,
  "enhanceCreativity": 0.5,
  "enhancePrompt": "gold",
  "image": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0A...",
  "scale": 2
}'
```

Copy

Ask AI

```
This response does not have an example.
```

POST
/
image
/
upscale

/api/v1/image/upscale
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/upscale \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "enhance": true,
  "enhanceCreativity": 0.5,
  "enhancePrompt": "gold",
  "image": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0A...",
  "scale": 2
}'
```

Copy

Ask AI

```
This response does not have an example.
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-8c268e3a-614f-4e49-9816-e4b8d1597818?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/jsonmultipart/form-data

Upscale or enhance an image based on the supplied parameters. Using a scale of 1 with enhance enabled will only run the enhancer.

​
image
anystring

required

The image to upscale. Can be either a file upload or a base64-encoded string. Image dimensions must be at least 65536 pixels and final dimensions after scaling must not exceed 16777216 pixels.

​
enhance
booleanenum<string>

default:false

Whether to enhance the image using Venice's image engine during upscaling. Must be true if scale is 1.

Example:`true`

​
enhanceCreativity
number | null
default:0.5

Higher values let the enhancement AI change the image more. Setting this to 1 effectively creates an entirely new image.

Required range: `0 <= x <= 1`
Example:`0.5`

​
enhancePrompt
string

The text to image style to apply during prompt enhancement. Does best with short descriptive prompts, like gold, marble or angry, menacing.

Maximum length: `1500`
Example:`"gold"`

​
replication
number | null
default:0.35

How strongly lines and noise in the base image are preserved. Higher values are noisier but less plastic/AI "generated"/hallucinated. Must be between 0 and 1.

Required range: `0 <= x <= 1`
Example:`0.35`

​
scale
number
default:2

The scale factor for upscaling the image. Must be a number between 1 and 4. Scale of 1 requires enhance to be set true and will only run the enhancer. Scale must be > 1 if enhance is false. A scale of 4 with large images will result in the scale being dynamically set to ensure the final image stays within the maximum size limits.

Required range: `1 <= x <= 4`
Example:`2`

#### Response

OK

The response is of type `file`.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/image/upscale.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/image/upscale)

Generate ImagesEdit (aka Inpaint)
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /image/edit | URL: https://docs.venice.ai/api-reference/endpoint/image/edit ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Images

* POSTUpscale and Enhance

* POSTEdit (aka Inpaint)

* GETImage Styles

* POSTGenerate Images (OpenAI Compatible API)

/api/v1/image/edit
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/edit \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "prompt": "Colorize",
  "image": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0A..."
}'
```

Copy

Ask AI

```
This response does not have an example.
```

POST
/
image
/
edit

/api/v1/image/edit
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/image/edit \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "prompt": "Colorize",
  "image": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAIGNIUk0A..."
}'
```

Copy

Ask AI

```
This response does not have an example.
```

## ​
Experimental Endpoint

This is an experimental endpoint and may be subject to change.

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-2d156cd6-a9bc-4586-8a8b-98e4b5c4435d?action=share&source=copy-link&creator=38652128&ctx=documentation).---

Venice’s image editor runs on the Qwen-Image model, which blocks any request that tries to generate or add explicit sexual imagery, sexualise minors or make adults look child-like, or depict real-world violence or gore.

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/jsonmultipart/form-data

Edit an image based on the supplied prompt.

​
prompt
string
required

The text directions to edit or modify the image. Does best with short but descriptive prompts. IE: "Change the color of", "remove the object", "change the sky to a sunrise", etc.

Maximum length: `1500`
Example:`"Change the color of the sky to a sunrise"`

​
image
anystringstring<uri>

required

The image to edit. Can be either a file upload, a base64-encoded string, or a URL starting with http:// or https://. Image dimensions must be at least 65536 pixels and must not exceed 33177600 pixels. Image URLs must be less than 10MB.

#### Response

OK

The response is of type `file`.

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/image/edit.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/image/edit)

Upscale and EnhanceImage Styles
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /image/styles | URL: https://docs.venice.ai/api-reference/endpoint/image/styles ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Images

* POSTUpscale and Enhance

* POSTEdit (aka Inpaint)

* GETImage Styles

* POSTGenerate Images (OpenAI Compatible API)

/api/v1/image/styles
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/image/styles
```

Copy

Ask AI

```
{
  "data": [
    "3D Model",
    "Analog Film",
    "Anime",
    "Cinematic",
    "Comic Book"
  ],
  "object": "list"
}
```

GET
/
image
/
styles

/api/v1/image/styles
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/image/styles
```

Copy

Ask AI

```
{
  "data": [
    "3D Model",
    "Analog Film",
    "Anime",
    "Cinematic",
    "Comic Book"
  ],
  "object": "list"
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-04b32328-197f-4548-b15e-79d4ab0728b1?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
string[]
required

List of available image styles

Example:
```
[  "3D Model",  "Analog Film",  "Anime",  "Cinematic",  "Comic Book"]
```

​
object
enum<string>
required

Available options:`list`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/image/styles.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/image/styles)

Edit (aka Inpaint)Generate Images (OpenAI Compatible API)
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /embeddings | URL: https://docs.venice.ai/api-reference/endpoint/embeddings/generate ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * POSTGenerate Embeddings

/api/v1/embeddings
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "encoding_format": "float",
  "input": "The quick brown fox jumped over the lazy dog",
  "model": "text-embedding-bge-m3"
}'
```

Copy

Ask AI

```
{
  "data": [
    {
      "embedding": [
        0.0023064255,
        -0.009327292,
        0.015797377
      ],
      "index": 0,
      "object": "embedding"
    }
  ],
  "model": "text-embedding-bge-m3",
  "object": "list",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

POST
/
embeddings

/api/v1/embeddings
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "encoding_format": "float",
  "input": "The quick brown fox jumped over the lazy dog",
  "model": "text-embedding-bge-m3"
}'
```

Copy

Ask AI

```
{
  "data": [
    {
      "embedding": [
        0.0023064255,
        -0.009327292,
        0.015797377
      ],
      "index": 0,
      "object": "embedding"
    }
  ],
  "model": "text-embedding-bge-m3",
  "object": "list",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

​
Accept-Encoding
string

Supported compression encodings (gzip, br)

Example:`"gzip, br"`

#### Body

application/json

Create embeddings for the supplied input.

​
input
stringstring[]integer[]integer[][]

required

Input text to embed, encoded as a string or array of tokens. To embed multiple inputs in a single request, pass an array of strings or array of token arrays. The input must not exceed the max input tokens for the model (8192 tokens), cannot be an empty string, and any array must be 2048 dimensions or less. The string that will be turned into an embedding. Cannot be an empty string.

Minimum length: `1`
Example:`"This is a test."`

​
model
stringenum<string>

required

ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.

Example:`"text-embedding-bge-m3"`

​
dimensions
integer

The number of dimensions the resulting output embeddings should have.

Required range: `x >= 1`

​
encoding_format
enum<string>
default:float

The format to return the embeddings in. Can be either `float` or `base64`.

Available options:`float`,
`base64`

Example:`"float"`

​
user
string

This is an unused parameter and is discarded by Venice. It is supported solely for API compatibility with OpenAI.

#### Response

OK

​
data
object[]
required

The list of embeddings generated by the model.

Showchild attributes

​
model
string
required

The name of the model used to generate the embedding.

​
object
enum<string>
required

The object type, which is always "list"

Available options:`list`

​
usage
object
required

The usage information for the request.

Showchild attributes

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/embeddings/generate.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/embeddings/generate)

Speech API (Beta)List Models
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /characters/{slug} | URL: https://docs.venice.ai/api-reference/endpoint/characters/get ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETGet Character

* GETList Characters

/api/v1/characters/{slug}
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/characters/{slug} \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "adult": false,
    "createdAt": "2024-12-20T21:28:08.934Z",
    "description": "Alan Watts (6 January 1915 – 16 November 1973) was a British and American writer, speaker, and self-styled \"philosophical entertainer\", known for interpreting and popularizing Buddhist, Taoist, and Hindu philosophy for a Western audience.",
    "name": "Alan Watts",
    "shareUrl": "https://venice.ai/c/alan-watts",
    "photoUrl": "https://outerface.venice.ai/api/characters/2f460055-7595-4640-9cb6-c442c4c869b0/photo",
    "slug": "alan-watts",
    "stats": {
      "imports": 112
    },
    "tags": [
      "AlanWatts",
      "Philosophy",
      "Buddhism",
      "Taoist",
      "Hindu"
    ],
    "updatedAt": "2025-02-09T03:23:53.708Z",
    "webEnabled": true,
    "modelId": "venice-uncensored"
  },
  "object": "character"
}
```

GET
/
characters
/
{slug}

/api/v1/characters/{slug}
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/characters/{slug} \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "adult": false,
    "createdAt": "2024-12-20T21:28:08.934Z",
    "description": "Alan Watts (6 January 1915 – 16 November 1973) was a British and American writer, speaker, and self-styled \"philosophical entertainer\", known for interpreting and popularizing Buddhist, Taoist, and Hindu philosophy for a Western audience.",
    "name": "Alan Watts",
    "shareUrl": "https://venice.ai/c/alan-watts",
    "photoUrl": "https://outerface.venice.ai/api/characters/2f460055-7595-4640-9cb6-c442c4c869b0/photo",
    "slug": "alan-watts",
    "stats": {
      "imports": 112
    },
    "tags": [
      "AlanWatts",
      "Philosophy",
      "Buddhism",
      "Taoist",
      "Hindu"
    ],
    "updatedAt": "2025-02-09T03:23:53.708Z",
    "webEnabled": true,
    "modelId": "venice-uncensored"
  },
  "object": "character"
}
```

## ​
Experimental Endpoint

This is an experimental endpoint and may be subject to change.

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/062d2eda-cd10-4f2f-83b4-083178d85fc5/request/38652128-8cca56f0-e7b7-4afa-855a-c41f9a6d53e2?action=share&source=copy-link&creator=48156591&ctx=documentation).#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

​
slug
string
required

The slug of the character to retrieve

Example:`"alan-watts"`

#### Response

OK

​
data
object
required

Showchild attributes

​
object
enum<string>
required

Available options:`character`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/characters/get.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/characters/get)

Rate Limit LogsList Characters
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /billing/usage | URL: https://docs.venice.ai/api-reference/endpoint/billing/usage ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETBilling Usage API (Beta)

/api/v1/billing/usage
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/billing/usage \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "amount": -0.1,
      "currency": "DIEM",
      "inferenceDetails": null,
      "notes": "API Inference",
      "pricePerUnitUsd": 0.1,
      "sku": "venice-sd35-image-unit",
      "timestamp": {},
      "units": 1
    },
    {
      "amount": -0.06356,
      "currency": "DIEM",
      "inferenceDetails": {
        "completionTokens": 227,
        "inferenceExecutionTime": 2964,
        "promptTokens": 339,
        "requestId": "chatcmpl-4007fd29f42b7d3c4107f4345e8d174a"
      },
      "notes": "API Inference",
      "pricePerUnitUsd": 2.8,
      "sku": "llama-3.3-70b-llm-output-mtoken",
      "timestamp": {},
      "units": 0.000227
    }
  ],
  "pagination": {
    "limit": 1,
    "page": 200,
    "total": 56090,
    "totalPages": 56090
  }
}
```

GET
/
billing
/
usage

/api/v1/billing/usage
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/billing/usage \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "amount": -0.1,
      "currency": "DIEM",
      "inferenceDetails": null,
      "notes": "API Inference",
      "pricePerUnitUsd": 0.1,
      "sku": "venice-sd35-image-unit",
      "timestamp": {},
      "units": 1
    },
    {
      "amount": -0.06356,
      "currency": "DIEM",
      "inferenceDetails": {
        "completionTokens": 227,
        "inferenceExecutionTime": 2964,
        "promptTokens": 339,
        "requestId": "chatcmpl-4007fd29f42b7d3c4107f4345e8d174a"
      },
      "notes": "API Inference",
      "pricePerUnitUsd": 2.8,
      "sku": "llama-3.3-70b-llm-output-mtoken",
      "timestamp": {},
      "units": 0.000227
    }
  ],
  "pagination": {
    "limit": 1,
    "page": 200,
    "total": 56090,
    "totalPages": 56090
  }
}
```

Exports usage data for a user. Descriptions of response fields can be found below:* **timestamp**: The timestamp the billing usage entry was created
* **sku**: The product associated with the billing usage entry
* **pricePerUnitUsd**: The price per unit in USD
* **unit**: The number of units consumed
* **amount**: The total amount charged for the billing usage entry
* **currency**: The currency charged for the billing usage entry
* **notes**: Notes about the billing usage entry
* **inferenceDetails.requestId**: The request ID associated with the inference
* **inferenceDetails.inferenceExecutionTime**: Time taken for inference execution in milliseconds
* **inferenceDetails.promptTokens**: Number of tokens requested in the prompt. Only present for LLM usage.
* **inferenceDetails.completionTokens**: Number of tokens used in the completion. Only present for LLM usage.

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Headers

​
Accept
string

Accept header to specify the response format

Example:`"application/json, text/csv"`

#### Query Parameters

​
currency
enum<string>

Filter by currency

Available options:`USD`,
`VCU`,
`DIEM`

Example:`"USD"`

​
endDate
string<date-time>

End date for filtering records (ISO 8601)

Example:`"2024-12-31T23:59:59.000Z"`

​
limit
integer
default:200

Number of items per page

Required range: `0 < x <= 500`
Example:`200`

​
page
integer
default:1

Page number for pagination

Required range: `x > 0`
Example:`1`

​
sortOrder
enum<string>
default:desc

Sort order for createdAt field

Available options:`asc`,
`desc`

Example:`"desc"`

​
startDate
string<date-time>

Start date for filtering records (ISO 8601)

Example:`"2024-01-01T00:00:00.000Z"`

#### Response

Successful response

The response schema for the billing usage endpoint

​
data
object[]
required

Showchild attributes

​
pagination
object
required

Showchild attributes

​
warningMessage
string

A warning message to disambiguate DIEM usage from legacy DIEM (formerly VCU) usage

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/billing/usage.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/billing/usage)

List Characters
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice.ai View API Key Rate Limits | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/rate_limits?playground=open ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETRate Limits and Balances

* GETRate Limit Logs

/api/v1/api_keys/rate_limits
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "accessPermitted": true,
    "apiTier": {
      "id": "paid",
      "isCharged": true
    },
    "balances": {
      "USD": 50.23,
      "DIEM": 100.023
    },
    "keyExpiration": "2025-06-01T00:00:00.000Z",
    "nextEpochBegins": "2025-05-07T00:00:00.000Z",
    "rateLimits": [
      {
        "apiModelId": "venice-uncensored",
        "rateLimits": [
          {
            "amount": 100,
            "type": "RPM"
          }
        ]
      }
    ]
  }
}
```

GET
/
api_keys
/
rate_limits

/api/v1/api_keys/rate_limits
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "accessPermitted": true,
    "apiTier": {
      "id": "paid",
      "isCharged": true
    },
    "balances": {
      "USD": 50.23,
      "DIEM": 100.023
    },
    "keyExpiration": "2025-06-01T00:00:00.000Z",
    "nextEpochBegins": "2025-05-07T00:00:00.000Z",
    "rateLimits": [
      {
        "apiModelId": "venice-uncensored",
        "rateLimits": [
          {
            "amount": 100,
            "type": "RPM"
          }
        ]
      }
    ]
  }
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
object
required

Showchild attributes

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/rate_limits.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/rate_limits)

Generate API Key with Web3 WalletRate Limit Logs
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice.ai View API Key Rate Limit Log | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/rate_limit_logs?playground=open ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETRate Limits and Balances

* GETRate Limit Logs

/api/v1/api_keys/rate_limits/log
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits/log \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyId": "<string>",
      "modelId": "venice-uncensored",
      "rateLimitTier": "paid",
      "rateLimitType": "RPM",
      "timestamp": "2023-10-01T12:00:00.000Z"
    }
  ],
  "object": "list"
}
```

GET
/
api_keys
/
rate_limits
/
log

/api/v1/api_keys/rate_limits/log
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits/log \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyId": "<string>",
      "modelId": "venice-uncensored",
      "rateLimitTier": "paid",
      "rateLimitType": "RPM",
      "timestamp": "2023-10-01T12:00:00.000Z"
    }
  ],
  "object": "list"
}
```

## ​
Experimental Endpoint

This is an experimental endpoint and may be subject to change.

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-b1bd9f3e-507b-46c5-ad35-be7419ea5ad3?action=share&creator=38652128&ctx=documentation&active-environment=38652128-ef110f4e-d3e1-43b5-8029-4d6877e62041).#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
object[]
required

The last 50 rate limit logs for the account.

Showchild attributes

​
object
enum<string>
required

Available options:`list`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/rate_limit_logs.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/rate_limit_logs)

Rate Limits and BalancesGet Character
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Email Protection | Cloudflare | URL: https://docs.venice.ai/cdn-cgi/l/email-protection ---

Please enable cookies.
# Email Protection

## You are unable to access this email address venice.ai

The website from which you got to this page is protected by Cloudflare. Email addresses on that page have been hidden in order to keep them from being accessed by malicious bots. **You must enable Javascript in your browser in order to decode the e-mail address**.

If you have a website and are interested in protecting it in a similar way, you can [sign up for Cloudflare](https://www.cloudflare.com/sign-up?utm_source=email_protection).

* [How does Cloudflare protect email addresses on website from spammers?](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)
* [Can I sign up for Cloudflare?](https://developers.cloudflare.com/fundamentals/setup/account/create-account/)

Cloudflare Ray ID: **98d2cbf5471c7bb8**• Your IP: 2a06:98c0:3600::103•Performance & security by[Cloudflare](https://www.cloudflare.com/5xx-error-landing)

--- Page Title: Venice API Docs: /models/compatibility_mapping | URL: https://docs.venice.ai/api-reference/endpoint/models/compatibility_mapping ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList Models

* GETCompatibility Mapping

* GETTraits

/api/v1/models/compatibility_mapping
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models/compatibility_mapping
```

Copy

Ask AI

```
{
  "data": {
    "gpt-4o": "llama-3.3-70b"
  },
  "object": "list",
  "type": "text"
}
```

GET
/
models
/
compatibility_mapping

/api/v1/models/compatibility_mapping
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models/compatibility_mapping
```

Copy

Ask AI

```
{
  "data": {
    "gpt-4o": "llama-3.3-70b"
  },
  "object": "list",
  "type": "text"
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-59dfa959-7038-4cd8-b8ba-80cf09f2f026?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

​
type
enum<string>
default:text

Filter models by type.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

#### Response

OK

​
data
object
required

List of available models

Showchild attributes

Example:
```
{ "gpt-4o": "llama-3.3-70b" }
```

​
object
enum<string>
required

Available options:`list`

​
type
Option 1 · enum<string>Option 2 · enum<string>

required

Type of models returned.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/models/compatibility_mapping.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/models/compatibility_mapping)

List ModelsTraits
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs: /models/traits | URL: https://docs.venice.ai/api-reference/endpoint/models/traits ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList Models

* GETCompatibility Mapping

* GETTraits

/api/v1/models/traits
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models/traits
```

Copy

Ask AI

```
{
  "data": {
    "default": "llama-3.3-70b",
    "fastest": "llama-3.2-3b-akash"
  },
  "object": "list",
  "type": "text"
}
```

GET
/
models
/
traits

/api/v1/models/traits
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/models/traits
```

Copy

Ask AI

```
{
  "data": {
    "default": "llama-3.3-70b",
    "fastest": "llama-3.2-3b-akash"
  },
  "object": "list",
  "type": "text"
}
```

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-59dfa959-7038-4cd8-b8ba-80cf09f2f026?action=share&source=copy-link&creator=38652128&ctx=documentation).---

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

​
type
enum<string>
default:text

Filter models by type.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

#### Response

OK

​
data
object
required

List of available models

Showchild attributes

Example:
```
{  "default": "llama-3.3-70b",  "fastest": "llama-3.2-3b-akash"}
```

​
object
enum<string>
required

Available options:`list`

​
type
Option 1 · enum<string>Option 2 · enum<string>

required

Type of models returned.

Available options:`embedding`,
`image`,
`text`,
`tts`,
`upscale`,
`inpaint`,
`video`

Example:`"text"`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/models/traits.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/models/traits)

Compatibility MappingList API Keys
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/list ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

/api/v1/api_keys
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyType": "ADMIN",
      "consumptionLimits": {
        "usd": 50,
        "diem": 10,
        "vcu": 30
      },
      "createdAt": "2023-10-01T12:00:00.000Z",
      "description": "Example API Key",
      "expiresAt": "2023-10-01T12:00:00.000Z",
      "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5",
      "last6Chars": "2V2jNW",
      "lastUsedAt": "2023-10-01T12:00:00.000Z",
      "usage": {
        "trailingSevenDays": {
          "usd": "10.2424",
          "vcu": "42.2315",
          "diem": "4.2231"
        }
      }
    }
  ],
  "object": "list"
}
```

GET
/
api_keys

/api/v1/api_keys
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyType": "ADMIN",
      "consumptionLimits": {
        "usd": 50,
        "diem": 10,
        "vcu": 30
      },
      "createdAt": "2023-10-01T12:00:00.000Z",
      "description": "Example API Key",
      "expiresAt": "2023-10-01T12:00:00.000Z",
      "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5",
      "last6Chars": "2V2jNW",
      "lastUsedAt": "2023-10-01T12:00:00.000Z",
      "usage": {
        "trailingSevenDays": {
          "usd": "10.2424",
          "vcu": "42.2315",
          "diem": "4.2231"
        }
      }
    }
  ],
  "object": "list"
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
object[]
required

List of active API keys

Showchild attributes

​
object
enum<string>
required

Available options:`list`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/list.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/list)

TraitsGet API Key Details
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/get ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

Get API key details by ID
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/{id} \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "apiKeyType": "ADMIN",
    "consumptionLimits": {
      "usd": 50,
      "diem": 10
    },
    "createdAt": {},
    "description": "Example API Key",
    "expiresAt": {},
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5",
    "last6Chars": "2V2jNW",
    "lastUsedAt": {},
    "usage": {
      "trailingSevenDays": {
        "usd": "10.2424",
        "vcu": "42.2315",
        "diem": "4.2231"
      }
    }
  }
}
```

GET
/
api_keys
/
{id}

Get API key details by ID
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/{id} \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": {
    "apiKeyType": "ADMIN",
    "consumptionLimits": {
      "usd": 50,
      "diem": 10
    },
    "createdAt": {},
    "description": "Example API Key",
    "expiresAt": {},
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5",
    "last6Chars": "2V2jNW",
    "lastUsedAt": {},
    "usage": {
      "trailingSevenDays": {
        "usd": "10.2424",
        "vcu": "42.2315",
        "diem": "4.2231"
      }
    }
  }
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

​
id
string
required

The ID of the API key to retrieve

#### Response

OK

​
data
object
required

API key details

Showchild attributes

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/get.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/get)

List API KeysCreate API Key
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/create ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

/api/v1/api_keys
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "apiKeyType": "ADMIN",
  "consumptionLimit": {
    "usd": 50,
    "diem": 10,
    "vcu": 30
  },
  "description": "Example API Key",
  "expiresAt": "2023-10-01T12:00:00.000Z"
}'
```

Copy

Ask AI

```
{
  "data": {
    "apiKey": "<string>",
    "apiKeyType": "ADMIN",
    "consumptionLimit": {
      "usd": 50,
      "diem": 10,
      "vcu": 30
    },
    "description": "Example API Key",
    "expiresAt": "2023-10-01T12:00:00.000Z",
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5"
  },
  "success": true
}
```

POST
/
api_keys

/api/v1/api_keys
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "apiKeyType": "ADMIN",
  "consumptionLimit": {
    "usd": 50,
    "diem": 10,
    "vcu": 30
  },
  "description": "Example API Key",
  "expiresAt": "2023-10-01T12:00:00.000Z"
}'
```

Copy

Ask AI

```
{
  "data": {
    "apiKey": "<string>",
    "apiKeyType": "ADMIN",
    "consumptionLimit": {
      "usd": 50,
      "diem": 10,
      "vcu": 30
    },
    "description": "Example API Key",
    "expiresAt": "2023-10-01T12:00:00.000Z",
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5"
  },
  "success": true
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

The request body for creating a new API key. API key creation is rate limited to 20 requests per minute and a maximum of 500 active API keys per user. VCU (Legacy Diem) is being deprecated in favor of tokenized Diem. Please update your API calls to use Diem instead.

​
apiKeyType
enum<string>
required

The API Key type. Admin keys have full access to the API while inference keys are only able to call inference endpoints.

Available options:`INFERENCE`,
`ADMIN`

Example:`"ADMIN"`

​
description
string
required

The API Key description

Example:`"Example API Key"`

​
consumptionLimit
object

The API Key consumption limits for each epoch.

Showchild attributes

Example:
```
{ "usd": 50, "diem": 10, "vcu": 30 }
```

​
expiresAt
Option 1 · enum<string>Option 2 · stringOption 3 · string

The API Key expiration date. If not provided, the key will not expire.

Available options:``

Example:`"2023-10-01T12:00:00.000Z"`

#### Response

OK

​
data
object
required

Showchild attributes

​
success
boolean
required

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/create.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/create)

Get API Key DetailsDelete API Key
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/delete ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

/api/v1/api_keys
Copy

Ask AI

```
curl --request DELETE \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "success": true
}
```

DELETE
/
api_keys

/api/v1/api_keys
Copy

Ask AI

```
curl --request DELETE \
  --url https://api.venice.ai/api/v1/api_keys \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "success": true
}
```

#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

​
id
string

The ID of the API key to delete

#### Response

OK

​
success
boolean
required

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/delete.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/delete)

Create API KeyGenerate API Key with Web3 Wallet
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice API Docs | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/generate_web3_key/post ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETList API Keys

* GETGet API Key Details

* POSTCreate API Key

* DELDelete API Key

* GETGenerate API Key with Web3 Wallet

* POSTGenerate API Key with Web3 Wallet

/api/v1/api_keys/generate_web3_key
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key \
  --header 'Content-Type: application/json' \
  --data '{
  "apiKeyType": "ADMIN",
  "consumptionLimit": {
    "usd": 50,
    "diem": 10,
    "vcu": 30
  },
  "description": "Web3 API Key",
  "expiresAt": "2023-10-01T12:00:00.000Z",
  "address": "0x45B73055F3aDcC4577Bb709db10B19d11b5c94eE",
  "signature": "0xbb5ff2e177f3a97fa553057864ad892eb64120f3eaf9356b4742a10f9a068d42725de895b5e45160b679cbe6961dc4cb552ba10dc97bdd8258d9154810785c451c",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}'
```

Copy

Ask AI

```
{
  "data": {
    "apiKey": "<string>",
    "apiKeyType": "ADMIN",
    "consumptionLimit": {
      "usd": 50,
      "diem": 10,
      "vcu": 30
    },
    "description": "Example API Key",
    "expiresAt": "2023-10-01T12:00:00.000Z",
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5"
  },
  "success": true
}
```

POST
/
api_keys
/
generate_web3_key

/api/v1/api_keys/generate_web3_key
Copy

Ask AI

```
curl --request POST \
  --url https://api.venice.ai/api/v1/api_keys/generate_web3_key \
  --header 'Content-Type: application/json' \
  --data '{
  "apiKeyType": "ADMIN",
  "consumptionLimit": {
    "usd": 50,
    "diem": 10,
    "vcu": 30
  },
  "description": "Web3 API Key",
  "expiresAt": "2023-10-01T12:00:00.000Z",
  "address": "0x45B73055F3aDcC4577Bb709db10B19d11b5c94eE",
  "signature": "0xbb5ff2e177f3a97fa553057864ad892eb64120f3eaf9356b4742a10f9a068d42725de895b5e45160b679cbe6961dc4cb552ba10dc97bdd8258d9154810785c451c",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}'
```

Copy

Ask AI

```
{
  "data": {
    "apiKey": "<string>",
    "apiKeyType": "ADMIN",
    "consumptionLimit": {
      "usd": 50,
      "diem": 10,
      "vcu": 30
    },
    "description": "Example API Key",
    "expiresAt": "2023-10-01T12:00:00.000Z",
    "id": "e28e82dc-9df2-4b47-b726-d0a222ef2ab5"
  },
  "success": true
}
```

## ​
Autonomous Agent API Key Creation

Please see this guide on how to use this endpoint.---

#### Body

application/json

​
apiKeyType
enum<string>
required

The API Key type. Admin keys have full access to the API while inference keys are only able to call inference endpoints.

Available options:`INFERENCE`,
`ADMIN`

Example:`"ADMIN"`

​
address
string
required

The wallet's address

Example:`"0x45B73055F3aDcC4577Bb709db10B19d11b5c94eE"`

​
signature
string
required

The token, signed with the wallet's private key

Example:`"0xbb5ff2e177f3a97fa553057864ad892eb64120f3eaf9356b4742a10f9a068d42725de895b5e45160b679cbe6961dc4cb552ba10dc97bdd8258d9154810785c451c"`

​
token
string
required

The token obtained from [https://api.venice.ai/api/v1/api_keys/generate_web3_key](https://api.venice.ai/api/v1/api_keys/generate_web3_key)

Example:`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"`

​
consumptionLimit
object

The API Key consumption limits for each epoch.

Showchild attributes

Example:
```
{ "usd": 50, "diem": 10, "vcu": 30 }
```

​
description
string
default:Web3 API Key

The API Key description

Example:`"Web3 API Key"`

​
expiresAt
Option 1 · enum<string>Option 2 · stringOption 3 · string

The API Key expiration date. If not provided, the key will not expire.

Available options:``

Example:`"2023-10-01T12:00:00.000Z"`

#### Response

200 - application/json

OK

​
data
object
required

Showchild attributes

​
success
boolean
required

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/generate_web3_key/post.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/generate_web3_key/post)

Generate API Key with Web3 WalletRate Limits and Balances
⌘I

Assistant

Responses are generated using AI and may contain mistakes.

--- Page Title: Venice.ai View API Key Rate Limit Log | URL: https://docs.venice.ai/api-reference/endpoint/api_keys/rate_limit_logs ---

Skip to main content[Venice API Docs home page](https://venice.ai/)

OverviewAPI Reference[Changelog](https://featurebase.venice.ai/changelog)[Status Page](https://veniceai-status.com/)

##### Venice APIs

* Introduction

* Rate Limits

* Error Codes

* * GETRate Limits and Balances

* GETRate Limit Logs

/api/v1/api_keys/rate_limits/log
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits/log \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyId": "<string>",
      "modelId": "venice-uncensored",
      "rateLimitTier": "paid",
      "rateLimitType": "RPM",
      "timestamp": "2023-10-01T12:00:00.000Z"
    }
  ],
  "object": "list"
}
```

GET
/
api_keys
/
rate_limits
/
log

/api/v1/api_keys/rate_limits/log
Copy

Ask AI

```
curl --request GET \
  --url https://api.venice.ai/api/v1/api_keys/rate_limits/log \
  --header 'Authorization: Bearer <token>'
```

Copy

Ask AI

```
{
  "data": [
    {
      "apiKeyId": "<string>",
      "modelId": "venice-uncensored",
      "rateLimitTier": "paid",
      "rateLimitType": "RPM",
      "timestamp": "2023-10-01T12:00:00.000Z"
    }
  ],
  "object": "list"
}
```

## ​
Experimental Endpoint

This is an experimental endpoint and may be subject to change.

## ​
Postman Collection

For additional examples, please see this [Postman Collection](https://www.postman.com/veniceai/workspace/venice-ai-workspace/folder/38652128-b1bd9f3e-507b-46c5-ad35-be7419ea5ad3?action=share&creator=38652128&ctx=documentation&active-environment=38652128-ef110f4e-d3e1-43b5-8029-4d6877e62041).#### Authorizations

​
Authorization
string
header
required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

OK

​
data
object[]
required

The last 50 rate limit logs for the account.

Showchild attributes

​
object
enum<string>
required

Available options:`list`

[Suggest edits](https://github.com/veniceai/api-docs/edit/main/api-reference/endpoint/api_keys/rate_limit_logs.mdx)[Raise issue](https://github.com/veniceai/api-docs/issues/new?title=Issue%20on%20docs&body=Path:%20/api-reference/endpoint/api_keys/rate_limit_logs)

Rate Limits and BalancesGet Character
⌘I

Assistant

Responses are generated using AI and may contain mistakes.