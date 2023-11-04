---
sidebar_position: 3
---

# A Closer Look

Let's take a look at the Go code from ``build/build.go``.

In general, the SDK uses the uses a variant of the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern)
to define *Workflows*, *Jobs* and *Steps* (and also *Services*, not shown here).

## Workflows

A build contains *Workflows*, each with a dynamically defined set of *Jobs*. Each workflow
can be run independently using commands like ```bb run test-workflow```

```go
func main() {
	bb.Workflows(
		bb.NewWorkflow().Name("test-workflow").Handler(submitTestJobs),
	)
}
```

The main() function above defines a build with a single workflow called ``test-workflow``.
Each workflow has a single handler function that is responsible for submitting Jobs, running in its own
Goroutine.

## Submitting Jobs

The workflow handler function's purpose is to define the workflow by submitting jobs. New jobs can be
submitted at any time; they don't all have to be submitted at once.

```go
func submitTestJobs(w *bb.Workflow) error {
    bb.Log(bb.LogLevelInfo, fmt.Sprintf("Build Beaver dynamic build - running workflow '%s'", w.GetName()))
```
The handler function takes a ``bb.Workflow`` object which can be used to submit jobs, find
info about the build, and wait on other workflows if needed.  Anything written to stdout shows up
in the build log; a simple ```bb.Log``` function supporting logging levels is provided for convenience.

```go
    w.Job(bb.NewJob().
		Name("run-tests").
		Desc("This is a Job that simulates running tests").
```
...adds a new Job to the workflow, with the specified *Name* (mandatory) and *Description* (optional).
Jobs are accumulated and submitted to the build when the handler function returns, or when ``w.Submit()`` is called.

```go
		Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
```
...specifies the job should be run in a *Docker Container*, using the specified docker image.
Other details can optionally be specified.

```go
		Step(bb.NewStep().
			Name("produce-report").
			Commands("echo 'Run-Tests Job Executing...'",
				"mkdir -p results",
				"echo >results/test-report.txt 'Test Report (artifact from the run-tests job)'",
			)).
```
...defines a *Step* within the job. Each step has a name and a list of commands to run.
Steps within a job can be run sequentially (default) or in parallel, and all run within the same
environment and file system so they can, for example, directly read files produced by other steps
within the same job.

```go
		Artifact(bb.NewArtifact().Name("test-reports").Paths("reports/test-report.txt")).
```
...specifies an *Artifact* produced by the job, with a name and a file pattern to match to find the
file(s) making up the artifact. When running on a server these files will be kept as artifacts once the Job
finishes.

```go
		OnCompletion(func(event *bb.JobStatusChangedEvent) {
			bb.Log(bb.LogLevelInfo, "run-tests job is finished; new jobs could be added here")
        }))
```
...specifies a *Callback Function* to be run after the Job has finished. In a real system this code
might submit more jobs, depending on the results or artifacts from the job that completed.

```go
	return nil
}
```
If the handler returns an error then the build will fail; otherwise any newly defined jobs will be submitted
to the server (in this case the *bb* executable) and can start running. The Go build program keeps running
until all applicable callback functions have been run.
