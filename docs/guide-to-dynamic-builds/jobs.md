---
sidebar_position: 3
---

# Jobs

A workflow handler function is responsible for submitting *Jobs* to be run as part of the build. Each job
contains one or more *Steps*.

All Steps within a Job are run within the same environment and so steps can share files or other state. Each job
runs within its own separate environment and should not expect files from other jobs to be available; instead it
should declare [Artifact Dependencies](jobs#job-dependencies) to make files from other jobs available.

## Submitting a Job

A new Job is added to a workflow by calling ``NewJob()`` to create a *Job Definition*, then calling the workflow Job()
method to add the definition to a list of jobs ready to be submitted to the server. After the workflow
function returns, any outstanding jobs will be submitted. Properties are set on the Job Definition by
calling methods on the object.

Here's a complete example of a Workflow Handler that submits a Job, written in Go:

```go
func handler(w *bb.Workflow) error {
    w.Job(bb.NewJob().
        Name("test-job").
        Step(bb.NewStep().
            Name("test-job-step").
            Commands("echo This is the test job..."), 
	))
	return nil
}
```

To submit jobs immediately instead of waiting until the workflow handler returns, call Submit(), or MustSubmit() if you don't want to deal with errors:

```go
func (w *Workflow) Submit(waitForCallbacks ...bool) ([]client.JobGraph, error)
func (w *Workflow) MustSubmit(waitForCallbacks ...bool) []client.JobGraph
```
Submit() will submit all new jobs to the server and return details for the newly created jobs. If
waitForCallbacks is true, or not specified, Submit() will wait until all outstanding callbacks have been called
before returning. MustSubmit() is the same but will exit the program with status 1 on error, causing the build to fail.

## Job Definitions

The following methods are available to set properties on a Job; additional methods are described in later
sections:

- **Name** (mandatory): a name to use when referencing the job.

- **Desc** (optional): a human-readable description for the job.

- **Step** (mandatory): each *Step* is added to the Job by calling NewStep() to create a *Step Definition*,
  then calling the Job's Step() method to add the step. See [Steps](steps) for details and examples.

- **StepExecution** (optional): specifies whether the Steps in this Job should be run sequentially (the default)
 or in parallel. Possible values are ``StepExecutionSequential`` or  ``StepExecutionParallel``.

- **Fingerprint** (optional): specifies a way to calculate a *fingerprint* for inputs to the Job, allowing
  execution to be skipped if a previous build already ran the Job with the same inputs, and therefore
  already produced the required artifacts. See [Fingerprinting](fingerprints) for details and examples.

- **RunsOn** (optional): a set of labels constraining which types of runner the job can run on. Only runners
  which have all of these labels will be eligible to run this Job. Not relevant when builds are run using
  the *bb* command line tool.

- **Service** (optional): Jobs can make use of services such as databases by calling NewService() to create
  a *Service Definition*, then calling the Job's Service() method to add the service.
  See [Services](services) for details and examples.

## Job Callbacks

To take advantage of the dynamic nature of builds, a *Job Callback* function can be called after
a job has succeeded, failed, or the each time job's status changes. Callbacks are often used to submit
new jobs to a workflow after previous jobs have finished, based on the results or artifacts produced by
the previous job.

The callback function takes a single *event* parameter which will contain the Job's new status; other information
(e.g. artifacts) can be discovered and read from within the callback using the Workflow object.

  ```go
  type JobCallback func(event *JobStatusChangedEvent)
  ```

As with workflow handler functions, after the callback function returns any outstanding jobs will be submitted.
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
        Step(bb.NewStep().Name("step-1").Commands("echo 'Test callbacks job running'").
        OnSuccess(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "Job is finished; new jobs could be created here")
        }).
        OnFailure(func(event *bb.JobStatusChangedEvent) {
            bb.Log(bb.LogLevelInfo, "Job failed")
        }))
```

## Artifacts

An *Artifact* is a set of files produced by the Job that form part of the output of the build. When builds are run on
a server, artifact files are stored after the build is completed. When a build is run via the *bb* command line
tool, artifact files remain on the local machine after the build is run.

The following Job method is used to define artifacts:

- **Artifact** (optional): call NewArtifact() to create an *Artifact Definition*, then call the
  Job's Artifact() method to add the artifact. The Artifact() method can be called multiple times to define
  more than one artifact.
 
The following methods are available to set properties on an Artifact Definition:

- *Name* (mandatory): each artifact must have a name, unique within the build. Names must be identifiers that
  do not contain spaces.

- *Paths* (mandatory): specifies one or more strings, each defining a path that matches files that should be
  included in the artifact. Paths are relative to the checked-out source working directory.
  Wildcards (*) can be used to pattern-match parts of a path.

Here's an example of a Job that defines an Artifact that includes all files in the reports directory (some details
replaced with ``....`` for brevity):

```go
    w.Job(bb.NewJob().
		Name("reporting-job").
        Artifact(bb.NewArtifact().
            Name("reports").
            Paths("reports/*")).
        Step(....))
  ```

## Job Dependencies

*Job dependencies* can be used to ensure a job doesn't run until after another job completes, and optionally to
make available artifacts from another job. If no job dependencies are specified then all submitted jobs
are eligible to run in parallel.

The following Job methods are available to define dependencies:

- **Depends** (optional): specifies one or more dependencies as strings, using the YAML
  [Job Dependency Syntax](../yaml-guide/jobs#job-dependency-syntax). The specified job can be in a different
  workflow from the dependent job; this can be used as a more efficient alternative to
  [Workflow Dependencies](workflows#workflow-dependencies).
  
  Here's an example where *job-2* depends on *job-1* and requires all artifacts from *job-1* to be available
  (some details replaced with ``....`` for brevity):

  ```go
      w.Job(bb.NewJob().
          Name("job-1").
          Step(....).
          Artifacts(....))
      w.Job(bb.NewJob().
          Name("job-2").
          Depends("my-workflow.job-1.artifacts").
          Step(....))
  ```

- **DependsOnJobs** (optional): indicates that the job depends on the specified other jobs, provided as
  references to Job objects defined previously.
  This is a simpler alternative to using dependency strings of the form ``workflowname.jobname`` (see example below).

- **DependsOnJobArtifacts** (optional): indicates that the job depends on the specified other jobs, and that
  all artifacts from those jobs should be made available to the dependent job.
  This is a simpler alternative to using dependency strings of the form ``workflowname.jobname.artifacts``. Here's an example:
  
  ```go
      job1 := bb.NewJob().
          Name("job-1").
          Step(....).
          Artifacts(....)
      w.Job(job1)
  
      w.Job(bb.NewJob().
          Name("job-2").
          DependsOnJobArtifacts(job1).
          Step(....))  
  ```

## Docker Configuration

Jobs can run either in a Docker container ('docker' jobs) or natively on the machine where the runner or *bb*
executable is running ('native' or 'exec' jobs).

For Docker jobs, configuration options can be specified on a per-job basis using the following Job method:

- **Docker** (optional): call NewDocker() to create a *Docker Configuration*, then call the Job's Docker() method
  to configure Docker for the job.

The following methods are available to set properties on an Docker Configuration:

- *Image* (mandatory): specifies the name of the Docker image to use when running this Job.

- *BasicAuth* (optional): configures basic auth credentials for the Docker registry, to use when fetching the Docker
  image to run under. Takes a BasicAuth object to specify the username and password for authentication, using
  [Secrets](jobs#secrets) to keep passwords secure..

- *AWSAuth* (optional): configures AWS auth credentials for AWS ECR, to use when fetching the Docker
  image to run under. Takes an AWSAuth object to specify the details for authentication, using
  [Secrets](jobs#secrets) to keep IDs and passwords secure.

- *Shell* (optional): specifies the shell to use to run commands inside the docker container.
  Default is '/bin/sh' for Unix-based containers, or 'cmd.exe' for Windows-based containers.

- *Pull* (optional): specifies when to pull the Docker image from the Registry. Constants are provided for
  these options:

  - *DockerPullNever*: never pull the image; it must already exist in the cache
  
  - *DockerPullAlways*: always pull the image, just before the Job is run each time
  
  - *DockerPullIfNotExists*: pull the image only if there is no version in the cache
  
  - *DockerPullDefault*: the default behaviour if no Pull() option specified. This is equivalent to
    *DockerPullAlways* if the image tag is 'latest', or *DockerPullIfNotExists* if the image tag refers
    to a specific version.

Here's an example of a docker Job with an image and pull strategy defined (some details
replaced with ``....`` for brevity):

```go
    w.Job(bb.NewJob().
		Name("a-docker-based-job").
		Docker(bb.NewDocker().
            Image("node:18.4.0-alpine").
            Pull(bb.DockerPullIfNotExists))).
        Step(....))
  ```

## Environment Variables

Jobs can be provided information via environment variables. Variables specified in the Job definition apply to
every Step within the Job. The values for variables can be provided as literal values, or
[Secrets](jobs#secrets) can be used to ensure that the provided information remains secure.

Environment variables can be specified using the following Job method:

- **Env** (optional): specifies an environment variable that should be passed to commands that run within the Job
  when they are executed. The Env() method can be called multiple times to add multiple variables.

The following methods are available to set properties on an environment variable.

- *Name* (mandatory): specifies the name of the environment variable to be provided to the Job. This can be
  referenced from within shell commands with name in UPPER_CASE.

- *Value*: specifies a literal value for the environment variable; use this only for values that do not
  need to be kept secret.

- *ValueFromSecret*: the name of a *Secret* used to obtain the value for the
  environment variable; the actual value will be fetched at runtime.

(note that either *Value* or *ValueFromSecret* must be called)

Here's an example of a Job being passed environment variables, with and without secrets:

```go
    w.Job(bb.NewJob().
		Name("my-job").
        Env(bb.NewEnv().
            Name("MY_ID").
            Value("a-literal-value")).
        Env(bb.NewEnv().
            Name("AWS_SECRET_ACCESS_KEY").
            ValueFromSecret("ACCESS_KEY_SECRET_NAME")).
        Step(bb.NewStep().
            Name("go-builder").
            Commands("echo My ID is $MY_ID")))
 ```

## Secrets

Secrets provide a mechanism to avoid sensitive information such as passwords or tokens having to be hard coded
into the build definition YAML or code. Secrets are used by providing a *secret name* instead of a literal value,
and can be used for [Enviroment Variables](jobs#environment-variables) or within
[Docker Configuration](jobs#docker-configuration) - see those sections for the syntax.

The values for secrets are provided at runtime:

- *Builds run via the *bb* command-line tool*: secret values are provided via environment variables set when
  bb is run. For each secret there must be a corresponding environment variable with the same name.

- *Builds run from the BuildBeaver server*: secret values are set within the Build Configuration via the GUI.