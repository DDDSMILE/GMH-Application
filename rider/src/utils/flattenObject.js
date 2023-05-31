const FlattenObject = (obj) => {
  let result = [];

  function flatten(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        flatten(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          if (typeof item === "object") {
            flatten(item);
          } else {
            result.push(item);
          }
        });
      } else {
        result.push(obj[key]);
      }
    }
  }

  flatten(obj);
  return result;
};

export default FlattenObject;
