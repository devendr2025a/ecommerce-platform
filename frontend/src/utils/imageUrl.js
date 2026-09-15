const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
  "http://localhost:5001";

// Cache buster version to force browsers to load latest HD images immediately
const ASSET_CACHE_VERSION = "20260915_hd_v3";

/**
 * Ensures any image path (relative or absolute) properly resolves to the backend server or local assets.
 * Adds cache busting so updated HD assets are loaded immediately without browser cache holding stale images.
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
  const sep = cleanPath.includes("?") ? "&" : "?";

  // If it's an uploaded file from backend, route to backend server
  if (cleanPath.startsWith("/uploads/")) {
    return `${BACKEND_URL}${cleanPath}${sep}v=${ASSET_CACHE_VERSION}`;
  }

  // For public static assets (/images/...), route via backend or frontend with cache-busting
  return `${BACKEND_URL}${cleanPath}${sep}v=${ASSET_CACHE_VERSION}`;
}

export default getBackendImageUrl;

