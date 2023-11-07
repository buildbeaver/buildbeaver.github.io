---
sidebar_position: 2
---

# Define a Build

## Create a Git Repo for your build

You will need a Git repo containing the software you wish to build. To get started, create a new
empty git Repo:

```bash
mkdir build1
cd build1
git init .
```

The repo must have a at least one commit:
```bash
echo >.gitignore 'output/'
git add .gitignore
git commit -a -m "Tell Git to ignore the 'output' directory"
```

## Set up a build YAML file:

Let's test that BuildBeaver is working by running a simple YAML based build, before moving on to Go.

Create a ``buildbeaver.yml`` file in the root directory of your repo (e.g. the build1 directory above) using
your favourite editor, and paste in the following content:

```yaml
jobs:
  - name: write-file-job
    docker:
      image: golang:1.17.13
    steps:
      - name: write-file
        commands: |
          mkdir -p output
          echo >output/artifact-file.txt "This is the artifact from my first build"
    artifacts:
      - name: text-file-artifacts
        paths: output/*.txt
 ```

This YAML defines a build with a single Job and a single step, creating an artifact in the 'output' directory.
Note that we don't need to commit this file to Git before running it.
