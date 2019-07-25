function flattenGeoLocations({ geoLocations, sortObject, filter = null }) {
  if (!geoLocations) {
    return {};
  }
  const tempObj = { ...sortObject };
  const filterOut = Array.isArray(filter)
    ? new RegExp(filter.join('|'))
    : new RegExp(filter);

  Object.keys(geoLocations).forEach((type) => {
    // if no filter is passed or
    if (!filter || !type.match(filterOut)) {
      geoLocations[type].forEach((location) => {
        if (tempObj[location.name]) {
          tempObj[location.name].count += 1;
        } else {
          const data = typeof location === 'object'
            ? { ...location, type } : { name: location, type };
          tempObj[location.name] = {
            count: 1,
            data,
          };
        }
      });
    }
  });
  return tempObj;
}


export default ({ data, limit, filter }) => {
  console.time('Start');
  if (!data || !Array.isArray(data)) {
    throw new Error('Error data no found in function.');
  }
  let sortObject = {};
  // flatten and count all
  data.forEach((set) => {
    if (!set || !set.targeting || !set.targeting.geo_locations) {
      return sortObject;
    }
    const { geo_locations: geoLocations } = set.targeting;
    sortObject = flattenGeoLocations({ geoLocations, sortObject, filter });
  });

  // sort by count
  const sortArray = Object.values(sortObject)
    .sort((a, b) => b.count - a.count) // sort highest to lowest
    .map(location => ({ ...location.data, count: location.count }))
    .slice(0, Number(limit));

  console.timeEnd('Start');
  return sortArray;
};
