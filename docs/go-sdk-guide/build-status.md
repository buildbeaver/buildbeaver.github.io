---
sidebar_position: 5
---

# Build Status

- Fetching build and job status

  ```func GetBuild() (*Build, error)```

  ```func MustGetBuild() *Build```

  ```func (b *Build) GetBuildGraph() (*client.BuildGraph, error)```

  ```func (b *Build) GetJob(jobID JobID) (*client.Job, error)```

  ```func (b *Build) GetJobGraph(jobID JobID) (*client.JobGraph, error)```

  ```func (b *Build) MustGetJobGraph(jobID JobID) *client.JobGraph```

- Fetching artifacts

  ```func (b *Build) ListArtifacts(workflow string, jobName string, groupName string) (*ArtifactPage, error)```

  ```func (b *Build) ListArtifactsN(workflow string, jobName string, groupName string, pageSize int) (*ArtifactPage, error)```

  ```func (b *Build) GetArtifactData(artifactID string) ([]byte, error)```

- Fetching logs

  ```func (b *Build) GetLogDescriptor(logDescriptorID string) (*client.LogDescriptor, error)```

  ```func (b *Build) ReadLogData(logDescriptorID string, expand bool) (io.ReadCloser, error)```

  ```func (b *Build) ReadLogText(logDescriptorID string, expand bool) (io.ReadCloser, error)```
