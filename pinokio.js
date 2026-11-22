module.exports = {
  version: "8.0",

  // Plugin launchers keep their metadata in the root `pinokio.js`.
  // Do not split this plugin into app-launcher files.
  title: "OpenClaude",
  icon: "icon.png",
  description: "Open-source coding-agent CLI for OpenAI, Gemini, GitHub Models, Codex, Ollama, and OpenAI-compatible APIs.",
  link: "https://github.com/Twigpine/openclaude",

  // Keep this as a Pinokio plugin launcher.
  path: "plugin",

  async installed(kernel) {
    return Boolean(kernel.which("openclaude"))
  },

  install: [{
    method: "shell.run",
    params: {
      message: "npm install -g @twigpine/openclaude@latest"
    }
  }],

  uninstall: [{
    method: "shell.run",
    params: {
      message: "npm uninstall -g @twigpine/openclaude@latest"
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
      message: "npm install -g @twigpine/openclaude@latest"
    }
  }],

  run: [{
    id: "run",
    method: "shell.run",
    params: {
      // Run inside the caller's project so OpenClaude operates on that folder.
      message: {
        _: ["openclaude",  "{{args.prompt || ''}}"],
      path: "{{args.cwd}}",
      input: true
    }
  }]
}
