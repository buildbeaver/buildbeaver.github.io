---
sidebar_position: 1
---

# Run

Run provides you with the ability to run one or more workflows from your build.

```bash
bb run [workflow]... [flags]
```

**Arguments**

| Argument | Description |
| ----------- | ----------- |
| workflow | A list of workflows to run as defined in your build, leave empty to run all workflows. |

**Flags**

| Flags | Description |
| ----------- | ----------- |
| -f, --force | Force all jobs to re-run by ignoring fingerprints |
| -v, --verbose | Enable verbose log output |
| --workdir string | The scratch space to use for local builds (default "~/.bb/local") |

[Global flags](./global-flags) can be included with this command too.

## Example: Run all jobs

```bash
bb run
```

```bash
bb run -v
```