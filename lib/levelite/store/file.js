/*
 * File Store
 */


/*
 * Module dependencies
 */

var mkdirp  = require('mkdirp'),
    level   = require('level');


/*
 * Constructor
 */
 
function Store(dbpath) {
  mkdirp.sync(dbpath);
  this.level = level(dbpath);
}


/*
 * Close a database
 */
 
Store.prototype.close = function(cb) {
  this.level.close(cb);
}


/*
 * Expose
 */
 
exports = module.exports = Store;