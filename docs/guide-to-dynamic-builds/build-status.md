---
sidebar_position: 6
---

# Build Status

One of the powerful features of the BuildBeaver SDK is the ability for code to read the current status of the build,
and examine the results of completed or in progress Jobs and Steps. This can be used to make decisions about which
other Jobs should be added to the build.

Every workflow handler function is passed in a Workflow object as a parameter (see [Workflow Definitions](workflows#workflow-definitions))
and so a workflow object is always available. The ``GetBuild()`` method on the workflow object can be used to get
a *Build* object, which has various methods for fetching status information, artifacts and logs.


## Fetching Build and Job Status Info

The following methods on the Build object can be used to fetch status information. These methods return
data structures defined in the OpenAPI ``client`` package that contains data definitions and low-level API functions.

In the Go SDK some of these methods have a second version with ``Must`` prepended to the name; these versions are
the same method but will terminate the program (and so fail the build) on error.

- **GetBuildGraph()**: Reads and returns the current Build Graph. Returns a ``client.BuildGraph``
  object containing information about all Jobs and Steps in the entire build, together with
  the current statubs of every Job and Step. Returns an error if the Build Controller program can't read the info.

- **GetJob(jobID)**: Reads and returns information about a job. Returns a ``client.Job`` object containing various
  data including the current status of the Job. The JobID is a Globally Unique ID (GUID) for the job and can be
  obtained from the ``JobID`` property of a ``JobStatusChangedEvent`` object.
  Returns an error if the Build Controller program can't read the info.

- **GetJobGraph(jobID)**: Reads and returns information about a job including all steps within the job (forming
  the 'Job Graph'). Returns a ``client.JobGraph`` object containing the ``client.Job`` object as well as a list of
  ``client.Step`` objects for each Step in the Job.
  Returns an error if the Build Controller program can't read the info.

Here's an example of a workflow handler which submits and Job, waits until that job is completed, then reads and
outputs information about the entire build:

```go
func handler(w *bb.Workflow) error {
    w.Job(bb.NewJob().
        Name("build-status-job").
        Step(bb.NewStep().Name("step-1").Commands("echo 'Running step-1'").
        OnCompletion(func(event *bb.JobStatusChangedEvent) {
            build := w.GetBuild()
			currentBuildGraph := build.MustGetBuildGraph()  // fetch current status from bb or the server
			for i, jobGraph := range currentBuildGraph.Jobs() {
				bb.Log(bb.LogLevelInfo,
					fmt.Sprintf("Job %d name '%s' has status '%s'",
					    jobGraph.Job.Name, jobGraph.Job.Status))
			}
        }))
	return nil
}
```

## Fetching artifacts

The following methods on the Build object can be used to find and download artifacts produced by previous Jobs:

- **ListArtifacts(workflow, jobName, groupName)**: reads information about artifacts from the current build
  that match the provided workflow, job and artifact group. Pass an empty string for any parameter to match any
  value for that parameter.

  Returns an ``ArtifactPage`` object containing the first page of up to 30  ``client.Artifact`` objects; call Next()
  on the returned object to get the next page of results, or Prev() to get the previous page.

- **ListArtifactsN(workflow, jobName, groupName, pageSize)**: same as ListArtifacts but allows the page size to
  be specified instead of defaulting to 30.

- **GetArtifactData(artifactID)**: reads and returns the binary data for an artifact. An artifactID
  can be obtained from the ``Id`` field of a ``client.Artifact`` object obtained from ListArtifacts().


## Fetching logs

The following methods on the Build object can be used to find and download the logs produced by previous Jobs:

- **GetLogDescriptor(logDescriptorID)**: returns a ``client.LogDescriptor`` object containing information/metadata
  about the log for a Job or a Step. A logDescriptorID can be obtained from a ``client.Job`` or ``client.Step``
  object, returned by GetBuildGraph(), GetJob() and GetJobGraph().

- **ReadLogText(logDescriptorID, expand)**: reads the data for a Job or Step log as plain text (e.g. the log for a
  job or for a step). If expand is true then nested logs will be expanded and returned.

- **ReadLogData(logDescriptorID, expand)**: reads the data for a Job or Step log as a series of JSON log entries. 
  If expand is true then nested logs will be expanded and returned.
