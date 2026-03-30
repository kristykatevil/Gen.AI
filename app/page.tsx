import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <div>
            <div className="eyebrow">Replit-ready starter</div>
            <h1>Build your own Tripo-like 3D generator.</h1>
            <p>
              This starter gives you the full product skeleton: text-to-3D, image-to-3D,
              async job tracking, project pages, a preview panel, and STL export placeholders.
            </p>
            <div className="cta-row">
              <Link className="button button-primary" href="/app/create">Open Create Studio</Link>
              <Link className="button button-secondary" href="/app">View Dashboard</Link>
            </div>
          </div>
          <div className="card">
            <div className="badge">What is included</div>
            <div className="list" style={{ marginTop: 16 }}>
              <div>• text prompt flow</div>
              <div>• image upload flow</div>
              <div>• mock async generation engine</div>
              <div>• local project storage</div>
              <div>• result page with preview panel</div>
              <div>• placeholder STL export</div>
              <div>• provider abstraction for real APIs later</div>
            </div>
          </div>
        </section>
        <section className="grid grid-3" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Launch fast</h3>
            <p>Prototype the complete product loop first, then swap the mock provider for a real 3D engine.</p>
          </div>
          <div className="card">
            <h3>Built for maker workflows</h3>
            <p>The starter is shaped around printable outputs, previews, and export-first project pages.</p>
          </div>
          <div className="card">
            <h3>Portable architecture</h3>
            <p>Provider logic is isolated so you are not locked into one generation vendor.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
