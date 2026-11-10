const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const shop = require('../dist/shop.js');
test('every product is individual, priced and has a standalone image', () => {
  assert.equal(shop.itemIds.length,6);
  assert.ok(!Object.values(shop.products).some(p=>p.kind==='box'));
  for(const id of shop.itemIds){const p=shop.products[id];assert.equal(p.kind,'item');assert.ok(p.price>=400&&p.price<=800);assert.ok(p.image.startsWith('product-'));assert.ok(fs.existsSync('dist/assets/'+p.image));assert.equal(shop.add([],id)[0].product,id);}
  for(const ids of Object.values(shop.combinations))for(const id of ids)assert.ok(shop.itemIds.includes(id));
});
test('all nine box/filler colour combinations preserve their choices and total', () => {
  const contents={mask:2,tea:1,corianderSpice:3};
  for(const boxColor of Object.keys(shop.boxColours))for(const fillerColor of Object.keys(shop.fillerColours)){
    const cart=shop.add([],'custom',1,contents,{boxColor,fillerColor});
    assert.equal(cart[0].boxColor,boxColor);assert.equal(cart[0].fillerColor,fillerColor);
    assert.equal(shop.unitPrice(cart[0]),2*490+690+3*590+400);
    assert.equal(shop.summary(cart).packagingCents,400);
    assert.ok(shop.details(cart[0]).includes('Box: '+shop.boxColours[boxColor].name));
    assert.ok(shop.details(cart[0]).includes('Filler: '+shop.fillerColours[fillerColor].name));
  }
});
test('identical boxes merge; different colours, contents and loose items stay separate', () => {
  let cart=shop.add([],'custom',1,{mask:1,tea:2},{boxColor:'white',fillerColor:'kraft'});
  cart=shop.add(cart,'custom',1,{tea:2,mask:1},{boxColor:'white',fillerColor:'kraft'});
  cart=shop.add(cart,'custom',1,{mask:1,tea:2},{boxColor:'black',fillerColor:'kraft'});
  cart=shop.add(cart,'custom',1,{mask:1,tea:2},{boxColor:'white',fillerColor:'ivory'});
  cart=shop.add(cart,'mask');assert.equal(cart.length,4);assert.equal(cart[0].quantity,2);
  assert.equal(shop.summary(cart).knownCents,4*(490+2*690+400)+490);
  assert.equal(shop.summary(cart).packagingCents,1600);
});
test('loose selection never adds a box or filler charge', () => {
  const loose=shop.add(shop.add([],'cream',2),'rosemarySpice');
  assert.equal(shop.summary(loose).knownCents,2*790+550);assert.equal(shop.summary(loose).packagingCents,0);
});
test('saved custom choices survive reload and old presets migrate to chosen items', () => {
  const cart=shop.add(shop.add([],'ruffle'),'custom',2,{cream:2,rosemarySpice:1},{boxColor:'kraft',fillerColor:'white'});
  assert.deepEqual(shop.normalize(JSON.parse(JSON.stringify(cart))),cart);
  for(const old of [{selfcare:2},{calm:2},[{product:'selfcare',quantity:2}]]){
    const restored=shop.normalize(old);assert.equal(restored[0].product,'custom');assert.equal(restored[0].quantity,2);assert.deepEqual(restored[0].contents,{mask:1,ruffle:1,cream:1});assert.equal(restored[0].boxColor,'black');assert.equal(restored[0].fillerColor,'ivory');
  }
});
test('invalid products, quantities, empty boxes and unavailable colours are rejected', () => {
  for(const id of ['selfcare','teaBox','unknown','constructor','__proto__'])assert.throws(()=>shop.add([],id));
  for(const q of [0,-1,21,1.5,NaN,'2'])assert.throws(()=>shop.add([],'mask',q));
  assert.throws(()=>shop.add([],'custom',1,{}));
  assert.throws(()=>shop.add([],'custom',1,{mask:1},{boxColor:'pink',fillerColor:'white'}));
  assert.throws(()=>shop.add([],'custom',1,{mask:1},{boxColor:'black',fillerColor:'unknown'}));
  assert.deepEqual(shop.normalize([{product:'custom',quantity:1,contents:{mask:1},boxColor:'unknown',fillerColor:'ivory'},{product:'constructor',quantity:1}]),[]);
  assert.equal(shop.add(shop.add([],'mask',20),'mask')[0].quantity,20);
});
