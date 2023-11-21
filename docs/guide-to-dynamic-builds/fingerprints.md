---
sidebar_position: 7
---

# Fingerprints

Fingerprints allow the running of a Job to be skipped if the Artifacts from a previously successful run
of the Job can be used instead. This can make builds faster, potentially *much* faster than having to run every
Job during every Build.

If no fingerprint is defined for a Job then it will never be skipped.

## Defining a Fingerprint

The workflow handler function defines a Fingerprint for a Job by calling the ``Fingerprint()`` method on
the Job object. This method takes a list of commands (strings) that list the Job's inputs. The
commands should output either the full input data, or a hash of the data, to stdout.

Before the Job's Steps are run, all the fingerprint commands will be run, and their stdout output concatenated
together and hashed. This hash becomes the Job's fingerprint for this particular Build run.

If the fingerprint is the same as for a previous run then the Job's steps will not be run, i.e. the Job will be
*skipped*. Any artifacts the Job would have produced will be obtained from the previous build run instead.

:::tip
It's up to you to ensure it's OK to skip the Job and use artifacts from a previous run if the fingerprint is
the same. If the Job output depends on something other than inputs that can be listed by fingerprint commands then
the Job can't be skipped, and Fingerprints should not be used.

(As a trivial example, a Job's output might depend on a random number generated within one of the Job's Steps.)
:::

Here's an example of a Job that makes use of Fingerprints to skip execution. The Job reverses
the order of the lines in file 'input.txt' (expected to be in the root directory of the Repo) and outputs the
results to an artifact called 'output.txt':

```go
	w.Job(bb.NewJob().
		Name("fingerprint-testing-job").
		Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).
		Fingerprint("cat input.txt").
		Step(bb.NewStep().
			Name("reverse-the-lines").
			Commands("nl input.txt  | sort -nr | cut -f 2- >output.txt")).
		Artifact(bb.NewArtifact().
			Name("output-text-file").
			Paths("output.txt")))
```

Although this is a trivial example, the 'reverse-the-lines' step is only run if the `input.txt` file has changed
since last time the job was run.

## Forcing all Jobs to run

To force all Jobs to be re-run, regardless of fingerprints, use the ```-f``` option on the ``bb`` command
line tool; this can be a useful test if you think some data was missed out of a fingerprint causing an out-of-dat
artifact to be used:

```bash
bb run -f
```

