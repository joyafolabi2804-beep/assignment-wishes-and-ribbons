(function (root) {
  'use strict';
  const products = {
    mask: {name: 'Face sheet mask', kind: 'item', price: 490, sample: true, image: 'product-mask.jpg', description: 'SANZI Beauty · Hydrating Hyaluronic Acid Mask', group: 'Self-care essentials'},
    ruffle: {name: 'Brown ruffle', kind: 'item', price: 590, sample: true, image: 'product-ruffle.png', description: 'A soft brown finishing touch for an everyday ritual.', group: 'Self-care essentials'},
    cream: {name: 'Hand cream', kind: 'item', price: 790, sample: true, image: 'product-cream.png', description: 'MARIA ÅKERBERG · Hand Cream Beautiful', group: 'Self-care essentials'},
    tea: {name: 'Addis black tea', kind: 'item', price: 690, sample: true, image: 'product-tea.png', description: 'Diré Blends · Addis Black Tea Gold · 100 g', group: 'Tea & kitchen rituals'},
    rosemarySpice: {name: 'Rosemary spice tin', kind: 'item', price: 550, sample: true, image: 'product-rosemary.jpg', description: 'Mill & Mortar · Rosemary', group: 'Tea & kitchen rituals'},
    corianderSpice: {name: 'Coriander spice tin', kind: 'item', price: 590, sample: true, image: 'product-coriander.jpg', description: 'Mill & Mortar · Whole Coriander Seeds', group: 'Tea & kitchen rituals'}
  };
  const boxColours = {
    black: {name: 'Black', colour: '#282421', price: 400},
    white: {name: 'White', colour: '#FFFFFF', price: 400},
    kraft: {name: 'Kraft', colour: '#B38C61', price: 400}
  };
  const fillerColours = {
    ivory: {name: 'Ivory', colour: '#F0E4CD', price: 0},
    white: {name: 'White', colour: '#FFFFFF', price: 0},
    kraft: {name: 'Kraft', colour: '#B9946B', price: 0}
  };
  const combinations = {selfcare: ['mask', 'ruffle', 'cream'], teaBox: ['tea', 'rosemarySpice', 'corianderSpice']};
  const itemIds = Object.keys(products);
  const validQuantity = q => Number.isInteger(q) && q > 0 && q <= 20;
  function cleanContents(contents) {
    return Object.fromEntries(itemIds.filter(id => validQuantity(contents?.[id])).map(id => [id, contents[id]]));
  }
  function validPackaging(choice) {
    return choice && Object.hasOwn(boxColours, choice.boxColor) && Object.hasOwn(fillerColours, choice.fillerColor);
  }
  function packaging(choice = {boxColor: 'black', fillerColor: 'ivory'}) {
    if (!validPackaging(choice)) throw new Error('Choose an available box and filler colour.');
    return {boxColor: choice.boxColor, fillerColor: choice.fillerColor};
  }
  function packingPrice(choice) {
    if (!validPackaging(choice)) throw new Error('Choose an available box and filler colour.');
    return boxColours[choice.boxColor].price + fillerColours[choice.fillerColor].price;
  }
  function signature(line) {
    return line.product === 'custom' ? 'custom:' + line.boxColor + ':' + line.fillerColor + ':' + JSON.stringify(Object.entries(line.contents).sort()) : line.product;
  }
  function normalize(input) {
    if (!Array.isArray(input)) input = Object.entries(input || {}).map(([id, quantity]) => ({product: id === 'calm' ? 'selfcare' : id, quantity}));
    const result = [];
    for (const line of input.slice(0, 100)) {
      if (!line || !validQuantity(line.quantity)) continue;
      let clean;
      if (line.product === 'custom' || Object.hasOwn(combinations, line.product)) {
        const contents = cleanContents(line.product === 'custom' ? line.contents : Object.fromEntries(combinations[line.product].map(id => [id, 1])));
        const colours = {boxColor: line.boxColor ?? 'black', fillerColor: line.fillerColor ?? 'ivory'};
        if (!Object.keys(contents).length || !validPackaging(colours)) continue;
        clean = {product: 'custom', quantity: line.quantity, contents, ...colours};
      } else if (Object.hasOwn(products, line.product)) clean = {product: line.product, quantity: line.quantity};
      else continue;
      const existing = result.find(x => signature(x) === signature(clean));
      if (existing) existing.quantity = Math.min(20, existing.quantity + clean.quantity); else result.push(clean);
    }
    return result;
  }
  function add(cart, product, quantity = 1, contents, choice) {
    if (!validQuantity(quantity)) throw new Error('Choose a quantity between 1 and 20.');
    if (product !== 'custom' && !Object.hasOwn(products, product)) throw new Error('Unknown product.');
    if (product === 'custom' && !Object.keys(cleanContents(contents)).length) throw new Error('Choose at least one item for your box.');
    const line = {product, quantity, ...(product === 'custom' ? {contents: cleanContents(contents), ...packaging(choice)} : {})};
    return normalize([...cart, line]);
  }
  function itemPrice(line) {
    return line.product === 'custom' ? Object.entries(line.contents).reduce((sum, [id, q]) => sum + products[id].price * q, 0) : products[line.product]?.price ?? null;
  }
  function unitPrice(line) {
    const items = itemPrice(line);
    return items === null ? null : items + (line.product === 'custom' ? packingPrice(line) : 0);
  }
  function summary(cart) {
    let itemsCents = 0, packagingCents = 0, pending = false, count = 0;
    for (const line of cart) {
      count += line.quantity;
      const items = itemPrice(line);
      if (items === null) pending = true; else itemsCents += items * line.quantity;
      if (line.product === 'custom') packagingCents += packingPrice(line) * line.quantity;
    }
    return {itemsCents, packagingCents, knownCents: itemsCents + packagingCents, pending, count};
  }
  function name(line) { return line.product === 'custom' ? 'Your ' + boxColours[line.boxColor].name.toLowerCase() + ' gift box' : products[line.product].name; }
  function details(line) {
    if (line.product !== 'custom') return [];
    return [...Object.entries(line.contents).map(([id, q]) => `${products[id].name} × ${q}`), 'Box: ' + boxColours[line.boxColor].name, 'Filler: ' + fillerColours[line.fillerColor].name];
  }
  const api = {products, itemIds, combinations, boxColours, fillerColours, cleanContents, packaging, packingPrice, normalize, add, itemPrice, unitPrice, summary, name, details};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.WRShop = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
