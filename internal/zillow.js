const Zillow = require('node-zillow');

const zwisd = process.env.ZWISD;

const zillow = new Zillow(zwisd);

const getNeighbours = function getNeighbours(parameters) {
  zillow.get('GetSearchResults', parameters).then((result) => {

    const zpids = result.response.results.result[0].zpid;
    const p = { zpid: zpids, count: 20 };
    const second = zillow.get('GetComps', p);
    const results = [];
    second.then((neighbours) => {
      const comps = neighbours.response.properties.comparables[0].comp;

      comps.forEach((comp) => {
        results.push({ address: comp.address[0], zestimate: comp.zestimate[0] });
      });
    });
      return results;
  });
};
