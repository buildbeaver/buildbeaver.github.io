---
sidebar_position: 2
---

# Jobs

The YAML file has a top-level element called ```jobs``` that must contain a list of jobs.

By default, all jobs declared in YAML are part of the *default workflow*, which is always run and has an empty
string as its workflow name.

The YAML Job syntax mirrors the definition of Jobs in the Dynamic SDK;
see the [Job Definitions](../guide-to-dynamic-builds/jobs#job-definitions) Guide for details.
The following elements can be specified:

- **name**: mandatory name for the job; referred to in dependencies.
- **description**: optional description for the job.
- **steps**: mandatory list of Steps to run for the Job - see [Steps](steps)
- **step_execution**: optional value of "sequential" or "parallel".
- **type**: optional value of "docker" or "exec", for Docker-based vs native jobs.
- **runs_on**: optional list of labels constraining which types of runner the job can run on.
- **depends**: optional list of dependencies for the job, each one a string using [Job Dependency Syntax](job-dependency-syntax)
- **docker**: specifies the Docker environment to use when running a Job - see [Docker Configuration](docker-configuration)
- **environment**: optional map of name-value pairs for environment variables - see [Environment Variables](#environment-variables)
- **fingerprint**: optional list of command strings to produce the Job's fingerprint - see the [Fingerprints](../guide-to-dynamic-builds/fingerprints) Guide for details.
- **artifacts**: optional list of Artifacts defined by the Job - see [Artifacts](#artifacts)
- **services**: optional list of Services to run alongside the Job - see [Services](services)

## Artifacts

An Artifact is a set of files produced by the Job that forms part of the output of the build. Each artifact
has name and a set of paths to the files making up the artifact.
See the [Artifacts](../guide-to-dynamic-builds/jobs#artifacts) Guide for more information about artifact names and paths.

Artifacts are specified via an 'artifacts' list. This can either be a list of strings or a list of objects.

### Artifacts as a list of strings

A list of strings will be interpreted interpreted as a list of paths that will be used to find files making up a single
artifact with the name 'default'.

Here's an example of specifying a default artifact via a list of (one) string, in this case publishing every file
in a bin directory as a single 'default' artifact:

```yaml
    artifacts:
      - build/output/go/bin/*
 ```

### Artifacts as a list of objects

A list of objects will be interpreted as a list of artifacts to publish, with the following elements specified
for each Artifact:

- **name**: mandatory name for the Artifact.
- **paths**: mandatory list of paths to find files making up the artifact

Here's an example of specifying two artifacts via a list of objects. The first artifact, called 'wire', includes
files from two paths:

```yaml
    artifacts:
      - name: wire
        paths: [ backend/*/app/wire_gen.go, backend/*/app/*/wire_gen.go ]
      - name: grpc
        paths: backend/api/grpc/*.pb.go
 ```

## Environment Variables

Jobs and Services can be provided information via environment variables. Variables specified in the Job
apply to every Step within the Job.

Environment variables are specified using a map of variable names to values. Each value can either be a string
(for a literal value) or an object containing a **from_secret** element with a secret name.
[Secrets](../guide-to-dynamic-builds/jobs#secrets) can be used to ensure that the provided information remains secure.

Here's an example of specifying two environment variables, one with a literal value and one using a secret:

```yaml
   environment:
     DATABASE_DRIVER: postgres
     DATABASE_PASSWORD:
        from_secret: DB_PASSWORD 
```

:::tip
Variable names should normally be given in ALL_CAPS since they are mapped to environment variables to be passed
to the Steps and Services at runtime.

When running the `bb` command-line tool the values for any required secrets must be provided in environment variables,
so secret names should also normally be in ALL_CAPS.
:::
