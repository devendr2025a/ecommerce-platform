const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
  "http://localhost:5001";

/**
 * Ensures any image path (relative or absolute) properly resolves to the backend server.
 * E.g., "/images/blinkit/hero.png" -> "http://localhost:5001/images/blinkit/hero.png"
 */
export function getBackendImageUrl(url, fallback = "") {
  if (!url || typeof url !== "string") return fallback;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${BACKEND_URL}${cleanPath}`;
}

export default getBackendImageUrl;
