import { Page, Card, Grid } from "../components/ui";

export default function AboutPage() {
  return (
    <Page title="About Us" subtitle="A planned herbal raw-material processing and quality-testing enterprise focused on disciplined B2B supply.">
      <Card title="Company introduction">
        <p className="muted">
          HERBOTECH HERBAL PVT. LTD. is being developed as a dedicated herbal raw-material processing and quality-testing enterprise. The business is intended to connect India's botanical resources with modern manufacturing requirements through disciplined processing and quality-oriented practices.
        </p>
      </Card>
      <Grid min={260}>
        <Card title="Vision">
          <p className="muted">To become a trusted supplier of quality-focused herbal ingredients through scientific processing, responsible sourcing and consistent documentation.</p>
        </Card>
        <Card title="Mission">
          <p className="muted">To connect India's botanical resources with modern manufacturing requirements through disciplined processing and quality-oriented practices.</p>
        </Card>
      </Grid>
      <Card title="Business philosophy">
        <p className="muted">
          The company focuses on botanical identity, controlled processing, batch-level traceability and documentation. It is positioned as a professional B2B botanical ingredients and processing business rather than an ordinary herbal medicine retailer.
        </p>
      </Card>
      <Card title="Scientific approach">
        <p className="muted">
          Quality checks are intended to include botanical identity verification, moisture analysis, foreign matter examination, ash values, extractive values and TLC profiling. External laboratory arrangements may support heavy metals, microbial load, aflatoxins and pesticide residue testing.
        </p>
      </Card>
      <Card title="Regional botanical resources">
        <p className="muted">
          Shivpuri, Madhya Pradesh, is the proposed operating location. The company intends to work with regional botanical resources while maintaining quality-focused procurement and processing practices.
        </p>
      </Card>
      <Card title="Commitment to quality">
        <p className="muted">
          Quality is treated as a process. No accreditation, certification, registration number or operational claim is made until it is verified by the company.
        </p>
      </Card>
    </Page>
  );
}
