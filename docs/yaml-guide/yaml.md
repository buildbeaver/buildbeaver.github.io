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
users to consider using dynamic builds and the BuildBeaver SDK instead of YAML.
