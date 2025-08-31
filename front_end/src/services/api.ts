const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
