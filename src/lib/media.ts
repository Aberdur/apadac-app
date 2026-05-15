type MediaLike = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

const normalizeMediaUrl = (value: unknown): string | null => {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const url = value.trim();

  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.pathname.startsWith("/api/media/file/")) {
      return `${parsed.pathname}${parsed.search}`;
    }

    return url;
  } catch {
    return url;
  }
};

export const getMedia = (value: unknown): MediaLike | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  return {
    alt: typeof candidate.alt === "string" ? candidate.alt : null,
    height: typeof candidate.height === "number" ? candidate.height : null,
    url: normalizeMediaUrl(candidate.url),
    width: typeof candidate.width === "number" ? candidate.width : null,
  };
};
