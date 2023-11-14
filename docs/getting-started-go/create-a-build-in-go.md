---
sidebar_position: 1
---

# Create a Build in Go

The easiest and most powerful way to define your build in BuildBeaver is using code. The code can
be as simple as YAML, but provides all the power of a full programming language.

This page shows you how to use the BuildBeaver Go SDK to define a dynamic build, using the ``build1`` directory you
already set up in the [Getting Started - First Build](../category/getting-started---first-build/) tutorial.

**Prerequisite**: Install [Golang](https://go.dev/doc/install) version 1.17 or greater on your development machine.

## Create a Go program using the BuildBeaver SDK

Make a new directory with a Go project for the build definition:

```bash
cd build1
mkdir build
cd build
go mod init example.com/build
````

Fetch the BuildBeaver Go SDK:

```bash
go get github.com/buildbeaver/go-sdk
```
Create a Go file inside the ``build`` directory called `build.go` and paste in the following contents:

```go
package main

import (
    "fmt"
    "github.com/buildbeaver/go-sdk/bb"
)

func main() {
    bb.Workflows(
        bb.NewWorkflow().Name("test-workflow").Handler(submitTestJobs),
    )
}

func submitTestJobs(w *bb.Workflow) error {
    bb.Log(bb.LogLevelInfo, fmt.Sprintf("Build Beaver dynamic build - running workflow '%s'", w.GetName()))

    w.Job(bb.NewJob().
        Name("run-tests").
        Desc("This is a Job that simulates running tests").
        Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
        Step(bb.NewStep().
            Name("produce-report").
            Commands("echo 'Run-Tests Job Executing...'",
                "mkdir -p reports",
                "echo >reports/test-report.txt 'Test Report (artifact from the run-tests job)'",
            )).
        Artifact(bb.NewArtifact().Name("test-reports").Paths("reports/test-report.txt")).
        OnCompletion(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "run-tests job is finished; new jobs could be added here")
        }))
    return nil
}
```
We'll explain more about what's in the program later.

Finally run the following command to sync the vendor directory:

```bash
go mod vendor
```
