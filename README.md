[![Build Status](https://travis-ci.org/tstibbs/os-map.svg?branch=master)](https://travis-ci.org/tstibbs/os-map)
[![Coverage Status](https://coveralls.io/repos/github/tstibbs/os-map/badge.svg?branch=master)](https://coveralls.io/github/tstibbs/os-map?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/tstibbs/os-map.svg)](https://github.com/tstibbs/os-map/issues)
[![bitHound Overall Score](https://www.bithound.io/github/tstibbs/os-map/badges/score.svg)](https://www.bithound.io/github/tstibbs/os-map)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/tstibbs/os-map/master/LICENSE)

## What is this
OS OpenSpace doesn't have the 1:25,000 mapping and the embeddable Bing client is a bit rubbish. So I thought I'd hook together some pre-existing stuff to make something a bit more appropriate for walking maps that isn't as rubbish as the bing client but still has the 1:25,000 mapping. It's mostly just me experimenting, there will be no technological breakthroughs here.

## Why does it use require.js
Because I wanted to learn about require. The page load time seems to increase significantly with require, so I'd probably remove it if wanted to use this code for something in production.

## How can I try it
[Live demo](http://tstibbs.github.io/os-map/)

## Does it support mobile devices
In theory yes. If we detect that you are using a mobile device then the mouse pointer positioning stuff goes away and the coordinates instead show the location that is at the centre of the bit of the map you are currently viewing. Leaflet itself [already supports mobile devices](http://leafletjs.com/examples/mobile.html).

## Unit tests
There are some basic unit tests covering some of the non-UI functionality. To run these:
```
npm install
npm test
```

## [trigpointing.uk](http://trigpointing.uk)
This project started as an excuse to learn a little about a few javascript libraries I'd never used (leaflet and requirejs mainly). However recently I added some stuff to it to enable it to be used as the map for tripointing.uk, because I struggle to use the "interactive" map on that site. If you want to try this functionality out, you simply need to do a search on trigpointing.uk, then run the following (e.g. in Chrome press F12 and then paste this code into the console):
```
$.getScript("http://tstibbs.github.io/os-map/integration/trigpointing.js");
```
After a short delay it should redirect you to this site and display the results of your search.

Note that for now the integration between the two sites relies on passing a bunch of stuff in the URL so you will need to keep the search to something that returns a smallish number of results (maybe a few 10s) to ensure the URL doesn't get truncated by your browser. Searches for 'name contains' will usually give you a small number (try 'castle' or 'tor').
