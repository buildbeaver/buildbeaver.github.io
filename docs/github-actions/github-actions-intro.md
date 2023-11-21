---
sidebar_position: 1
---

# Using BuildBeaver with GitHub Actions

Assuming you have BuildBeaver set up to build your repository using either [Go](../getting-started-go/create-a-build-in-go.md) or [YAML](../yaml-guide/yaml.md) then integrating
with GitHub actions is as easy as adding the [setup-bb GitHub Action](https://github.com/buildbeaver/setup-bb) into your GitHub workflows.

Try creating a YAML file for a GitHub Actions workflow in your repo, e.g. ``.github/workflows/bb-run.yml``, and
paste in the following content, editing the artifacts definitions to match your BuildBeaver build:

```yaml
name: Build using BuildBeaver

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
        version: '1.0.0'
        args: '-v'
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: report-artifacts
        path: reports/test-report.txt
```

:::tip

Any environment variables available on the runner will be accessible by the BB CLI as it executes.

:::

---

## Usage

#### Run the BuildBeaver CLI within your repository

The following GitHub Actions workflow YAML will install the default version of BB CLI (see [Inputs](#inputs))
into your Runner's path and execute `bb run` to build your repo:

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

#### Install the BuildBeaver CLI into your PATH without running

The following GitHub Actions workflow YAML will install the default version of BB CLI into your Runner's path but
not run the tool. Any execution of bb is up to you to add later:

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

---

## Inputs

The following inputs can be used as `step.with` keys

| Name | Type | Default | Description                                                                                               |
| ----------- | ----------- | ----------- |-----------------------------------------------------------------------------------------------------------|
| version | String | 1.0.0 | The version of the BuildBeaver CLI to install (e.g. from https://github.com/buildbeaver/bb-cli/releases ) |
| install-only | Boolean | false | Set to true install but not run the BuildBeaver CLI, accessible via the runner's PATH                     |
| args | String | '' | Any additional args to pass to the [run command](../cli-reference/command-run.md)                         |