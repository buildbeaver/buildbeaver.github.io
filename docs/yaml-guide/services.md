---
sidebar_position: 6
---

# Services

Each Job can optionally have a `services` element containing a list of Services to run alongside the Job.
The YAML Services syntax mirrors the definition of Services in the Dynamic SDK;
see the [Services](../guide-to-dynamic-builds/services) Guide for details.
The following elements can be specified:

- **name**: mandatory name to use when referencing the service, unique within the Job.
- **image**: mandatory name of the Docker image to use when running this Service.
- **environment**: optional list of environment variables to be passed to the Docker container; see [Environment Variables](jobs#environment-variables).
- **basic_auth**: optional basic auth credentials for the Docker registry, to use when fetching the Docker image.
- **aws_auth**: optional AWS auth credentials for Amazon ECR, to use when fetching the Docker image.

See [Authentication for Docker Registries](docker-configuration#authentication-for-docker-registries)
for details of the **basic_auth** and **aws_auth** elements.

Here's an example of declaring a single Service named 'postgres' that runs the postgres
database in a Docker container, specifying a username and password (using a secret):

```yaml
    services:
      - name: postgres
        image: postgres:14
        environment:
          POSTGRES_USER: user-name
          POSTGRES_PASSWORD:
            from_secret: postgres-password-secret
```
