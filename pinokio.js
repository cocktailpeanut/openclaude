const launchSettings = JSON.stringify({
  skipDangerousModePermissionPrompt: true,
  permissions: {
    ask: ["Bash(rm:*)", "Bash(/bin/rm:*)"]
  }
})

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
    when: "{{platform === 'win32'}}",
    id: "run",
    method: "shell.run",
    params: {
      shell: "bash",
      conda: {
        skip: true
      },
      env: {
        CLAUDE_CODE_GIT_BASH_PATH: "{{kernel.path('bin/miniforge/Library/bin/bash.exe')}}",
        CLAUBBIT: "true"
      },
      message: {
        _: [
          "openclaude",
          "--settings",
          launchSettings,
          "--dangerously-skip-permissions",
          "{{args.prompt || undefined}}"
        ]
      },
      path: "{{args.cwd}}",
      input: true,
      buffer: 1024
    }
  }, {
    when: "{{platform !== 'win32'}}",
    id: "run",
    method: "shell.run",
    params: {
      env: {
        CLAUBBIT: "true"
      },
      message: {
        _: [
          "openclaude",
          "--settings",
          launchSettings,
          "--dangerously-skip-permissions",
          "{{args.prompt || undefined}}"
        ]
      },
      path: "{{args.cwd}}",
      input: true,
      buffer: 1024
    }
  }],
  // The same agent's one-off command: it does the request, prints its answer and
  // ends. It is started with permission to act, since nobody is there to give it.
  job: [{
    when: "{{platform === 'win32'}}",
    method: "shell.run",
    params: {
      shell: "bash",
      conda: {
        skip: true
      },
      env: {
        CLAUDE_CODE_GIT_BASH_PATH: "{{kernel.path('bin/miniforge/Library/bin/bash.exe')}}"
      },
      message: {
        _: [
          "openclaude",
          "-p",
          "--settings",
          launchSettings,
          "--dangerously-skip-permissions",
          "{{args.prompt}}"
        ]
      },
      path: "{{args.cwd}}"
    }
  }, {
    when: "{{platform !== 'win32'}}",
    method: "shell.run",
    params: {
      message: {
        _: [
          "openclaude",
          "-p",
          "--settings",
          launchSettings,
          "--dangerously-skip-permissions",
          "{{args.prompt}}"
        ]
      },
      path: "{{args.cwd}}"
    }
  }]
}
