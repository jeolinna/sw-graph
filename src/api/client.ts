const API_BASE_URL = "https://sw-api.starnavi.io";

// Universal function for executing HTTP requests
// Handles both full URLs and paths relative to the base URL
// Uses TypeScript generics for type safety

export async function fetchData<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // Allows the use of both absolute URLs and relative paths
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP Error: ${response.status}. Details: ${errorText}`);
  }

  const data = await response.json();
  return data as T;
}
