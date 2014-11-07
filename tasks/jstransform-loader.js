'use strict';
var asyncmap = require('map');
var jstransform = require('jstransform');
var concatMap = require('concat-map');
var sourceMap = require('convert-source-map');

var defaultVisitors = [
    'jstransform/visitors/es6-arrow-function-visitors',
    'jstransform/visitors/es6-class-visitors',
    'jstransform/visitors/es6-destructuring-visitors',
    'jstransform/visitors/es6-object-concise-method-visitors',
    'jstransform/visitors/es6-object-short-notation-visitors',
    __dirname + '/transforms/rest-param',
    'jstransform/visitors/es6-template-visitors',
    'jstransform/visitors/es7-spread-property-visitors'  
];

module.exports = function(src) {
    /*jshint validthis:true */
    this.cacheable();
    var cb = this.async();

    var visitors = this.query
        ? this.query.substr(1).split(',')
        : defaultVisitors;

    asyncmap(resolve.bind(this), visitors, resolved.bind(this));
    
    function resolve(path, cb) {
      this.resolve(this.context, path, cb);
    }
    
    function resolved(err, visitors) {
      if (err) return cb(err);

      visitors = concatMap(visitors, function(v) {
        return require(v).visitorList;
      });
      
      var r = jstransform.transform(visitors, src, {
            filename: this.resourcePath,
            sourceMap: true
          });
      
      var map = sourceMap.fromJSON(r.sourceMap);
      map.sourcemap.file = this.resourcePath;
      map.sourcemap.sources = [this.resourcePath];
      map.sourcemap.sourcesContent = [src];

      cb(null, r.code, map.toObject());
    }
};