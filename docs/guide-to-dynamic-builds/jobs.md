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

A new Job is added to a workflow by calling ``NewJob()`` to create a *Job object*, then calling the workflow Job()
method to add to a list of jobs ready to be submitted to the server. After the workflow
function returns, any outstanding jobs will be submitted. Properties are set on the Job object by
calling methods on the object.

Here's a complete example of a Workflow Handler that submits a Job, written in Go:

```go
func handler(w *bb.Workflow) error {
    w.Job(bb.NewJob().
        Name("test-job").
        Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
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

- **Step** (mandatory): each *Step* is added to the Job by calling NewStep() to create a *Step object*,
  then calling the Job's Step() method to add the step. See [Steps](steps) for details and examples.

- **Type** (optional): specifies whether this job runs in a Docker container (``JobTypeDocker``),
  or natively on the same machine as the runner or bb command (``JobTypeExec``).
  Can be omitted if a [Docker Configuration](docker-configuration) is specified via the
  Docker() method. For native/exec jobs ``Type(bb.JobTypeExec)`` must be specified explicitly.

- **Docker** (mandatory for Docker Jobs): specifies how to run the Job in a Docker container, for Jobs with ``JobTypeDocker``.
  Call NewDocker() to create a *Docker Config object*, then call the Job's Docker() method
  to use it for the Job. See [Docker Configuration](docker-configuration) for details and examples.

- **StepExecution** (optional): specifies whether the Steps in this Job should be run sequentially (the default)
 or in parallel. Possible values are ``StepExecutionSequential`` or  ``StepExecutionParallel``.

- **RunsOn** (optional): a set of labels constraining which types of runner the job can run on. Only runners
  which have all of these labels will be eligible to run this Job. Not relevant when builds are run using
  the *bb* command line tool.

- **OnCompletion**, **OnSuccess**, **OnFailure**, **OnStatusChanged** (optional): Call the supplied callback function
  after the Job is completed. See [Job Callbacks](callbacks-and-waits#job-callbacks) for details and examples.

- **Fingerprint** (optional): specifies a way to calculate a *fingerprint* for inputs to the Job, allowing
  execution to be skipped if a previous build already ran the Job with the same inputs, and therefore
  already produced the required artifacts. See [Fingerprints](fingerprints) for details and examples.

- **Service** (optional): Jobs can make use of services such as databases by calling NewService() to create
  a *Service object*, then calling the Job's Service() method to associate the service with the Job.
  See [Services](services) for details and examples.


## Environment Variables

Jobs and Services can be provided information via environment variables. Variables specified in the Job object apply
to every Step within the Job. The values for variables can be provided as literal values, or
[Secrets](jobs#secrets) can be used to ensure that the provided information remains secure.

Environment variables can be specified using the following Job method:

- **Env** (optional): specifies an environment variable that should be passed to commands that run within the Job
  when they are executed. The Env() method can be called multiple times to add multiple variables.

The following methods are available to set properties on an environment variable.

- *Name* (mandatory): specifies the name of the environment variable to be provided to the Job. This can be
  referenced from within shell commands with name in ALL_CAPS.

- *Value*: specifies a literal value for the environment variable; use this only for values that do not
  need to be kept secret.

- *ValueFromSecret*: the name of a *Secret* used to obtain the value for the
  environment variable; the actual value will be fetched at runtime.

(note that either *Value* or *ValueFromSecret* must be called)

Here's an example of a Job being passed environment variables, with and without secrets:

```go
    w.Job(bb.NewJob().
		Name("my-job").
        Docker(....).
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
[Docker Configuration](docker-configuration) - see those sections for the syntax.

The values for secrets are provided at runtime:

- *Builds run via the *bb* command-line tool*: secret values must be provided via environment variables set before
  `bb` is run. You are responsible for ensuring the Environment variable are set; for each secret there must
  be a corresponding environment variable with the same name.

- *Builds run from the BuildBeaver server*: secret values are set within the Build Configuration via the GUI.

:::tip
Secret names should normally be in ALL_CAPS since they are sourced from environment variables when using the
`bb` command-line tool. Having everything in ALL_CAPS makes things simpler.
:::

## Artifacts

An *Artifact* is a set of files produced by the Job that form part of the output of the build. When builds are run on
a server, artifact files are stored after the build is completed. When a build is run via the *bb* command line
tool, artifact files remain on the local machine after the build is run.

The following Job method is used to define artifacts:

- **Artifact** (optional): call NewArtifact() to create an *Artifact object*, then call the
  Job's Artifact() method to add the artifact. The Artifact() method can be called multiple times to define
  more than one artifact.

The following methods are available to set properties on an Artifact:

- *Name* (mandatory): each artifact must have a name, unique within the build. Names must be identifiers that
  do not contain spaces.

- *Paths* (mandatory): specifies one or more strings, each defining a path that matches files that should be
  included in the artifact. Paths are relative to the checked-out source working directory.
  Wildcards (*) can be used to pattern-match parts of a path.

Here's an example in Go of a Job that defines an Artifact that includes all files in the reports directory (some details
replaced with ``....`` for brevity):

```go
    w.Job(bb.NewJob().
		Name("reporting-job").
        Docker(....).
        Step(....).
        Artifact(bb.NewArtifact().
            Name("reports").
            Paths("reports/*")))
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
          Docker(....).
          Step(....).
          Artifact(bb.NewArtifact().Name("reports").Paths("reports/*")))
      w.Job(bb.NewJob().
          Name("job-2").
          Depends("my-workflow.job-1.artifacts").
          Docker(....).
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
          Docker(....).
          Step(....).
          Artifact(bb.NewArtifact().Name("reports").Paths("reports/*")))
      w.Job(job1)
  
      w.Job(bb.NewJob().
          Name("job-2").
          DependsOnJobArtifacts(job1).
          Docker(....).
          Step(....))  
  ```
