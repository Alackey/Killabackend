
// toMeters converts miles to meters
const toMeters = function toMeters(miles) {
  return miles * 1609.344;
};

// stateToFull converts the state abbreviation to its full name
const stateToFull = function stateToFull(abbr) {
  if (abbr.length > 2) {
    return abbr.toLowerCase();
  }

  const states = {
    AL: 'alabama',
    AK: 'alaska',
    AZ: 'arizona',
    AR: 'arkansas',
    CA: 'california',
    CO: 'colorado',
    CT: 'connecticut',
    DE: 'delaware',
    FL: 'florida',
    GA: 'georgia',
    HI: 'hawaii',
    ID: 'idaho',
    IL: 'illinois',
    IN: 'indiana',
    IA: 'iowa',
    KS: 'kansas',
    KY: 'kentucky',
    LA: 'louisiana',
    ME: 'maine',
    MD: 'maryland',
    MA: 'massachusetts',
    MI: 'michigan',
    MN: 'minnesota',
    MS: 'mississippi',
    MO: 'missouri',
    MT: 'montana',
    NE: 'nebraska',
    NV: 'nevada',
    NH: 'new hampshire',
    NJ: 'new jersey',
    NM: 'new mexico',
    NY: 'new york',
    NC: 'north carolina',
    ND: 'north dakota',
    OH: 'ohio',
    OK: 'oklahoma',
    OR: 'oregon',
    PA: 'pennsylvania',
    RI: 'rhode island',
    SC: 'south carolina',
    SD: 'south dakota',
    TN: 'tennessee',
    TX: 'texas',
    UT: 'utah',
    VT: 'vermont',
    VA: 'virginia',
    WA: 'washington',
    WV: 'west virginia',
    WI: 'wisconsin',
    WY: 'wyoming',
  };

  return states[abbr.toUpperCase()];
};

module.exports = {
  toMeters,
  stateToFull,
};
