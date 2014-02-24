/*
 * Document format: (supports promotion to localisation)
 * 
 * {
 *   _id: "abc123456"     // machine-id, + record-id (record-id is a unique timestamp)
 *   _doc: {...}          // actual document
 *   _attachments: []     // a list of file objects ?
 *   _createdAt: timestamp
 *   _updatedAt: timestamp
 * }
 * 
 * File format: (supports promotion to localisation)
 * 
 * {
 *   _id:   "abc123456"         // machine-id + record-id (uniq timestamp)
 *   _name: "cover"             // content dispositions
 *   _filename: "a.png"         // filename
 *   _filesize: 16325552        // filesize in bytes
 *   _contentType: "image/png"  // contenttype
 *   _fields: {}                // meta-data sent along with the file
 *   _createdAt: timestamp
 *   _updatedAt: timestamp
 * }
 * 
 * API
 * 
 * var Levelite = require('levelite');
 * 
 * var db = new Levelite(dbpath);
 * 
 * db('users').list(cb)
 * db('sessions').find('id', cb)
 * db('secrets').drop(cb)
 */


var assert    = require('assert'),
    fs        = require('fs'),
    Levelite  = require('../'),
    exec      = require('child_process').exec;


describe('Levelite', function() {
  
  
  
  describe('#constructor', function() {
    
    describe('@dbpath', function() {
      
      var db, dbpath = __dirname + '/db';
      
      before(function() {
        db = new Levelite(dbpath);
      });
      
      after(function(done) {
        db.close(done);
      });
      
      after(function(done) {
        exec('rm -rf ' + dbpath, function(){
          done();
        });
      });
      
      it('should take a database path', function() {
        db('test');
        assert(fs.existsSync(dbpath));
      });
      
      it('should respond with an error if dbpath is malformed', function() {
        assert.throws(Levelite, null);
      });
    });
    
    describe('@options', function() {
      it('should take options', function() {
        
      });
      it('should respond with an error if options are malformed');
    });
    
  });
  
  describe('Storage', function() {
    
    describe('Document', function() { 
      
      describe('#create', function() {
        it('should create a document');
        it('should respond with an error, when a document with the same id already exists');
      });
      
      describe('#update', function() {
        it('should update a document');
        it('should respond with an error if document does not exist');
        it('should respond with an error if document id is not defined');
      });
      
      describe('#exists', function() {
        it('should respond, when document exists');
        it('should respond, when document does not exist');
        it('should respond with an error if document id is not defined');
      });
      
      describe('#remove', function() {
        it('should remove existing document');
        it('should respond with an error, when document does not exist');
        it('should respond with an error if document id is not defined');
      });
      
      describe('#list', function() {
        it('should respond with array of documents');
        it('should respond with an empty array, when collection is empty');
        it('should have a default limit of 100 documents');
        it('should support limit configuration');
        it('should respond with an error when limit is malformed');
        it('should support pagination');
        it('should respond with an empty array, when pagination is out of bounds');
        it('should respond with an error, when pagination is malformed');
        it('should return a stream, when no callback is provided');
      });
      
      describe('#get or #findOne', function() {
        it('should return one record, when id is provided');
        it('should respond with an error, when record with this id is not found');      
        it('should return one record, when query is provided');
        it('should respond with an error, when no records match query');
      });
      
      describe('#query or #find', function() {
        it('should return records, that match a given query');
        it('should return an empty array, if no records match a given query');
      });
      
      describe('#drop', function() {
        it('should drop (document and file) database');
      });
      
    });
    
    describe('File', function() {
      
      describe('#create', function() {
        it('should create a new file');
        it('should respond with an error when no file data provided');
      });
      
      describe('#remove', function() {
        it('should remove existing file');
        it('should respond with an error when file does not exist');
        it('should respond with an error, when file id is not defined');
      });
      
      describe('#exists', function() {
        it('should respond, when file exists');
        it('should respond, when file does not exist');
        it('should respond with an error, when file id is not defined');
      });
      
      describe('#list', function() {
        it('should respond with array of file descriptors');
        it('should respond with an empty array, when collection is empty');
        it('should have a default limit of 100 file descriptors');
        it('should support limit configuration');
        it('should respond with an error when limit is malformed');
        it('should support pagination');
        it('should respond with an empty array, when pagination is out of bounds');
        it('should respond with an error, when pagination is malformed');
        it('should return a stream, when no callback is provided');
      });
      
      describe('#get or #findOne', function() {
        it('should return one file, when id is provided');
        it('should return an error, when file is not found');
        it('should return one file, when query is provided');
        it('should respond with an error, when no files match query');
      });
      
      describe('#query or #find', function() {
        it('should return an array of file descriptors, that match a given query');
        it('should return an empty array, if no file descriptors match a given query');
      });
      
    });
    
  });
  
  describe('Query', function() {
    describe('sift', function() {
      
    });
    describe('sift#regex', function() {
      
    });
    //
    // sift for options (underscored values?)
    // db('articles').query({}, { _createdAt: { $lt: Date.now() } })
    // query({}, fn)
    // if use options query
    // 
  });
  
  describe('Replication', function() {
    describe('duplex', function() {});
    describe('downstream', function() {});
    describe('upstream', function() {});
  });
});