const DynamicSort = (property, reverse = false) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result = reverse
      ? a[property] > b[property]
        ? -1
        : a[property] < b[property]
        ? 1
        : 0
      : a[property] < b[property]
      ? -1
      : a[property] > b[property]
      ? 1
      : 0;
    return result * sortOrder;
  };
};
export { DynamicSort };
