---
sidebar_position: 9
---

# Services

*Services* are processes that can be run alongside a Job to provide supporting capabilities while the Job runs.
For example, a database service could be used to allow a Job that runs tests to interact with the database
while the tests run.

Each Job can specify any number of Services to run. All Services will be started before the Job's 
first Step command is run, and will continue to run until all Steps within the Job have completed.

:::tip
Services are not available when fingerprint commands are run; if a fingerprint is the same as
a previous build, causing the Job to be skipped, the Job's Services will not be started.)
:::

## Adding a Service

The workflow handler function adds a Service to a Job by calling ``NewService()`` to create a
*Service object*, then calling the Job's ``Service()`` method to attach the Service.
Properties are set on the Service by calling methods on the object.

Here's an example (in Go) of a Job making use of a Service:

```go
    w.Job(bb.NewJob().
        Name("test-job").
		Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
        Step(bb.NewStep().
			Name("first-step").
			Commands("echo This step can make use of the postgres server")).
		Service(bb.NewService().
            Name("postgres").
            Image("postgres:14").
            Env(bb.NewEnv().
                Name("POSTGRES_USER").
                Value("user-name")).
            Env(bb.NewEnv().
                Name("POSTGRES_PASSWORD").
                Value("use-secrets-dont-put-password-here"))))
        ))
```

## Service Execution

All services must currently be executed by running a Docker Container; native services are not yet supported.
Each service is started by starting its Docker container, and stopped by stopping the Docker container;
the container itself is responsible for running any commands required to provide the service.

Each service gets to specify its own Docker image and environment variables, independently of the Job it is
attached to.


## Service Definitions

The following methods are available to set properties on a Service:

- **Name** (mandatory): a name to use when referencing the service, unique within the Job.

- **Image** (mandatory): specifies the name of the Docker image to use when running this Service.

- **Env** (optional): specifies an environment variable that should be passed to the Docker container that runs
  the Service. The Env() method can be called multiple times to add multiple variables. Environment variables
  are defined in the same way as for Jobs, and [Secrets](jobs#secrets) can be used; for details please see the Job
  [Environment Variables](jobs#environment-variables) section.

- **BasicAuth** (optional): configures basic auth credentials for the Docker registry, to use when fetching the Docker
  image to run under. Takes a BasicAuth object to specify the username and password for authentication, using
  [Secrets](jobs#secrets) to keep passwords secure..

- **AWSAuth** (optional): configures AWS auth credentials for AWS ECR, to use when fetching the Docker
  image to run under. Takes an AWSAuth object to specify the details for authentication, using
  [Secrets](jobs#secrets) to keep IDs and passwords secure.
