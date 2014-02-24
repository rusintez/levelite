/*
 * Levelite
 */


/*
 * Module dependencies
 */

var path            = require('path'),
    _               = require('underscore'),
    Resource        = require('./resource');


/*
 * Defaults
 */

var defaults = {};


/*
 * Levelite Constructor
 * 
 * @param {String} dbpath, path to database folder, required
 * @param {Object} globals, optional
 * @return {Function} fn(name, locals), resource builder
 */

function Levelite(dbpath, globals) {
  
  if (!(this instanceof Levelite))
    return new Levelite(dbpath, globals);
  
  if (!dbpath || typeof dbpath !== 'string')
    throw new Error('dbpath must be a string, got ' + dbpath);
  
  var resources = {};
  
  
  /*
   * Finds or creates a resource
   * 
   * @param {String} name, required
   * @param {Object} locals, optional
   * @return {Resource} resource
   */
  
  var Builder = function(name, locals) {
    
    if (!name || typeof name !== 'string')
      throw new Error('name must be a string, got ' + name);
    
    if (!resources[name]) {
      var options = _.extend({}, defaults, globals, locals);
      resources[name] = new Resource(path.resolve(dbpath, name), options);
    }
    return resources[name];
  }
  
  
  /*
   * Close all databases
   * 
   * @param {Function} callback(error)
   */
  
  Builder.close = function(cb) {
    var afterAll = _.after(_.keys(resources).length, cb);
    _.each(resources, function(resource) {
      resource.close(afterAll);
    });
    resources = {}; // reset resources as well
  }
  
  return Builder;
}

// ensure function is returned even when `new` keyword is used
Levelite.prototype.constructor = Levelite; 


/*
 * Expose
 */

exports = module.exports = Levelite;