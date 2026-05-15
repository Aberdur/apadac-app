const getPublicSiteHref = () =>
  process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim() ||
  "/";

export function BackToSiteLink() {
  return (
    <div className="apadac-admin-site-link">
      <a className="apadac-admin-site-link__anchor" href={getPublicSiteHref()}>
        Ver web
      </a>
    </div>
  );
}
