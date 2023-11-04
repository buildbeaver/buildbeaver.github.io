---
sidebar_position: 2
---

# Run the Go Build

The Go program that defines the build runs as a regular Job, defined using the YAML syntax.

## Tell BuildBeaver how to run your Go build program

To set up a job to compile and run your Go build, edit the ``buildbeaver.yml`` file you set up earlier to read:

```yaml
jobs:
  - name: dynamic-build
    description: Compile and run the dynamic build Go-based job
    docker:
      image: golang:1.17.13
      pull: if-not-exists
      shell: /bin/bash
    steps:
      - name: compile
        commands: |
          . build/go-env.sh
          echo "Building: ${GOBIN}/builder"
          cd build && go build -mod=vendor -o "${GOBIN}/builder" .
      - name: run-dynamic-build-job
        commands: |
          . build/go-env.sh
          echo "Running: ${GOBIN}/builder"
          ${GOBIN}/builder
```

This Job uses a script file at `build/go-env.sh` to set up Go path variables so that the local Go cache will be
preserved between builds. This isn't strictly needed, but speeds up the running the Go build program:

```bash
#!/bin/bash
set -e

REPO_DIR=$(realpath "$(git rev-parse --show-toplevel)")
export REPO_DIR

BUILD_DIR="${REPO_DIR}/build/output"
export BUILD_DIR

export GODIR="${BUILD_DIR}/go"
export GOBIN="${GODIR}/bin"
export GOCACHE="${GODIR}/cache"

mkdir -p "${GOCACHE}" "${GOBIN}"
```

## Run the build

Type the following to run the build.

```bash
bb run
```
```
✓ .dynamic-build          succeeded                                                             7.7s
✓ test-workflow.run-tests succeeded                                                            500ms
```

We can see that two jobs were run; the dynamic build job (our Go program) and the 'run-tests' job that it
submitted.

Try running the build using the '-v' option to see the logging from each job.

```bash
bb run -v
```
