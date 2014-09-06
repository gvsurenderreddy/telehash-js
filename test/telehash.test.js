var expect = require('chai').expect;
var telehash = require('../telehash.js');

describe('telehash', function(){

  var idA = {"keys":{"1a":"0ecv95ajma11pg3uwauzhh9t8mnx5wzxhw"},"secrets":{"1a":"vkuu5mm3njjg4v7j4f3mx5hkd9dzbevu"},"hashname":"hdaybn855322qnwyrrgpzvckqffuf8xqz6tqy338t560qgk2v45g"};
  var idB = {"keys":{"1a":"0b5076hpzgud3mgca1y04nfayt2p3np8tg"},"secrets":{"1a":"k03b22mb4vj4cf57w31e646ygj35cbmp"},"hashname":"uvgehzf7yh1t8e656b4c4x17xzh5ngmvz8ww49zk9cabufzn3g7g"};

  it('should export an object', function(){
    expect(telehash).to.be.a('object');
  });

  it('should support adding extensions', function(){
    expect(telehash.add({name:'test'})).to.be.true;
  });

  it('should support logging', function(done){
    telehash.log({debug:function(msg){
      expect(msg).to.exist;
      // disable
      telehash.log({debug:function(){}});
      done();
    }});
    // just run something that logs
    telehash.generate(function(err, secrets){});
  });

  it('should generate', function(done){
    telehash.generate(function(err, id){
      expect(err).to.not.exist;
      expect(id).to.be.an('object');
      expect(id.hashname).to.be.a('string');
      expect(id.hashname.length).to.be.equal(52);
//      console.log('idA',JSON.stringify(id));
      done();
    });
  });

  it('should create a mesh', function(done){
    telehash.mesh({id:idA},function(err, mesh){
      expect(err).to.not.exist;
      expect(mesh).to.be.an('object');
      expect(mesh.hashname).to.be.equal('hdaybn855322qnwyrrgpzvckqffuf8xqz6tqy338t560qgk2v45g');
      expect(mesh.router).to.be.a('function');
      expect(mesh.route).to.be.a('function');
      expect(mesh.link).to.be.a('function');
      expect(mesh.discover).to.be.a('function');
      done();
    });
  });

  it('should create a link', function(done){
    telehash.mesh({id:idA},function(err, mesh){
      var link = mesh.link({keys:idB.keys});
      expect(link).to.be.an('object');
      expect(link.hashname).to.be.equal('uvgehzf7yh1t8e656b4c4x17xzh5ngmvz8ww49zk9cabufzn3g7g');
      expect(link.router).to.be.a('function');
      expect(link.route).to.be.a('function');
      done();
    });
  });

});