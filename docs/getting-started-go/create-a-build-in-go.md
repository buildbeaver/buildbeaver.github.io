---
sidebar_position: 1
---

# Create a Build in Go

The easiest and most powerful way to define your build in BuildBeaver is using code. The code can
be as simple as YAML, but provides all the power of a full programming language.

This page shows you how to use the BuildBeaver Dynamic SDK for Golang to define a dynamic build.

## Create a Go program using the BuildBeaver SDK

Make a new directory with a Go project for the build definition:

```bash
mkdir build
cd build
go mod init example.com/build
````

Fetch the BuildBeaver Dynamic SDK for Go:

```bash
go get github.com/buildbeaver/sdk/dynamic/go
```
Create a Go file called `build/build.go` to define the build, with the following contents:

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
                "mkdir -p results",
                "echo >results/test-report.txt 'Test Report (artifact from the run-tests job)'",
            )).
        Artifact(bb.NewArtifact().Name("test-reports").Paths("reports/test-report.txt")).
        OnCompletion(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "run-tests job is finished; new jobs could be added here")
        }))
    return nil
}
```
We'll explain more about what's in the program later.

Finally, now that we are referencing the SDK from our code, run the following command to sync the vendor directory:

```bash
go mod vendor
```
