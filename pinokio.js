module.exports = {
  version: "6.0",

  // Plugin launchers keep their metadata in the root `pinokio.js`.
  // Do not split this plugin into app-launcher files.
  title: "OpenClaude",
  icon: "icon.svg",
  description: "Open-source coding-agent CLI for OpenAI, Gemini, GitHub Models, Codex, Ollama, and OpenAI-compatible APIs.",
  link: "https://github.com/Gitlawb/openclaude",

  // Keep this as a Pinokio plugin launcher.
  path: "plugin",

  install: [{
    method: "shell.run",
    params: {
      message: "npm install -g @gitlawb/openclaude@latest"
    }
  }],

  uninstall: [{
    method: "shell.run",
    params: {
      message: "npm uninstall -g @gitlawb/openclaude"
    }
  }, {
    method: "fs.rm",
    params: {
      path: "."
    }
  }],

  update: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      message: "npm install -g @gitlawb/openclaude@latest"
    }
  }],

  run: [{
    id: "run",
    method: "shell.run",
    params: {
      // Run inside the caller's project so OpenClaude operates on that folder.
      message: "openclaude",
      path: "{{args.cwd}}",
      input: true
    }
  }]
}
