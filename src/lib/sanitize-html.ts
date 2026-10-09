const BLOCKED_TAGS = /<\s*\/?\s*(script|iframe|object|embed|form|link|meta)\b[^>]*>/gi;

export function sanitizeArticleHtml(html: string) {
  return html
    .replace(BLOCKED_TAGS, "")
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "")
    .replace(/javascript:/gi, "");
}
