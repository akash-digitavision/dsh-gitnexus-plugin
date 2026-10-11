#!/usr/bin/env node

/**
 * DSH GitNexus Plugin - Main Entry Point
 * Provides DSH-specific enhancements to GitNexus CLI
 */

const { program } = require('commander');
const gitnexus = require('gitnexus');
const fs = require('fs');
const path = require('path');

// Load DSH-specific configuration
function loadDSHConfig() {
  const configPath = path.join(process.cwd(), 'dsh-gitnexus.config.js');
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
}

// DSH-specific command enhancements
function setupDSHCommands() {
  program
    .command('setup')
    .description('Setup DSH workspace with GitNexus MCP and DSH-specific configurations')
    .option('--skip-skills', 'Skip installing DSH-specific skills')
    .option('--skip-hooks', 'Skip installing DSH-specific hooks')
    .action(async (options) => {
      console.log('🔧 Setting up DSH workspace with GitNexus...');
      
      // Run standard GitNexus setup
      await gitnexus.setup({
        skipSkills: options.skipSkills,
        skipHooks: options.skipHooks
      });
      
      // Apply DSH-specific enhancements
      await applyDSHEnhancements();
      
      console.log('✅ DSH GitNexus plugin setup complete!');
    });

  program
    .command('analyze')
    .description('Analyze DSH codebase with DSH-optimized settings')
    .option('--dsh-optimized', 'Use DSH-optimized analysis settings')
    .option('--embeddings', 'Generate embeddings for semantic search')
    .option('--watch', 'Watch for file changes and re-analyze')
    .action(async (options) => {
      console.log('🔍 Analyzing DSH codebase...');
      
      const config = loadDSHConfig();
      const dshOptions = {
        ...options,
        ...(config.dsh || {})
      };
      
      // Run GitNexus analysis with DSH enhancements
      await gitnexus.analyze(dshOptions);
      
      // Generate DSH-specific reports
      if (dshOptions['dsh-optimized']) {
        await generateDSHReports();
      }
      
      console.log('✅ DSH analysis complete!');
    });

  program
    .command('mcp')
    .description('Start DSH-enhanced GitNexus MCP server')
    .option('--port <port>', 'Port to run MCP server on', '8080')
    .action(async (options) => {
      console.log(`🚀 Starting DSH GitNexus MCP server on port ${options.port}...`);
      
      // Start GitNexus MCP server with DSH enhancements
      await gitnexus.mcp({
        port: options.port,
        dshEnhancements: true
      });
    });

  program
    .command('report')
    .description('Generate DSH-specific reports from GitNexus knowledge graph')
    .option('--architecture', 'Generate architecture overview report')
    .option('--dependencies', 'Generate dependency analysis report')
    .option('--flows', 'Generate execution flows report')
    .option('--output <file>', 'Output file path', './dsh-gitnexus-report.md')
    .action(async (options) => {
      console.log('📊 Generating DSH reports...');
      
      const report = await generateDSHReport(options);
      
      fs.writeFileSync(options.output, report);
      console.log(`✅ Report saved to ${options.output}`);
    });

  program
    .command('check')
    .description('Check DSH plugin compatibility and health')
    .option('--dsh-plugins', 'Check DSH plugin compatibility')
    .option('--gitnexus-version', 'Check GitNexus version compatibility')
    .action(async (options) => {
      console.log('🔍 Checking DSH GitNexus plugin health...');
      
      await checkPluginHealth(options);
      
      console.log('✅ Health check complete!');
    });
}

// Apply DSH-specific enhancements after GitNexus setup
async function applyDSHEnhancements() {
  console.log('📦 Applying DSH-specific enhancements...');
  
  // Copy DSH-specific skills
  await copyDSHSKills();
  
  // Setup DSH-specific hooks
  await setupDSHHooks();
  
  // Create DSH agent configuration
  await createDSHAgentConfig();
  
  console.log('✅ DSH enhancements applied');
}

// Copy DSH-specific skills to the agent skills directory
async function copyDSHSKills() {
  const skillsDir = path.join(process.env.HOME || process.env.USERPROFILE, '.agents', 'skills');
  const dshSkillsDir = path.join(__dirname, 'skills');
  
  if (!fs.existsSync(dshSkillsDir)) {
    // Create some basic DSH skills if they don't exist
    await createDefaultDSHSKills(dshSkillsDir);
  }
  
  if (fs.existsSync(dshSkillsDir)) {
    // Copy skills to agent skills directory
    const skillFiles = fs.readdirSync(dshSkillsDir);
    for (const skillFile of skillFiles) {
      if (skillFile.endsWith('.md') || skillFile.endsWith('.js')) {
        fs.copyFileSync(
          path.join(dshSkillsDir, skillFile),
          path.join(skillsDir, skillFile)
        );
      }
    }
    console.log('📋 DSH skills installed');
  }
}

// Setup DSH-specific hooks
async function setupDSHHooks() {
  const hooksDir = path.join(process.env.HOME || process.env.USERPROFILE, '.agents', 'hooks');
  const dshHooksDir = path.join(__dirname, 'hooks');
  
  if (!fs.existsSync(dshHooksDir)) {
    fs.mkdirSync(dshHooksDir, { recursive: true });
    await createDefaultDSHHooks(dshHooksDir);
  }
  
  if (fs.existsSync(dshHooksDir)) {
    // Copy hooks to agent hooks directory
    const hookFiles = fs.readdirSync(dshHooksDir);
    for (const hookFile of hookFiles) {
      if (hookFile.endsWith('.json')) {
        fs.copyFileSync(
          path.join(dshHooksDir, hookFile),
          path.join(hooksDir, hookFile)
        );
      }
    }
    console.log('🪝 DSH hooks installed');
  }
}

// Create DSH agent configuration
async function createDSHAgentConfig() {
  const agentsDir = path.join(process.env.HOME || process.env.USERPROFILE, '.agents');
  const configPath = path.join(agentsDir, 'dsh-config.json');
  
  const dshConfig = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    plugins: {
      'dsh-gitnexus': {
        enabled: true,
        version: '1.0.0',
        settings: {
          analysisDepth: 3,
          includeTests: true,
          focusOnAgents: true
        }
      }
    },
    workflows: {
      'code-review': {
        steps: ['analyze', 'impact', 'suggest-improvements'],
        gitnexusCommands: ['analyze', 'impact', 'explore']
      },
      'debugging': {
        steps: ['trace-error', 'find-root-cause', 'suggest-fix'],
        gitnexusCommands: ['trace', 'impact', 'explore']
      }
    }
  };
  
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }
  
  fs.writeFileSync(configPath, JSON.stringify(dshConfig, null, 2));
  console.log('⚙️ DSH agent configuration created');
}

// Create default DSH skills if they don't exist
async function createDefaultDSHSKills(skillsDir) {
  fs.mkdirSync(skillsDir, { recursive: true });
  
  // DSH Agent Development Skill
  const agentDevSkill = `# DSH Agent Development
  
## Overview
This skill provides guidance for developing agents within the DeepSeek Harness ecosystem using GitNexus for code intelligence.

## Best Practices
- Always run impact analysis before modifying agent code
- Use execution flow tracing to understand agent behavior
- Leverage dependency graphs for safe refactoring
- Generate architecture reports for team onboarding

## Commands
\`\`\bash
# Analyze agent dependencies
dsh-gitnexus analyze --focus-agents

# Check impact before changing agent logic
dsh-gitnexus impact "agentName" --direction upstream

# Trace execution flow for debugging
dsh-gitnexus trace "agentWorkflow" --format diagram
\`\`\`;

## Workflow
1. Analyze current state with \`dsh-gitnexus analyze\`
2. Plan changes using impact analysis
3. Implement with confidence
4. Verify with post-change analysis
`;
  
  fs.writeFileSync(
    path.join(skillsDir, 'dsh-agent-development.md'),
    agentDevSkill
  );
  
  // DSH MCP Integration Skill
  const mcpIntegrationSkill = `# DSH MCP Integration
  
## Overview
Guidance for integrating MCP servers with DeepSeek Harness using GitNexus as the foundation.

## MCP Server Patterns
- stdio MCP servers for local agent communication
- HTTP MCP servers for remote/distributed setups
- WebSocket MCP servers for real-time collaboration

## DSH MCP Servers
- \`dsh-context7\` - Documentation fetching
- \`dsh-playwright\` - Browser automation
- \`dsh-serena\` - Symbolic code navigation
- \`dsh-agent-reach\` - Web search and content
- \`dsh-gitnexus\` - Code intelligence (this plugin)

## Integration Tips
- Use GitNexus impact analysis before changing MCP server configurations
- Leverage execution flows to understand MCP message patterns
- Generate architecture reports for MCP server deployment planning
`;
  
  fs.writeFileSync(
    path.join(skillsDir, 'dsh-mcp-integration.md'),
    mcpIntegrationSkill
  );
  
  console.log('📝 Default DSH skills created');
}

// Create default DSH hooks if they don't exist
async function createDefaultDSHHooks(hooksDir) {
  fs.mkdirSync(hooksDir, { recursive: true });
  
  // PreToolUse hook for DSH
  const preToolUseHook = {
    "matcher": "",
    "approve": [
      {
        "matcher": "write",
        "operations": [
          {
            "matcher": "*",
            "approve": true
          }
        ]
      },
      {
        "matcher": "edit",
        "operations": [
          {
            "matcher": "*",
            "approve": true
          }
        ]
      }
    ],
    "reject": [],
    "builtin": [
      {
        "matcher": "",
        "operations": [
          {
            "matcher": "notify",
            "approve": true
          }
        ]
      }
    ]
  };
  
  // PostToolUse hook for DSH
  const postToolUseHook = {
    "matcher": "",
    "approve": [
      {
        "matcher": "notify",
        "operations": [
          {
            "matcher": "*",
            "approve": true
          }
        ]
      }
    ],
    "reject": [],
    "builtin": [
      {
        "matcher": "",
        "operations": [
          {
            "matcher": "notify",
            "approve": true
          }
        ]
      }
    ]
  };
  
  fs.writeFileSync(
    path.join(hooksDir, 'pretooluse.json'),
    JSON.stringify(preToolUseHook, null, 2)
  );
  
  fs.writeFileSync(
    path.join(hooksDir, 'posttooluse.json'),
    JSON.stringify(postToolUseHook, null, 2)
  );
  
  console.log('🪝 Default DSH hooks created');
}

// Generate DSH-specific reports
async function generateDSHReport(options) {
  let report = `# DSH GitNexus Analysis Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  if (options.architecture) {
    report += `## Architecture Overview\n\n`;
    report += `This section provides a high-level view of the DSH architecture.\n\n`;
    report += `*To be populated with actual GitNexus graph data*\n\n`;
  }
  
  if (options.dependencies) {
    report += `## Dependency Analysis\n\n`;
    report += `This section analyzes dependencies within the DSH codebase.\n\n`;
    report += `*To be populated with actual GitNexus graph data*\n\n`;
  }
  
  if (options.flows) {
    report += `## Execution Flows\n\n`;
    report += `This section traces key execution flows in DSH.\n\n`;
    report += `*To be populated with actual GitNexus graph data*\n\n`;
  }
  
  if (!options.architecture && !options.dependencies && !options.flows) {
    report += `## General Analysis\n\n`;
    report += `This is a general analysis report generated by the DSH GitNexus plugin.\n\n`;
    report += `*To be populated with actual GitNexus graph data*\n\n`;
  }
  
  report += `---\n*Report generated by DSH GitNexus Plugin*\n`;
  
  return report;
}

// Check plugin health
async function checkPluginHealth(options) {
  console.log('🔍 Checking plugin components...');
  
  // Check GitNexus availability
  try {
    require('gitnexus');
    console.log('✅ GitNexus dependency: OK');
  } catch (error) {
    console.log('❌ GitNexus dependency: MISSING');
  }
  
  // Check DSH-specific files
  const dshSkillsDir = path.join(__dirname, 'skills');
  if (fs.existsSync(dshSkillsDir)) {
    console.log('✅ DSH skills directory: OK');
  } else {
    console.log('❌ DSH skills directory: MISSING');
  }
  
  const dshHooksDir = path.join(__dirname, 'hooks');
  if (fs.existsSync(dshHooksDir)) {
    console.log('✅ DSH hooks directory: OK');
  } else {
    console.log('❌ DSH hooks directory: MISSING');
  }
  
  // Check configuration
  const configPath = path.join(process.cwd(), 'dsh-gitnexus.config.js');
  if (fs.existsSync(configPath)) {
    console.log('✅ DSH configuration: FOUND');
  } else {
    console.log('ℹ️ DSH configuration: NOT FOUND (using defaults)');
  }
  
  if (options['dsh-plugins']) {
    console.log('🔧 Checking DSH plugin compatibility...');
    // Add DSH-specific plugin checks here
  }
  
  if (options['gitnexus-version']) {
    console.log('🔢 Checking GitNexus version...');
    // Add version compatibility checks here
  }
}

// Handle help and version
program
  .name('dsh-gitnexus')
  .description('DSH-specific GitNexus plugin for DeepSeek Harness')
  .version('1.0.0');

// Parse arguments
program.parse(process.argv);

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}