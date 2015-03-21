# Development

Assuming you already have [Node.js](http://nodejs.org/) (and [npm](https://www.npmjs.org/)) installed …

## Install [Grunt](http://gruntjs.com/):

```bash
$ npm install -g grunt-cli
```

**Note:** This project installs the Grunt [command line interface](https://github.com/gruntjs/grunt-cli), as a local dependency, so you can skip the above command if you only use the following `$ npm run` commands.

## Get the code:

Clone repository to your local machine:

```bash
$ git clone https://github.com/USER/REPO.git
```

... and navigate to:

```bash
$ cd REPO/source/
```

## Install, or update, dependencies:

```bash
$ npm install
# ... or:
$ npm update
```

## Got [Bower](http://bower.io/)?

If applicable, update Bower packages:

```bash
$ grunt plugins
# ... or:
$ npm run plugins
```

## Watch:

Let grunt run a build when “watched” files change:

```bash
$ grunt watch
# ... or:
$ npm run watch
```

## Build:

Manually run a buld:

```bash
$ grunt
# ... or:
$ npm run grunt
```

## Demo:

Visit the demo page:

<http://localhost/REPO/demo/>

**Note:** The above URL will depend upon your local development environment; for previewing my projects I use [XAMPP](http://www.apachefriends.org/index.html).

## Edit:

At this point, you can modify any of the files, especially the ones found in the `source/files/` directory.

## That it?

If you plan on contributing to this repo, please read [CONTRIBUTING.md](CONTRIBUTING.md).

