# dsh-gitnexus-plugin

DeepSeek Harness (DSH) profile bundle: **GitNexus MCP integration** — indexes codebases into knowledge graphs and exposes `mcp__gitnexus__*` tools so agents can analyze dependencies, call chains, and execution flows with architectural clarity.

Built on [GitNexus](https://github.com/abhigyanpatwari/GitNexus).

## Install via repo URL

From the DSH plugin hub / profile bundles UI, install with the repo URL:

```
https://github.com/akash-digitavision/dsh-gitnexus-plugin
```

Or via the DSH CLI (depending on your harness build):

```
dsh plugin install https://github.com/akash-digitavision/dsh-gitnexus-plugin
```

Then **restart DeepSeek Harness** — every agent and preset on the profile sees the `mcp__gitnexus__*` tools.

## Prerequisites

| Requirement | Install | Notes |
| --- | --- | --- |
| Node.js ≥ 20 | https://nodejs.org/ | Required by GitNexus |
| GitNexus CLI (recommended) | `npm i -g gitnexus` | Fastest MCP startup — no `npx` cold-cache delay |

The bundle spawns the GitNexus stdio MCP server (`gitnexus mcp`), which serves **all** indexed repos. Index any repo you want queryable:

```
cd your-repo
gitnexus analyze        # or: npx gitnexus@latest analyze
```

## Configuration

Command resolution for the MCP row:

1. `GITNEXUS_COMMAND` env var (absolute path to the `gitnexus` launcher) — takes precedence;
2. otherwise `gitnexus` from `PATH`.

**Windows note:** npm's global `gitnexus` is a `.cmd` shim. If the MCP client cannot spawn it, pin it explicitly and restart DSH:

```
setx GITNEXUS_COMMAND "%APPDATA%\npm\gitnexus.cmd"
```

## Tools exposed

| Tool | Use for |
| --- | --- |
| `query` | Concept / execution-flow search across the graph |
| `context` | Full context for a named symbol |
| `impact` | Blast radius before editing a symbol (callers, processes, risk) |
| `explain` | Taint findings & structural explanation of a file/symbol |
| `detect_changes` | Graph change analysis before committing |
| `rename` | Call-graph-aware symbol rename |

Exact surface depends on your GitNexus version (`gitnexus --version`). Resources such as `gitnexus://repo/<name>/context`, `/clusters`, `/processes` are also served per indexed repo.

## What this bundle does

`cordis.patch.yml` inserts one HOST-plane row:

- `mcp-gitnexus` → `@deepseek-ai/dsh-mcp-client`, `transport: stdio`, `command: gitnexus`, `args: ['mcp']`, 120 s tool timeout, non-fatal on startup error (the server simply stays absent if GitNexus is not installed).

`index.js` is a behaviour-free resolvable entry shim satisfying the DSH plugin-spec check — configuration is supplied entirely by the patch file.

## License

MIT — see [LICENSE](LICENSE).
