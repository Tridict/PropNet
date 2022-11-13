export function stringifyQs (params) {
  const res = [];
  for (const [key, value] of Object.entries(params)) {
    res.push(`${key}=${value}`);
  }
  return res.join('&');
}