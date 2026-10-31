import { Page, Card, Grid } from "../components/ui";

const steps = [
  { title: "Raw material receiving", equipment: "Receiving and inspection area", purpose: "Accept incoming material with identity and condition checks.", importance: "Prevents unsuitable material from entering processing." },
  { title: "Inspection and sorting", equipment: "Sorting tables and air-screen cleaner", purpose: "Remove visible foreign matter and segregate material.", importance: "Improves cleanliness and batch uniformity." },
  { title: "Cleaning and destoning", equipment: "Destoner and cleaner", purpose: "Remove stones, dust and heavier impurities.", importance: "Protects downstream equipment and product consistency." },
  { title: "Controlled drying", equipment: "Tray dryers and solar dryer", purpose: "Reduce moisture to planned levels.", importance: "Supports storage stability and quality parameters." },
  { title: "Cutting and size reduction", equipment: "Herb cutter", purpose: "Produce cut and sifted material.", importance: "Creates uniform particle size for manufacturing use." },
  { title: "Grinding and pulverising", equipment: "Pulverisers", purpose: "Prepare herbal powders.", importance: "Supports consistent powder processing." },
  { title: "Sieving and grading", equipment: "Sifter and grader", purpose: "Separate material by particle size.", importance: "Improves specification control." },
  { title: "Quality testing", equipment: "Quality control laboratory instruments", purpose: "Check identity, moisture, ash values and other parameters.", importance: "Provides documented quality information." },
  { title: "Packaging", equipment: "Packing machines", purpose: "Pack material in suitable containers.", importance: "Protects material during storage and dispatch." },
  { title: "Storage and dispatch", equipment: "Finished goods storage", purpose: "Store and release documented batches.", importance: "Maintains traceability to dispatch." },
];

export default function ProcessingPage() {
  return (
    <Page title="Processing Capabilities" subtitle="Planned unit operations from raw material receiving through dispatch.">
      <p className="muted">Equipment and infrastructure are described as planned capabilities unless installation is confirmed by the company.</p>
      <Grid min={260}>
        {steps.map((step, index) => (
          <Card key={step.title} title={`${String(index + 1).padStart(2, "0")} — ${step.title}`}>
            <div className="stack">
              <p><strong>Purpose:</strong> {step.purpose}</p>
              <p><strong>Equipment:</strong> {step.equipment}</p>
              <p className="muted"><strong>Importance:</strong> {step.importance}</p>
            </div>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
