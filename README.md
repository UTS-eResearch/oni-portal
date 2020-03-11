### Oni Portal 

This is the front-end for Oni, a scalable and searchable data repository built on ocfl.

It should be deployed as part of [https://github.com/UTS-eResearch/oni-express](Oni Express)

### Install

```bash
npm install
```

### Development

run npm scripts for development

#### Webpack

```bash
npm run start:dev
``` 

and go to [http://localhost:9000](http://localhost:9000)

### Compile

```bash
npm run build
```

should generate a [dist](./dist) folder with compiled SPA and watch for changes

### Configure

Use [./config.json](./config.json) to point to your current solr configuration and repository

Use [./index.js](./index.js) to configure state of your app (to be moved to configuration)
