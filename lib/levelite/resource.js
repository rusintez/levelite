/*
 * Resource
 */


/*
 * Module dependencies
 */

var path            = require('path'),
    _               = require('underscore'),
    DocumentStore   = require('./store/document'),
    FileStore       = require('./store/file');


/*
 * Resource
 * 
 * @param {String} dbpath, path to resource database
 * @param {Object} options, resource related options 
 * @return {Resource} resource
 */

function Resource(dbpath, options) {
  this.docs     = new DocumentStore(path.resolve(dbpath, 'json'));
  this.files    = new FileStore(path.resolve(dbpath, 'blob'));
  this.options  = options;
}


/*
 * Close databases, free up resources
 * 
 * @param {Function} callback(error)
 */

Resource.prototype.close = function(cb) {
  this.docs.close(function(err) {
    if (err) return cb(err);
    this.files.close(cb);
  }.bind(this));
}


/*
 * Expose
 */

exports = module.exports = Resource;