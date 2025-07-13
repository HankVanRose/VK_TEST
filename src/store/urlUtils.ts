export const searchParamsToObject = (params: URLSearchParams) => {
  const result: Record<string, any> = {};
  
  params.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
  
  return result;
};