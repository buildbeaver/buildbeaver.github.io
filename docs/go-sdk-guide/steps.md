---
sidebar_position: 4
---

# Steps

*Steps* are individually tracked units of work done within a job; each job must contain at least one Step.
BuildBeaver can report on the status of each Step within each Job in the build.

Each Step contains a list of shell commands to run.

## Adding a Step

The workflow handler function can add a new Step to a Job by calling ``NewStep()`` to create a
*Step Definition*, then calling the Job's ``Step()`` method to add the Step. Properties are set on the Step Definition
by calling methods on the object.

Here's a complete example of a Workflow Handler that adds a Job containing two Steps, run sequentially, written in Go:

```go
func handler(w *bb.Workflow) error {
    w.Job(bb.NewJob().
        Name("test-job").
        StepExecution(bb.StepExecutionSequential). // this is the default, can be omitted
        Step(bb.NewStep().
            Name("first-step").
            Commands("echo This is the first step in the Job..."),
        Step(bb.NewStep().
            Name("second-step").
            Commands("echo A second step..."), 
        ))
	return nil
}
```

## Step Execution

All Steps within a Job are run within the same environment, as specified in the Job. This means that steps within
a single Job can share files or other state. Steps do not have access to the output from jobs other than their
own unless they use [Artifact Dependencies](jobs#job-dependencies) to make files from other jobs available.

By default the steps in a job will be run sequentially, one after the other. The Job can be configured to run all
Steps in parallel using the [StepExecution](jobs#job-definitions) method on the Job object.


## Step Definitions

The following methods are available to set properties on a Step; additional methods are described in later
sections:

- **Name** (mandatory): a name to use when referencing the step, unique within the Job.

- **Desc** (optional): a human-readable description for the step.

- **Commands** (mandatory): A list of command strings to run, to perform the work of the Step. These commands
  will be run sequentially using the shell specified in the Job's Docker configuration, on a runner that matches
  the RunsOn() specified in the Job.

- **Depends** (optional): A list of step names that must be completed before this step can be run. Only the names 
  of steps within the current job can be referenced, and this list is only used when steps in the current job are
  executed in parallel.

- **DependsOnSteps** (optional): Similar to the *Depends* method but takes a list of *Step Definition* objects rather
 than names, for steps that must be completed before this step can be run.
