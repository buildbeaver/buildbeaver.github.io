---
sidebar_position: 5
---
 
# Job Dependency Syntax

Job dependencies are specified using a simple syntax to refer to the job that must be completed.
This includes the workflow, the job name, then optionally ``artifacts`` to request that all artifacts
from the specified job are made available to the dependent job.

If ``artifacts`` is followed by an artifact name then only that artifact is fetched, rather than all
artifacts from the specified job.

Note that if the workflow is omitted then this refers to a job defined in YAML in the *default workflow*,
not the current workflow.

Example job dependency strings:

  ```
    workflow1.test-job
  ```

  ```
    workflow1.test-job.artifacts
  ```

  ```
    workflow1.test-job.artifacts.report
  ```
