// Set when this app is mounted under a sub-path (e.g. remax.co.id/maxloan).
// basePath only auto-prefixes next/link and next/router; raw src/href/fetch
// strings must add it themselves.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
