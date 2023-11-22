---
sidebar_position: 1
---

# Simplified YAML

BuildBeaver has a simple YAML syntax that covers jobs, steps, services and artifacts.

We believe that more complex requirements like Matrix Builds, conditional jobs and other
programming-language-like structures are better expressed using the loops, if statements
and other constructs of a 'real' (procedural) programming language, so the YAML syntax
covers just the basics.

Our aim is to avoid build pipelines turning into a 'spaghetti' of complex YAML. We urge
users to consider using [Dynamic Builds](../category/guide-to-dynamic-builds) and the BuildBeaver SDK instead of YAML.


## YAML files

To build your Repo using BuildBeaver you must have a file called `buildbeaver.yml` in the
root directory of your repo. (The following alternative file names will also work if you prefer:
".buildbeaver.yml", ".buildbeaver.yaml" or "buildbeaver.yaml").

The YAML file contains the Jobs that run for the build. If using Dynamic Builds then this YAML would typically
only specify one Job, with Steps to compile (if needed) and run the Build Controller program that will submit
all further Jobs dynamically.
