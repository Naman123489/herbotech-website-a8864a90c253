import { Page, Card, Grid } from "../components/ui";
import { useAsync } from "../lib/useAction";
import { api } from "../api/generated";
import EnquiryForm from "../components/EnquiryForm";

export default function ContactPage() {
  const health = useAsync(() => api.getHealth(), "health");

  return (
    <Page title="Contact Us" subtitle="Company details, location and business enquiry form." actions={<a className="btn btn-primary" href="#/quote">Request a Quote</a>}>
      <Grid min={300}>
        <Card title="Company">
          <div className="stack">
            <p><strong>HERBOTECH HERBAL PVT. LTD.</strong></p>
            <p className="muted">Herbal raw material processing and quality testing.</p>
            <p className="muted">Pohri Road, Shivpuri, Madhya Pradesh, India.</p>
            <p className="muted">Service status: {health.loading ? "Checking..." : health.error ? "Unavailable" : health.data?.status ?? "Available"}</p>
          </div>
        </Card>
        <Card title="Location">
          <iframe
            title="Shivpuri, Madhya Pradesh location map"
            src="https://www.google.com/maps?q=Shivpuri,Madhya+Pradesh,India&output=embed"
            style={{ width: "100%", minHeight: "260px", border: 0, borderRadius: "var(--radius-sm)" }}
            loading="lazy"
          />
        </Card>
      </Grid>
      <Card title="Request a Quote">
        <EnquiryForm />
      </Card>
    </Page>
  );
}
