# DSH GitNexus Plugin

A DeepSeek Harness-specific plugin for GitNexus that provides enhanced code intelligence capabilities tailored for DSH workflows.

## Features

- 🔍 Deep code dependency analysis
- 📊 Execution flow tracing
- ⚡ Impact analysis before code changes
- 🔧 Refactoring assistance with graph awareness
- 🐛 Debugging with call graph traversal
- 📈 Architecture exploration and visualization

## Installation

### Option 1: Install from GitHub (Recommended)

```bash
npm install -g https://github.com/yourusername/dsh-gitnexus-plugin.git
```

### Option 2: Install from local directory

```bash
# Clone the repository
git clone https://github.com/yourusername/dsh-gitnexus-plugin.git
cd dsh-gitnexus-plugin

# Install dependencies
npm install

# Link globally for development
npm link
```

## Usage

### Setup DSH Workspace

```bash
dsh-gitnexus setup
```

### Analyze DSH Codebase

```bash
dsh-gitnexus analyze
```

### Start MCP Server

```bash
dsh-gitnexus mcp
```

### Check Status

```bash
dsh-gitnexus status
```

## DSH-Specific Commands

The plugin includes DSH-tailored commands:

```bash
# Analyze with DSH-optimized settings
dsh-gitnexus analyze --dsh-optimized

# Generate DSH architecture report
dsh-gitnexus report --architecture

# Check DSH plugin compatibility
dsh-gitnexus check --dsh-plugins
```

## Configuration

Create a `dsh-gitnexus.config.js` file in your DSH workspace root:

```javascript
module.exports = {
  // DSH-specific analysis settings
  dsh: {
    // Skip analysis of certain DSH internal files
    skipInternal: true,
    
    // Focus on agent skills and tools
    focusAgents: true,
    
    // Enhanced debugging for DSH workflows
    debugEnhancements: true,
    
    // Custom file patterns for DSH
    filePatterns: [
      "**/*.js",
      "**/*.ts",
      "**/*.py",
      "!**/node_modules/**",
      "!**/.git/**"
    ]
  },
  
  // GitNexus standard settings
  gitnexus: {
    // Your GitNexus configuration here
  }
};
```

## Integration with DSH Tools

This plugin works seamlessly with other DSH MCP servers:

- 🔗 `dsh-context7` - For up-to-date documentation
- 🎭 `dsh-playwright` - For browser automation testing
- 🤖 `dsh-serena` - For symbolic code navigation
- 🌐 `dsh-agent-reach` - For web search and content fetching

## Development

To contribute to this plugin:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built upon [GitNexus](https://github.com/abhigyanpatwari/GitNexus) - the original code intelligence platform
- DeepSeek Harness team for the DSH ecosystem
- Open source community for MCP standards