---
sidebar_position: 4
---

# Docker Configuration

A Job's docker container configuration is specified using a 'docker' map.

The YAML syntax mirrors the Docker Configuration in the Dynamic SDK; see the
[Docker Configuration](../guide-to-dynamic-builds/docker-configuration) Guide for details.
The following elements can be specified:

- **image**: mandatory name of the Docker image to use when running this Job.
- **shell**: optional shell to use to run commands inside the docker container.
- **pull**: optional docker pull strategy; possible values are "default", "never", "always" or "if-not-exists".
- **basic_auth**: optional basic auth credentials for the Docker registry, to use when fetching the Docker image.
- **aws_auth**: optional AWS auth credentials for Amazon ECR, to use when fetching the Docker image.

See [Authentication for Docker Registries](#authentication-for-docker-registries) for details of the **basic_auth**
and **aws_auth** elements.

## Authentication for Docker Registries

Basic Authentication to a Docker Registry, or AWS Authentication to Amazon ECR, works in a similar way to the
Dynamic SDK; see the
[Authentication for Docker Registries Guide](../guide-to-dynamic-builds/docker-configuration#authentication-for-docker-registries)
for more details.

For Basic Authentication a **basic_auth** map can include the following elements:

- **username**: mandatory username to use for authentication; either a string literal or a secret name
- **password**: mandatory password, either a string literal or a secret name

For AWS Authentication an **aws_auth** map can include the following elements:

- **aws_region**: optional AWS region (string) to use when authenticating to Amazon ECR
- **aws_access_key_id**: mandatory AWS Access Key ID to use when authenticating; either a string literal or a secret name
- **aws_secret_access_key**: mandatory AWS Secret Access Key to use when authenticating; either a string literal or a secret name

For the **username**, **password**, **aws_access_key_id** and **aws_secret_access_key** fields above,
[Secrets](../guide-to-dynamic-builds/jobs#secrets) can be used to ensure that the provided
information remains secure.
For these fields the value can either be a string (for a literal value) or an object containing a **from_secret**
element with a secret name. This is the same syntax as is used for secrets in
[Environment Variables](jobs#environment-variables); see that page for an example.
