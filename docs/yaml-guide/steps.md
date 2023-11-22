---
sidebar_position: 3
---

# Steps

Each Job has a `steps` element containing a list of Steps.
The YAML Step syntax mirrors the definition of Steps in the Dynamic SDK;
see [Steps](../guide-to-dynamic-builds/steps) Guide for details.
The following elements can be specified:

- **name**: mandatory name for the step; referred to in step dependencies.
- **description**: optional description for the step.
- **commands**: mandatory list of strings that are commands to run for the step.
- **depends**: optional list of step names that are dependencies

Here's an example of declaring a single step named 'test' that runs two commands:

```yaml
    steps:
      - name: test
        commands: |
          . build/scripts/lib/go-env.sh
          cd backend && go test -v -count=1 -mod=vendor -short ./...
 ```
