# Image Processing API

This project has one end point `/images` that returns a resized image and caches for subsequent access.

## Install

Run `npm install` to install the dependencies.

## Run

Run `npm run start` to start the API at `http://localhost:3000`

The endpoint is at `http://localhost:3000/api/images` and accepts the following queries:

1. `filename`: the name of the image to resize and cache
2. `width`: width to resize the image
3. `height`: height to resize the image

## Other scripts:

To run tests: `npm run test`

To lint: `npm run lint`

To format the code: `npm run format`
