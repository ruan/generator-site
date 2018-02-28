# Generator Site [![Build Status](https://secure.travis-ci.org/ruan/generator-cappen-site.png?branch=master)](https://travis-ci.org/ruan/generator-cappen-site)


## Requirements:

* NodeJS (https://nodejs.org/)
* GruntJS (http://gruntjs.com/)
* Yeoman (http://yeoman.io/)
* Bower (http://bower.io/)

## What's inside:

* Susy (http://susy.readthedocs.io/)
* Csstyle (http://csstyle.io/)
* Font Awesome (https://fontawesome.com/v4.7.0/)
* Owl Carousel (Optional) (https://owlcarousel2.github.io/OwlCarousel2/)
* Greensock (Optional) (https://greensock.com/)
* Wow animations (Optional) (https://wowjs.uk/)

## Installation

```bash
npm install -g generator-cappen-site
```

## Usage

- Open a command promp and go to root project;
- Type `yo cappen-site` to install all dependencies;
- Type `npm install` to install all dependencies;
- Run `bower install` to install bower components;
- When the installation is done, type `grunt app` to compile; This will run `watch` in dev mode; For production, type `grunt build`.

## Additional Commands

* [Form template](#form-template)

## Form template

```bash
yo cappen-site:form
```
#### Usage

This will create a few important files:

`
/mockup/form.html
`
This file contains the markup html example (preview it on browser)

`
/scss/components/form.scss
`
This file is the style of form component

`
/scss/layouts/form.scss
`
This file contains the grid settings


