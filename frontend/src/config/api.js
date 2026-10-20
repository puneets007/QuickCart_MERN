const apiBaseUrl = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};