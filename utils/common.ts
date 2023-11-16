
export function mergeObjectsByKey(array1: any, array2: any, key:any) {
    // Create a map of the first array by the key
    var map:any = {};
    array1.forEach(function (obj: any) {
      map[obj[key]] = obj;
    });
    // Loop through the second array and merge the objects by the key
    array2.forEach(function (obj: any) {
      var match = map[obj[key]];
      if (match) {
        Object.assign(match, obj);
      }
    });
    // Return the values of the map as an array
    return Object.values(map);
}