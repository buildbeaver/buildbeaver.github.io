---
sidebar_position: 5
---

# Docker Configuration

Jobs can run either in a Docker container ('docker' jobs) or natively on the machine where the runner or *bb*
executable is running ('native' jobs, also known as 'exec' jobs).

For Docker jobs, configuration options can be specified on a per-job basis by defining Docker Configurations.

# Defining a Docker Configuration

The workflow handler function defines a Docker Configuration by calling ``NewDocker()`` to create a
*Docker Config object*, then calling the Job's ``Docker()`` method to use the config for the Job.
The same Docker Config object can be used for more than one job.
Properties are set on the Docker Config by calling methods on the object.

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

## Docker Configuration Object

The following methods are available to set properties on a Docker Configuration:

- **Image** (mandatory): specifies the name of the Docker image to use when running this Job.

- **Shell** (optional): specifies the shell to use to run commands inside the docker container.
  Default is `/bin/sh` for Unix-based containers, or `cmd.exe` for Windows-based containers.

- **Pull** (optional): specifies when to pull the Docker image from the Registry. Constants are provided for
  these options:

    - ``DockerPullNever``: never pull the image; it must already exist in the cache

    - ``DockerPullAlways``: always pull the image, just before the Job is run each time

    - ``DockerPullIfNotExists``: pull the image only if there is no version in the cache

    - ``DockerPullDefault``: the default behaviour if no Pull() option specified. This is equivalent to
      ``DockerPullAlways`` if the image tag is 'latest', or ``DockerPullIfNotExists`` if the image tag refers
      to a specific version.

- **BasicAuth** (optional): configures Basic Authentication credentials for the Docker registry, to use when
  fetching the Docker image. Takes a BasicAuth object to specify the username and password
  for authentication; see [Authentication for Docker Registries](#authentication-for-docker-registries) for details.

- **AWSAuth** (optional): configures AWS Authentication credentials for Amazon ECR, to use when fetching the Docker
  image. Takes an AWSAuth object to specify the details for authentication;
  see [Authentication for Docker Registries](#authentication-for-docker-registries) for details.


## Authentication for Docker Registries

When pulling a Docker image to be used to run a Job or Service, authentication may be required if the Docker
image is not public. BuildBeaver supports Authentication via Basic Auth (for Docker Registry) or to Amazon Elastic
Container Registry (ECR).

### Basic Authentication

Configure Basic Authentication by calling ``NewBasicAuth()`` to create a *Basic Auth object*, then calling the
Docker Config object's ``BasicAuth()`` method. The following methods are available to set properties on a
Basic Auth object:

- **Username** (optional): specifies the username to use when authenticating, as a string literal.

- **UsernameFromSecret** (optional): specifies the name of a [Secret](jobs#secrets) containing the username
  to use when authenticating. Either Username() or UsernameFromSecret() must be called.

- **PasswordFromSecret** (mandatory): specifies the name of a [Secret](jobs#secrets) containing the password
  to use when authenticating. The password can't be provided as a string literal; it must be provided in a secret.

### Amazon ECR Authentication

Configure Authentication to Amazon ECR by calling ``NewAWSAuth()`` to create an *AWS Auth object*, then calling the
Docker Config object's ``AWSAuth()`` method. The following methods are available to set properties on an
AWS Auth object:

- **Region** (optional): specifies the region (string) to use when authenticating to Amazon ECR.

- **AccessKeyID** (optional): specifies the Access Key ID to use when authenticating, as a string literal.

- **AccessKeyIDFromSecret** (optional): specifies the name of a [Secret](jobs#secrets) containing the
  Access Key ID to use when authenticating. Either AccessKeyID() or AccessKeyIDFromSecret() must be called.

- **SecretAccessKeyFromSecret** (mandatory): specifies the name of a [Secret](jobs#secrets) containing the
  Secret Access Key to use when authenticating. This value can't be provided as a string literal;
  it must be provided in a secret.
