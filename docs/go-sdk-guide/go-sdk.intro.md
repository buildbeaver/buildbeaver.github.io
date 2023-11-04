---
sidebar_position: 1
---
# Key Concepts

BuildBeaver is centered on the idea of fully dynamic builds that can be run anywhere. That means on your laptop,
inside a CI system (including GitHub Actions).

**Build Controller**: There is a single *Build Controller* job per build, which defines the workflows making up the
build and adds all dynamically-submitted jobs to the build.

**API Based**: The Build Controller job communicates with the BuildBeaver server (or a cut-down server running
inside the **bb** executable) via the *Dynamic REsT API*. There is an OpenAPI definition for this API, as well
as language-specific clients.

**Go SDK**: The Go SDK provides the functionality needed to define the Build Controller for your build as a
Golang program. The Go SDK is open source and available [on GitHub](https://github.com/buildbeaver), and consists
of two packages:

- The **Dynamic API ['bb' package](https://github.com/buildbeaver/sdk/dynamic/bb)** provides an easy-to-use interface
for building and submitting Jobs, as well as support for events, subscriptions and workflows.

- The **OpenAPI ['client' package](https://github.com/buildbeaver/sdk/dynamic/bb/client)** is a generated OpenAPI client.
This provides a lower-level (and less friendly) interface to the API, and does not normally need to be
called directly. Many data types from this package are used in the 'bb' package.

**Python and TypeScript SDKs**: OpenAPI-generated clients in Python, TypeScript, and other languages are coming
soon, followed by custom libraries providing similar functionality to the 'bb' package.
