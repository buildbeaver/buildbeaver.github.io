---
sidebar_position: 2
---

# Run the Go Build

The Go program that defines the build runs as a regular Job, defined using the YAML syntax.

## Tell BuildBeaver how to run your Go build program

To set up a job to compile and run your Go build, edit the ``buildbeaver.yml`` file you set up earlier in the
root directory of your repo. Paste in the following to replace the old content:

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

**Optional**: This Job uses a script file at `build/go-env.sh` to set up Go path variables so that the local Go
cache will be preserved between builds. This isn't strictly needed, and the build will still run if this script is
missing, but it speeds up compiling and running the Go Build Controller program. To set up the script, create
the file at `build/go-env.sh` and paste in the following content:

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

Type ``bb run`` to run the build.

```bash
bb run
✓ .dynamic-build          succeeded                                        7.7s
✓ test-workflow.run-tests succeeded                                       500ms
```

We can see that two jobs were run; the dynamic build job (our Go program) and the 'run-tests' job that it
submitted.

Running the build using the '-v' option shows the logging from each job (note that lines from different jobs
may appear interspersed/out of order):

```bash
bb run -v
dynamic-build.: Pulling Docker image...
dynamic-build.: Docker pull strategy is "if-not-exists" and image exists in cache; "docker.io/library/golang:1.17.13" will not be pulled
dynamic-build.: Fingerprinting disabled as no fingerprint commands were defined. Consider using fingerprints to speed up this job.
dynamic-build: Building: /tmp/buildbeaver/workspace/build/output/go/bin/builder
dynamic-build: Running: /tmp/buildbeaver/workspace/build/output/go/bin/builder
dynamic-build: INFO: Dynamic API Server URL: http://host.docker.internal:3003/api/v1/dynamic
dynamic-build: INFO: Starting workflow 'test-workflow'
dynamic-build: INFO: Step with name 'produce-report' added to job 'run-tests'
dynamic-build: INFO: Artifact with name 'test-reports' added for job 'run-tests'
dynamic-build: INFO: Job with name 'run-tests' added to build
dynamic-build: INFO: Sending 1 new jobs to server for workflow test-workflow
test-workflow.run-tests.: Pulling Docker image...
test-workflow.run-tests.: Docker pull strategy is "if-not-exists" and image exists in cache; "docker.io/library/docker:20.10" will not be pulled
test-workflow.run-tests.: Fingerprinting disabled as no fingerprint commands were defined. Consider using fingerprints to speed up this job.
test-workflow.run-tests: Run-Tests Job Executing...
test-workflow.run-tests.: Uploading artifacts...
dynamic-build: INFO: run-tests job is finished; new jobs could be added here
```

After the build has run, we can see the artifact produced:

```bash
% ls results
test-report.txt
% cat results/test-report.txt
Test Report (artifact from the run-tests job)
```
