var moment = require('moment');
var _ = require('underscore');

module.exports = (function() {
  var Bundle = function() {
    var parts = [];

    this.getParts = function() {
      return parts;
    };

    this.setParts = function(newParts) {
      parts = newParts;
    };
  };

  Bundle.prototype.findParts = function(params) {
    var props = _.extend({}, params);
    return _.where(this.getParts(), props);
  };

  Bundle.prototype.canAddPart = function(name, type) {
    if (!type) return false;
    if (!name) return true;

    var parts = this.findParts({
      name: name
    });

    return parts.length === 0;
  };

  Bundle.prototype.addPart = function(name, type, data) {
    if (this.canAddPart(name, type, data)) {
      this.getParts().push({
        createdAt: moment().valueOf(),
        type: type,
        name: name,
        data: data
      });
    }
  };

  Bundle.prototype.removePart = function(name) {
    var parts = _.filter(this.getParts(), function(part) {
      return part.name !== name;
    });
    this.setParts(parts);
  };

  Bundle.prototype.updatePart = function(name, type, data) {
    this.removePart(name);
    this.addPart(name, type, data);
  };

  Bundle.prototype.getPart = function(name) {
    var parts = this.findParts({
      name: name
    });
    if (parts.length === 1) {
      return parts[0];
    }
    else {
      return null;
    }
  };

  Bundle.prototype.getPartData = function(name) {
    var part = this.getPart(name);
    if (_.isObject(part)) {
      return part.data;
    }
    else {
      return null;
    }
  };

  Bundle.prototype.getPartsData = function(type) {
    var parts = this.findParts({
      type: type
    });

    return _.pluck(parts, 'data');
  };

  return Bundle;
}());
