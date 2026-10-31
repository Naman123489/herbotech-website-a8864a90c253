import { Page, Card, Grid, Stat } from "../components/ui";

const areas = [
  "Raw Material Storage",
  "Processing Hall",
  "Finished Goods Storage",
  "Quality Control Laboratory",
  "Office",
  "Covered Drying Yard",
];

const equipment = [
  "Tray dryers",
  "Solar dryer",
  "Air-screen cleaner",
  "Destoner",
  "Herb cutter",
  "Pulverisers",
  "Sifter",
  "Ribbon blender",
  "Magnetic separator",
  "Packing machines",
  "Laboratory instruments",
];

export default function InfrastructurePage() {
  return (
    <Page title="Infrastructure" subtitle="Proposed facility layout, storage, processing and laboratory areas.">
      <Card title="Conceptual facility layout">
        <p className="muted">This layout is conceptual and planned. It is not an approved architectural drawing.</p>
        <div className="grid" style={{ "--min": "150px", marginTop: "var(--space-4)" } as React.CSSProperties}>
          {areas.map((area) => (
            <div key={area} className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
              <strong>{area}</strong>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Planned areas">
        <Grid min={200}>
          {areas.map((area) => (
            <Stat key={area} label="Planned area" value={area} hint="Proposed facility space" />
          ))}
        </Grid>
      </Card>
      <Card title="Planned equipment">
        <Grid min={200}>
          {equipment.map((item) => (
            <Card key={item} title={item}>
              <p className="muted">Planned equipment for processing, quality control or packaging.</p>
            </Card>
          ))}
        </Grid>
      </Card>
      <Card title="Storage and dispatch">
        <p className="muted">Raw material storage, finished goods storage and dispatch areas are intended to support batch traceability and orderly material flow.</p>
      </Card>
    </Page>
  );
}
