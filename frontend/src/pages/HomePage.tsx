import { useState } from "react";
import { Page, Card, Grid, Stat, Badge, EmptyState } from "../components/ui";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import EnquiryForm from "../components/EnquiryForm";
import { products } from "../data/products";

const capabilities = [
  { title: "Herbal Cleaning & Grading", text: "Sorting, destoning and grading to reduce foreign matter and improve batch consistency." },
  { title: "Controlled Drying", text: "Moisture management using planned tray drying and covered drying infrastructure." },
  { title: "Cutting & Sifting", text: "Size reduction and sieving to support uniform particle distribution." },
  { title: "Pulverising & Powder Processing", text: "Powder preparation with planned blending and magnetic separation steps." },
  { title: "Quality Testing & Documentation", text: "Batch-level checks and records intended to support traceable supply." },
];

const processSteps = [
  "Raw Material Sourcing",
  "Incoming Material Inspection",
  "Cleaning and Sorting",
  "Drying and Moisture Control",
  "Cutting or Pulverising",
  "Quality Testing",
  "Batch Documentation",
  "Packaging and Dispatch",
];

const reasons = [
  "Quality-focused Processing",
  "Batch-Level Traceability",
  "Scientific Quality Control",
  "Multiple Processing Formats",
  "Reliable B2B Partnership",
  "Focused Botanical Expertise",
];

const industries = [
  "Ayurveda",
  "Nutraceuticals",
  "Cosmetics",
  "Herbal Teas",
  "Botanical Extracts",
  "Herbal Wellness Brands",
];

export default function HomePage() {
  const [detail, setDetail] = useState<(typeof products)[number] | null>(null);
  const [enquiry, setEnquiry] = useState<(typeof products)[number] | null>(null);

  return (
    <Page
      title="Home"
      subtitle="Herbotech Herbal Pvt. Ltd. delivers quality-focused herbal raw materials through precision processing, scientific testing and reliable B2B supply."
      actions={<a className="btn btn-primary" href="#/quote">Request a Quote</a>}
    >
      <section
        className="card"
        style={{
          background: "linear-gradient(135deg, #102C25, #173F32)",
          color: "#FCFBF7",
          padding: "var(--space-10)",
        }}
      >
        <div className="stack">
          <p className="muted" style={{ color: "#DDE6D8" }}>Pohri Road, Shivpuri | Madhya Pradesh, India</p>
          <h1 style={{ color: "#FCFBF7", fontSize: "clamp(2rem, 1.4rem + 2vw, 3.4rem)" }}>Nature's Ingredients. Science's Assurance.</h1>
          <p style={{ maxWidth: "62ch", color: "#DDE6D8" }}>
            Delivering quality-focused herbal raw materials through precision processing, scientific testing and reliable B2B supply.
          </p>
          <div className="row">
            <a className="btn btn-primary" href="#/products" style={{ background: "#DDE6D8", color: "#102C25" }}>Explore Our Products</a>
            <a className="btn btn-secondary" href="#/quote" style={{ background: "transparent", color: "#FCFBF7", borderColor: "#82977C" }}>Partner With Us</a>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="grid" style={{ "--min": "320px" } as React.CSSProperties}>
          <div style={{ background: "linear-gradient(135deg, var(--primary-soft), var(--surface-2))", minHeight: "240px", borderRadius: "var(--radius-sm)", display: "grid", placeItems: "center", color: "var(--primary)", fontWeight: 700 }}>
            Botanical processing and quality laboratory
          </div>
          <div className="stack">
            <h2>Bridging Nature and Scientific Quality.</h2>
            <p className="muted">
              HERBOTECH HERBAL PVT. LTD. is being developed as a dedicated herbal raw-material processing and quality-testing enterprise. Our vision is to deliver carefully processed botanical ingredients to manufacturers through disciplined processing, batch-level quality checks and reliable documentation.
            </p>
            <a className="btn btn-secondary" href="#/about">Discover Our Approach</a>
          </div>
        </div>
      </section>

      <section className="stack">
        <h2>Core capabilities</h2>
        <Grid min={220}>
          {capabilities.map((item) => (
            <Card key={item.title} title={item.title}>
              <p className="muted">{item.text}</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2>Product portfolio</h2>
          <a className="btn btn-ghost" href="#/products">View full catalogue</a>
        </div>
        <p className="muted">The catalogue range is indicative until availability and batch documentation are confirmed.</p>
        <Grid min={260}>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onView={setDetail} onEnquire={setEnquiry} />
          ))}
        </Grid>
      </section>

      <section className="card">
        <div className="stack">
          <h2>Quality Is Not a Claim. It Is a Process.</h2>
          <p className="muted">Quality-focused checks are intended to include botanical identity, foreign matter, moisture content, total ash, acid-insoluble ash, extractive values and TLC profiling. Relevant procedures are intended to follow applicable Ayurvedic Pharmacopoeia of India monographs where suitable.</p>
          <div className="grid" style={{ "--min": "180px" } as React.CSSProperties}>
            {["Botanical identity", "Foreign matter", "Moisture content", "Total ash", "Acid-insoluble ash", "Extractive values", "TLC profiling"].map((item) => (
              <div key={item} className="card" style={{ padding: "var(--space-3)" }}>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <p className="muted">External laboratory arrangements may be used for heavy metals, microbial load, aflatoxins and pesticide residues. No accreditation or certification is claimed until it is obtained.</p>
        </div>
      </section>

      <section className="stack">
        <h2>How we work</h2>
        <Grid min={180}>
          {processSteps.map((step, index) => (
            <Card key={step} title={`${String(index + 1).padStart(2, "0")} — ${step}`}>
              <p className="muted">A planned stage in the movement from sourcing through documentation and dispatch.</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="card">
        <div className="stack">
          <h2>Proposed infrastructure</h2>
          <p className="muted">The project report proposes approximately 4,000 sq. ft. of building space, including raw material storage, a processing hall, finished goods storage, a quality control laboratory, office space and a covered drying yard. Equipment lists describe planned infrastructure unless installation is confirmed.</p>
          <Grid min={200}>
            {["Raw Material Storage", "Processing Hall", "Finished Goods Storage", "Quality Control Laboratory", "Office", "Covered Drying Yard"].map((item) => (
              <Stat key={item} label="Planned area" value={item} />
            ))}
          </Grid>
        </div>
      </section>

      <section className="stack">
        <h2>Why choose Herbotech?</h2>
        <Grid min={220}>
          {reasons.map((item) => (
            <Card key={item} title={item}>
              <p className="muted">A focused approach to botanical raw materials, processing discipline and documentation.</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="stack">
        <h2>Industries we serve</h2>
        <Grid min={200}>
          {industries.map((item) => (
            <Card key={item} title={item}>
              <p className="muted">B2B ingredient and processing support for manufacturing customers.</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="card" style={{ background: "var(--primary)", color: "var(--primary-ink)" }}>
        <div className="stack">
          <h2 style={{ color: "var(--primary-ink)" }}>Looking for a Reliable Herbal Raw Material Partner?</h2>
          <p style={{ color: "var(--primary-soft)" }}>Let's discuss your ingredient requirements, processing specifications and quality expectations.</p>
          <div className="row">
            <a className="btn" href="#/quote" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>Request a Quote</a>
            <a className="btn" href="#/contact" style={{ background: "transparent", color: "var(--primary-ink)", border: "1px solid var(--primary-soft)" }}>Contact Our Team</a>
          </div>
        </div>
      </section>

      <Modal open={Boolean(detail)} title={detail?.name ?? "Product details"} onClose={() => setDetail(null)}>
        {detail && (
          <div className="stack">
            <p><strong>Botanical name:</strong> {detail.botanical}</p>
            <p><strong>Category:</strong> {detail.category}</p>
            <p><strong>Available forms:</strong> {detail.forms.join(", ")}.</p>
            <p><strong>Applications:</strong> {detail.applications}</p>
            <p className="muted">{detail.note}</p>
            <button type="button" className="btn btn-primary" onClick={() => { setDetail(null); setEnquiry(detail); }}>Enquire About This Herb</button>
          </div>
        )}
      </Modal>

      <Modal open={Boolean(enquiry)} title={`Enquire about ${enquiry?.name ?? "herb"}`} onClose={() => setEnquiry(null)}>
        {enquiry && <EnquiryForm defaultHerb={enquiry.name} defaultForm={enquiry.forms[0] as (typeof enquiry.forms)[number] & "Cleaned and Graded Whole Herbs"} onSuccess={() => setEnquiry(null)} />}
      </Modal>
    </Page>
  );
}
