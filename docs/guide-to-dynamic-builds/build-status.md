---
sidebar_position: 5
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
the same method but will terminate the program (and fail the build) on error, rather than returning an error.

- **GetBuildGraph()**: Reads and returns the current Build Graph. Returns a ``client.BuildGraph``
  object containing information about all Jobs and Steps in the entire build, together with
  the current statubs of every Job and Step. Returns an error if the Build Controller program can't read the info.

- **GetJob(jobID)**: Reads and returns information about a job. Returns a ``client.Job`` object containing various
  data including the current status of the Job. The JobID is a Globally Unique ID (GUID) for the job and is typically
  available from the ``JobStatusChangedEvent.JobID property``.
  Returns an error if the Build Controller program can't read the info.

- **GetJobGraph(jobID)**: Reads and returns information about a job including all steps within the job (forming
  the 'Job Graph'). Returns a ``client.JobGraph`` object containing the ``client.Job`` object as well as a list of
  ``client.Step`` objects for each Step in the Job.
  Returns an error if the Build Controller program can't read the info.

Here's an example of a workflow handler which submits and Job, waits until that job is completed, then reads and
outputs information about the entire build (some details replaced with ``....`` for brevity):

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
```

## Fetching artifacts

To be documented:

  ```func (b *Build) ListArtifacts(workflow string, jobName string, groupName string) (*ArtifactPage, error)```

  ```func (b *Build) ListArtifactsN(workflow string, jobName string, groupName string, pageSize int) (*ArtifactPage, error)```

  ```func (b *Build) GetArtifactData(artifactID string) ([]byte, error)```

## Fetching logs

To be documented:

  ```func (b *Build) GetLogDescriptor(logDescriptorID string) (*client.LogDescriptor, error)```

  ```func (b *Build) ReadLogData(logDescriptorID string, expand bool) (io.ReadCloser, error)```

  ```func (b *Build) ReadLogText(logDescriptorID string, expand bool) (io.ReadCloser, error)```
