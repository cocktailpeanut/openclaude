# OpenClaude Pinokio Plugin

This folder is a Pinokio plugin launcher for [Gitlawb/openclaude](https://github.com/Gitlawb/openclaude).

It installs the published `@gitlawb/openclaude` CLI globally and launches `openclaude` inside the caller's current project folder so the agent works against the project you opened in Pinokio.

## What It Does

- installs OpenClaude with one click from Pinokio
- updates the plugin checkout and the global OpenClaude package
- runs OpenClaude as an interactive terminal agent in the current project
- leaves provider configuration to the user through environment variables or OpenClaude's built-in onboarding commands

## How To Use

1. Install the plugin from Pinokio.
2. Open any project folder in Pinokio.
3. Launch `OpenClaude` from that folder.
4. Inside the OpenClaude terminal, run `/provider` for guided provider setup.
5. If you want GitHub Models specifically, run `/onboard-github`.

## Provider Setup

OpenClaude supports multiple backends. Common environment variable setups from the upstream project:

### OpenAI-compatible APIs

```bash
export CLAUDE_CODE_USE_OPENAI=1
export OPENAI_API_KEY=sk-your-key-here
export OPENAI_MODEL=gpt-4o
```

### Gemini

```bash
export CLAUDE_CODE_USE_GEMINI=1
export GEMINI_API_KEY=your-gemini-key-here
export GEMINI_MODEL=gemini-2.0-flash
```

### GitHub Models

```bash
export CLAUDE_CODE_USE_GITHUB=1
export GITHUB_TOKEN=ghp-your-token-here
```

### Ollama

```bash
export CLAUDE_CODE_USE_OPENAI=1
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_API_KEY=ollama
export OPENAI_MODEL=llama3.2
```

You can also skip manual environment setup and use OpenClaude's in-app `/provider` flow where supported.

## Programmatic Access

This Pinokio plugin does not expose an HTTP server. It launches an interactive terminal application.

### JavaScript

Launch OpenClaude from Node.js with inherited terminal I/O:

```js
const { spawn } = require("node:child_process")

const child = spawn("openclaude", {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: true
})

child.on("exit", (code) => {
  process.exit(code ?? 0)
})
```

### Python

Launch OpenClaude from Python with inherited terminal I/O:

```python
import os
import subprocess

raise SystemExit(
    subprocess.run(["openclaude"], cwd=os.getcwd()).returncode
)
```

### Curl

There is no plugin-managed HTTP endpoint to call with `curl`. If you need HTTP automation, call your selected model provider's API directly instead of this terminal plugin.

## Notes

- Upstream install command: `npm install -g @gitlawb/openclaude`
- Upstream start command: `openclaude`
- If OpenClaude reports `ripgrep not found`, install `ripgrep` and confirm `rg --version` works in the same terminal session before launching again.
- Upstream repository: <https://github.com/Gitlawb/openclaude>
