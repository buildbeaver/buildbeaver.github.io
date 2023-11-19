---
sidebar_position: 5
---

# Callbacks and Waiting

To fully take advantage Dynamic Builds the *Build Controller* program will often need to run code after another
Job or Workflow has finished. The results, artifacts or logs from completed Jobs can then be read
(see [Build Status](build-status)) and used to decide which new Jobs to add.

[Job Callbacks](#job-callbacks) or [Wait Functions](#wait-functions) can be used to ensure this code is run at
the correct time.

:::tip
[Workflow Dependencies](workflows#workflow-dependencies) can be used as a simple method to ensure one workflow does
not start until another workflow is completely finished. However, it's often faster to run workflows
in parallel and have code wait for individual Jobs or [Workflow Outputs](#workflow-outputs) as required.
:::

## Job Callbacks

The simplest way to run code after a particular job completes is to add a *Job Callback* function to the
[Job Definition](jobs#job-definitions). The callback function takes a single *event* parameter
which will provide the Job's new status; other information (including artifacts and logs) can be discovered and
read from within the callback using methods on the Workflow and Build objects
(see [Build Status](build-status) for details).

  ```go
  type JobCallback func(event *JobStatusChangedEvent)
  ```

As with workflow handler functions, any outstanding jobs will be submitted after the callback function returns.
The workflow object's Submit() or MustSubmit() functions can also be used in a callback to submit new jobs
immediately. Note that the workflow function will often have returned before the callback is called, having finished
submitting the initial set of Jobs to run.

The following Job methods are available to define callbacks. Each specifies a function to be called:

- **OnCompletion** (optional): call when the Job is completed (succeeded, failed or cancelled).

- **OnSuccess** (optional): call when the Job succeeds. Not called on error.

- **OnFailure** (optional): call when the Job fails.

- **OnStatusChanged** (optional): call each time the status of the Job changes.

Here's an example of the use of callbacks in Go:

```go
    w.Job(bb.NewJob().
		Name("test-callbacks-job").
        Step(bb.NewStep().
			Name("step-1").
			Commands("echo 'Test job is running'").
        OnSuccess(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "Job is finished; new jobs could be created here")
        }).
        OnFailure(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "Job failed")
        }))
```

## Wait Functions

For more complex situations, *Wait* functions can be used to wait for events before continuing. Wait functions
will block the current thread. Since each Workflow has its own thread (or Goroutine in Golang), by default
calling a Wait function will block the current workflow from submitting any further jobs until the Wait returns.

:::tip
The BuildBeaver Go SDK is thread-safe, so a workflow function can start a new Goroutine that can call a Wait function
and then run some code (e.g. to submit new Jobs). In this case the caller is responsible for thread
synchronization, and for ensuring that a workflow function does not exit until all the Goroutines it spawned
have done their work.
:::

Every workflow handler function is passed in a Workflow object as a parameter
(see [Workflow Definitions](workflows#workflow-definitions)) and so
a workflow object is always available. The following Wait methods are available:

- **WaitForJob(jobs...)**: Waits for any one of the specified Jobs to finish. Returns a ``JobStatusChangedEvent``
  object specifying the Job ID, name, and final status of the first of the specified jobs to complete.

  Jobs are specified as fully-qualified job names, i.e. *workflow.jobname* (e.g. "tests.unit-tests-job"),
  and each job being waited on can be part of any workflow.

- **WaitForWorkflow(workflowName)**: Waits for the specified workflow to be fully finished. Similar to
  to using a [Workflow Dependency](workflows#workflow-dependencies) except that *WaitForWorkflow* can
  be called anywhere in your workflow function, whereas workflow dependencies will wait before the
  workflow function starts.

- **WaitForOutput(workflowName, outputName)**: Waits for the specified output to be made available by the specified
  workflow. See [Workflow Outputs](#workflow-outputs) for details.
- 
:::tip
If you find yourself calling WaitForJob() to wait for a Job from a different workflow, consider using either
[Workflow Dependencies](workflows#workflow-dependencies) to wait for the entire workflow, or
[Workflow Outputs](#workflow-outputs) to wait for specific information to become available. This avoids
building knowledge into your workflow of the names of specific jobs within another workflow, improving
*workflow encapsulation*.
:::

## Workflow Outputs

Information can easily and conveniently be sent from one workflow function to another within the Job Controller
by using *Workflow Outputs*. These outputs are maintained in-memory within the Job Controller process and
are not sent to the server (or bb command) so no bandwidth is required.

Each workflow maintains a set of Outputs as name-value pairs, where the values can be of any in-memory data type.
A workflow function can set an output by calling the following method on their Workflow object:

- **SetOutput(outputName, value)**: Sets the output with the specified name to the specified value, which can be
  of any data type. This would typically be done in a [Job Callback](#job-callbacks) function after a Job has completed.

Another workflow function can wait until an output is available, and obtain the value, using one of the following
methods on *their* Workflow object:

- **WaitForOutput(workflowName, outputName)**: Waits for the specified workflow to provide an output with the
  specified name, then returns the output. Returns an error if the specified workflow finishes without providing
  the value.

- **MustWaitForOutput(workflowName, outputName)**: Same as WaitForOutput() but will terminate the program (and so
  fail the build) if the specified workflow finishes without providing the value.
