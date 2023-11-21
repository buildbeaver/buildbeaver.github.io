---
sidebar_position: 4
---

# Steps

*Steps* are individually tracked units of work within a job; the BuildBeaver server can show the progress within a
Job by displaying the status of each Step.

Each job must contain at least one Step, and each Step contains a list of shell commands to run.

## Adding a Step

The workflow handler function adds a new Step to a Job by calling ``NewStep()`` to create a
*Step object*, then calling the Job's ``Step()`` method to add the Step. Properties are set on the Step
by calling methods on the object.

Here's an example (in Go) of a Job containing two Steps, run sequentially:

```go
    w.Job(bb.NewJob().
        Name("test-job").
		Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
        StepExecution(bb.StepExecutionSequential). // this is the default, can be omitted
        Step(bb.NewStep().
            Name("first-step").
            Commands("echo This is the first step in the Job...")).
        Step(bb.NewStep().
            Name("second-step").
            Commands("echo A second step..."), 
        ))
```

## Step Execution

All Steps within a Job are run within the same environment, specified in the Job. This means that steps within
a single Job can share files or other state. Steps do not have access to the output from jobs other than their
own unless they use [Artifact Dependencies](jobs#job-dependencies) to make files available.

By default the steps in a job will be run sequentially. The Job can be configured to run all
Steps in parallel using the [StepExecution](jobs#job-definitions) method on the Job object.


## Step Definitions

The following methods are available to set properties on a Step:

- **Name** (mandatory): a name to use when referencing the step, unique within the Job.

- **Desc** (optional): a human-readable description for the step.

- **Commands** (mandatory): A list of command strings to run, to perform the work of the Step. These commands
  will be run sequentially using the shell specified in the Job configuration, on a runner that matches
  the RunsOn() specified in the Job.

- **Depends** (optional): A list of step names that must be completed before this step can be run. Only steps within
  the current job can be referenced, and this list is only used when steps in the current job are
  being executed in parallel.

- **DependsOnSteps** (optional): Similar to the *Depends* method but takes a list of *Step objects* rather
 than step names, specifying steps that must be completed before this step can be run.
