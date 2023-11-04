# BuildBeaver Documentation

Source content is on `main` branch, deployed live site is on `gh-pages` branch.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

To deploy the latest content from `main` branch to `gh-pages` branch:
```
$ GIT_USER=<Your GitHub username> yarn deploy
```
