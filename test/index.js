var Bundle = require(process.cwd() + '/index.js');
var expect = require('expect.js');

describe('Bundle', function() {
  beforeEach(function() {
    this.bundle = new Bundle();
  });

  describe('findParts(params)', function() {
    it('returns a list of parts by type', function() {
      this.bundle.setParts([{
        type: 'type-1',
        name: 'A',
        data: 'data-A'
      }, {
        type: 'type-1',
        name: 'B',
        data: 'data-B'
      }, {
        type: 'type-2',
        name: 'C',
        data: 'data-C'
      }]);

      var result = this.bundle.findParts({
        type: 'type-1'
      });

      expect(result).to.eql([{
        type: 'type-1',
        name: 'A',
        data: 'data-A'
      }, {
        type: 'type-1',
        name: 'B',
        data: 'data-B'
      }]);
    });
  });

  describe('canAddPart(name, type)', function() {
    it('returns false if type is not provided', function() {
      var result = this.bundle.canAddPart('a');
      expect(result).to.be(false);
    });

    it('returns true if name is not provided', function() {
      var result = this.bundle.canAddPart(null, 'a');
      expect(result).to.be(true);
    });

    it('returns false if name is already taken', function() {
      this.bundle.setParts([{
        type: 'type-1',
        name: 'A',
        data: 'data-A'
      }]);

      var result = this.bundle.canAddPart('A', 'type-1');
      expect(result).to.be(false);
    });

    it('it returns true if name is unique, and type is provided', function() {
      this.bundle.setParts([{
        type: 'type-1',
        name: 'A',
        data: 'data-A'
      }]);

      var result = this.bundle.canAddPart('B', 'type-1');
      expect(result).to.be(true);
    });
  });

  describe('addPart(name, type, data)', function() {
    it('adds the part with name, type and data', function() {
      this.bundle.addPart('test', 'test', {
        a: 1
      });

      var parts = this.bundle.getParts();
      expect(parts.length).to.be(1);
      expect(parts[0]).to.have.keys(['name', 'type', 'data', 'createdAt']);

      expect(parts[0].name).to.eql('test');
      expect(parts[0].type).to.eql('test');
      expect(parts[0].data).to.eql({
        a: 1
      });
    });
  });

  describe('removePart(name)', function() {
    it('removes the part with the given name', function() {
      this.bundle.addPart('test1', 'test', null);
      this.bundle.addPart('test2', 'test', null);
      this.bundle.removePart('test1');

      expect(this.bundle.getParts().length).to.be(1);
    });
  });

  describe('updatePart(name, type, data)', function() {
    it('updates the part with the given name', function() {
      this.bundle.addPart('test', 'A', null);
      this.bundle.updatePart('test', 'B', 'data');

      var parts = this.bundle.getParts();
      expect(parts.length).to.be(1);
      expect(parts[0].name).to.eql('test');
      expect(parts[0].type).to.eql('B');
      expect(parts[0].data).to.eql('data');
    });
  });

  describe('getPart(name)', function() {
    it('returns the part with the given name', function() {
      this.bundle.addPart('test', 'A', 'data');

      var part = this.bundle.getPart('test');
      expect(part.name).to.eql('test');
      expect(part.type).to.eql('A');
      expect(part.data).to.eql('data');
    });

    it('returns null if it can\'t find the part', function() {
      this.bundle.addPart('test', 'A', 'data');

      var part = this.bundle.getPart('other');
      expect(part).to.be(null);
    });
  });

  describe('getPartData(name)', function() {
    it('returns the data of the part with the given name', function() {
      this.bundle.addPart('test', 'A', 'data');

      var data = this.bundle.getPartData('test');
      expect(data).to.eql('data');
    });

    it('returns null if it can\'t find the part', function() {
      this.bundle.addPart('test', 'A', 'data');

      var data = this.bundle.getPartData('other');
      expect(data).to.eql(null);
    });
  });

  describe('getPartsData(type)', function() {
    it('returns a list of data for the given type', function() {
      this.bundle.addPart('test1', 'A', 'data1');
      this.bundle.addPart('test2', 'A', 'data2');

      var data = this.bundle.getPartsData('A');
      expect(data).to.eql(['data1', 'data2']);
    });
  });
});
