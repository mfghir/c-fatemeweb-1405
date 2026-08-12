/** True if the URL points at a Google Drive file (drive.google.com/file/d/...). */
export function isDriveLink(url: string | null | undefined): url is string {
  if (!url) return false;
  return /drive\.google\.com\/file\/d\//.test(url);
}

/** Converts a Drive "view" link into the iframe-embeddable "preview" link. */
export function toDrivePreview(url: string): string {
  return url.replace(/\/view(\?.*)?$/, "/preview");
}
