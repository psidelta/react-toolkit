'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PNGFile = {
  name: 'screenshot.png',
  size: 1024 * 1024 + 10,
  id: 1
};

var JPGFile = {
  name: 'wallpaper.jpg',
  size: 1024 * 1024 + 10,
  id: 2
};

var PDFile = {
  name: 'invoice-ducument.pdf',
  size: 1024 * 1024 * 5,
  id: 3
};

var SVGFile = {
  name: 'vector-icon.svg',
  size: 1024 * 1024 * 5,
  id: 4
};

var MOVFile = {
  name: 'night-of-the-living-dead.mov',
  size: 1024 * 1024 * 2000,
  id: 5
};

var TORRENTFile = {
  name: 'night-of-the-living-dead.torrent',
  size: 1024 * 35,
  id: 6
};

var files = [PNGFile, JPGFile, PDFile, SVGFile, MOVFile, TORRENTFile];

exports.files = files;
exports.PNGFile = PNGFile;
exports.JPGFile = JPGFile;
exports.PDFile = PDFile;
exports.SVGFile = SVGFile;
exports.MOVFile = MOVFile;
exports.TORRENTFile = TORRENTFile;