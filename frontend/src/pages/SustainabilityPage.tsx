import { Page, Card, Grid } from "../components/ui";

const practices = [
  "Responsible sourcing of botanical raw materials.",
  "Reduced material wastage through sorting and grading.",
  "Efficient drying methods for moisture control.",
  "Proper storage to protect material quality.",
  "Responsible procurement practices.",
  "Potential farmer partnerships.",
  "Future contract cultivation opportunities.",
];

export default function SustainabilityPage() {
  return (
    <Page title="Sustainability" subtitle="Intended responsible sourcing, storage and processing practices.">
      <Card title="Sustainability approach">
        <p className="muted">This page describes intended practices. No environmental certification or sustainability metric is claimed.</p>
      </Card>
      <Grid min={260}>
        {practices.map((practice) => (
          <Card key={practice} title="Intended practice">
            <p className="muted">{practice}</p>
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
