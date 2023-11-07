---
sidebar_position: 1
---

# Using BuildBeaver with GitHub Actions

Assuming you have BuildBeaver setup to build your repository using either [Go](../getting-started-go/create-a-build-in-go.md) or [YAML](../yaml-guide/yaml.md) then integrating with GitHub actions is as adding the [setup-bb GitHub Action](https://github.com/buildbeaver/setup-bb) into your GitHub workflows.

```yaml
name: Test workflow

on:
  push:
  workflow_dispatch:

jobs:
  build-acme:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Running BB CLI within your repository
    - name: Build using BB CLI
      uses: buildbeaver/setup-bb@main
      with:
        version: '0.0.1'
        args: '-v'
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: report-artifacts
        path: reports/test-report
```

:::tip

Any environment variables available on the runner will be accessible by the BB CLI as it executes.

:::

---

## Usage

#### Run the BuildBeaver CLI within your repository

```yaml
name: BuildBeaver

on:
  push:
  workflow_dispatch:

jobs:
  build-acme:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Running BB CLI within your repository
    - name: Build using BB CLI
      uses: buildbeaver/setup-bb@main
```

This will install the default version of BB CLI (as per [Inputs](#inputs)) into your Runners' path and execute `bb run`

#### Only install the BuildBeaver CLI into your PATH

```yaml
name: BuildBeaver

on:
  push:
  workflow_dispatch:

jobs:
  build-acme:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Installing BB CLI onto Runner's path
    - name: Build using BB CLI
      uses: buildbeaver/setup-bb@main
      with:
        install-only: true
```

This will only install the default version of BB CLI into your Runner's path, leaving any execution up to you.

---

## Inputs

The following inputs can be used as `step.with` keys

| Name | Type | Default | Description                                                                                               |
| ----------- | ----------- | ----------- |-----------------------------------------------------------------------------------------------------------|
| version | String | 1.0.0 | The version of the BuildBeaver CLI to install (e.g. from https://github.com/buildbeaver/bb-cli/releases ) |
| install-only | Boolean | false | Set to true to only install the BuildBeaver CLI accessible on the runners PATH                            |
| args | String | '' | Any additional args to pass to the [run command](../cli-reference/command-run.md)                         |