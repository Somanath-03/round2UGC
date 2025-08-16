export function normalizeStorageUrl(url: string): string {
  try {
    if (!url) return url;
    const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!envUrl) return url;
    const src = new URL(url);
    const targetBase = new URL(envUrl);
    // Only rewrite supabase storage URLs
    if (!src.hostname.endsWith('.supabase.co')) return url;
    src.protocol = targetBase.protocol;
    src.hostname = targetBase.hostname;
    return src.toString();
  } catch {
    return url;
  }
}
