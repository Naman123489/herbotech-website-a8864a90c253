export default function Footer() {
  const year = new Date().getFullYear();
  const linkStyle = { minHeight: 40, display: "inline-flex" as const, alignItems: "center" as const };
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)", marginTop: "var(--space-8)" }}>
      <div className="container" style={{ padding: "var(--space-8) var(--space-4)" }}>
        <div className="grid" style={{ "--min": "220px" } as React.CSSProperties}>
          <div className="stack">
            <h2>Herbotech Herbal Pvt. Ltd.</h2>
            <p className="muted">Herbal raw material processing and quality testing for manufacturers.</p>
            <p className="muted">Pohri Road, Shivpuri, Madhya Pradesh, India.</p>
          </div>
          <nav className="stack" aria-label="Footer quick links">
            <h3>Quick links</h3>
            <a href="#/" style={linkStyle}>Home</a>
            <a href="#/about" style={linkStyle}>About</a>
            <a href="#/products" style={linkStyle}>Products</a>
            <a href="#/processing" style={linkStyle}>Processing</a>
            <a href="#/quality" style={linkStyle}>Quality</a>
            <a href="#/infrastructure" style={linkStyle}>Infrastructure</a>
            <a href="#/sustainability" style={linkStyle}>Sustainability</a>
            <a href="#/contact" style={linkStyle}>Contact</a>
          </nav>
          <div className="stack">
            <h3>Services</h3>
            <ul className="list">
              <li>Herbal cleaning and grading</li>
              <li>Controlled drying</li>
              <li>Cutting and size reduction</li>
              <li>Pulverising and powder processing</li>
              <li>Quality testing support</li>
            </ul>
          </div>
          <div className="stack">
            <h3>Business enquiries</h3>
            <p className="muted">Use the Request a Quote form for ingredient requirements, processing specifications and quality expectations.</p>
            <p className="muted">Official social channels will be listed once they are confirmed.</p>
          </div>
        </div>
        <p className="muted" style={{ marginTop: "var(--space-6)" }}>© {year} Herbotech Herbal Pvt. Ltd. Content describes planned capabilities and is updated as operations are confirmed.</p>
      </div>
    </footer>
  );
}
