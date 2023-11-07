---
sidebar_position: 3
---

# Run It!

Run your first build using the BuildBeaver command line tool:

```bash
bb run
✓ .write-file-job succeeded                                               600ms
```

or use the ```-v``` option to run with more detailed logging to stdout, including the logging output from all
Jobs and Steps:

```bash
bb run -v
write-file-job.: Pulling Docker image...
write-file-job.: Docker pull strategy is "default", image exists in cache and is not latest; "docker.io/library/golang:1.17.13" will not be pulled
write-file-job.: Fingerprinting disabled as no fingerprint commands were defined. Consider using fingerprints to speed up this job.
write-file-job.: Uploading artifacts...
```

After the build has run, we can see the artifact produced:

```bash
% ls output
artifact-file.txt
% cat output/artifact-file.txt
This is the artifact from my first build
```
