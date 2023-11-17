---
sidebar_position: 2
---

# Workflows

Workflows are groups of jobs. Each workflow can be run separately but can have dependencies on other workflows.
For example, to run only the 'generate-code' workflow locally (along with any other workflows
it depends on):

```shell
bb run generate-code
```

When using the Dynamic SDK each workflow is defined by a *workflow function*, responsible for submitting jobs and
including any required business logic.  A workflow function is free to use whatever language features,
libraries and APIs are useful, and uses the BuildBeaver SDK to submit jobs to the build, and to wait for other jobs,
workflows or artifacts.

Each workflow function is run independently on its own thread. The SDK provides mechanisms for synchronization
between workflows, e.g. waiting for artifacts or jobs from another workflow.

## Registering Workflows

Workflows are created and run by calling the Workflows() function, which takes a list of workflows as parameters.
The Go syntax is:
   
```go
func Workflows(workflows ...*WorkflowDefinition)
```

Workflows() is the 'entry point' function for a Build Coordinator program to define the set of workflows available
to the build. Each workflow is registered and then all required workflows are run (in parallel by default)
to submit jobs to the build. Returns when the workflow handlers for all required workflows have completed.

```go
func AddWorkflows(workflows ...*WorkflowDefinition)
```

AddWorkflows() can be used to register extra workflows for the current build, and should be called before Workflows().
In Golang AddWorkflows() can be called from an init function prior to calling Workflows() from the main function,
and can be used to 'drop in' source files with extra workflows without modifying the main program.

## Workflow Definitions

A workflow definition is created by calling NewWorkflow() and then properties are set by calling methods on the
object. Here's an example in Go:

```go
bb.Workflows(
    bb.NewWorkflow().
  	    Name("tests").
  	    Handler(submitTestJobs), 
	bb.NewWorkflow().
        Name("deploy").
        Handler(submitDeployJobs).
        Depends("tests", bb.WorkflowConcurrent),
)
```
The following methods are available to set properties on a Workflow Definition object:

- **Name** (mandatory): a name to use when referencing the workflow from other workflows.

- **Handler** (mandatory): the workflow handler function to call to run the workflow and submit jobs.
  The function must take a Workflow object which can be used to perform actions, and return an error on failure;
  this will cause the build to fail. Here's an example in Go (body omitted):
  ```go
  func submitTestJobs(w *bb.Workflow) error { ... }
  ```

- **Depends** (optional): indicates that the specified workflow depends on another workflow; see
  [Workflow Dependencies](#workflow-dependencies).

## Workflow Dependencies

A *Workflow Dependency* indicates that the dependent workflow can only be run if another workflow is also
run. The dependent workflow can either be started after the other workflow (default) or run
in parallel. If the bb command line is used to request that only a specific workflow is run then the dependency
ensures the other workflow will also run.

Multiple dependencies can be specified by calling Depends() multiple times for the same workflow definition.
The Go syntax is:

```go
func (*WorkflowDefinition) Depends(workflowName ResourceName, options ...WorkflowDependsOption) *WorkflowDefinition
```

Each call to Depends() can specify zero or more options:

- **WorkflowWait** (default): specifies not to start the dependent workflow until the other workflow has
  completely finished, including all jobs.

- **WorkflowConcurrent**: allows the dependent workflow to run concurrently with the other workflow.

- **WorkflowTerminateOnFailure** (default): terminates the current process if the other workflow fails, instead
  of starting the dependent workflow.

- **WorkflowStartOnFailure** starts the dependent workflow even if the other workflow fails. The workflow handler
  for the dependent workflow is responsible for checking the status of any jobs it needed to complete successfully.
