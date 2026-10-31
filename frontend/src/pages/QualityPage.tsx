import { useState } from "react";
import { Page, Card, Grid, DataTable } from "../components/ui";
import Modal from "../components/Modal";

const tests = [
  { parameter: "Botanical identity", purpose: "Confirm the correct plant species and plant part." },
  { parameter: "Foreign matter", purpose: "Detect stones, dust and other impurities." },
  { parameter: "Moisture content", purpose: "Support storage stability and processing consistency." },
  { parameter: "Total ash", purpose: "Indicate inorganic content." },
  { parameter: "Acid-insoluble ash", purpose: "Indicate siliceous contamination." },
  { parameter: "Extractive values", purpose: "Indicate soluble constituents." },
  { parameter: "TLC profiling", purpose: "Support identity and quality comparison." },
];

const coaRows = [
  { parameter: "Botanical identity", method: "Macroscopic/microscopic examination", result: "Conforms", specification: "Conforms" },
  { parameter: "Foreign matter", method: "Visual inspection", result: "Within limit", specification: "Within limit" },
  { parameter: "Moisture content", method: "Loss on drying", result: "Sample value", specification: "As per monograph" },
  { parameter: "Total ash", method: "Gravimetric", result: "Sample value", specification: "As per monograph" },
  { parameter: "Acid-insoluble ash", method: "Gravimetric", result: "Sample value", specification: "As per monograph" },
];

const traceability = [
  "Procurement",
  "Incoming inspection",
  "Cleaning",
  "Drying",
  "Processing",
  "Quality testing",
  "Batch documentation",
  "Dispatch",
];

export default function QualityPage() {
  const [showCoa, setShowCoa] = useState(false);

  return (
    <Page title="Quality Assurance" subtitle="Scientific quality checks, batch traceability and documented confidence." actions={<button type="button" className="btn btn-primary" onClick={() => setShowCoa(true)}>View sample COA</button>}>
      <Card title="Scientific Quality. Documented Confidence.">
        <p className="muted">Quality procedures are intended to follow applicable Ayurvedic Pharmacopoeia of India monographs where suitable. External laboratory arrangements may be used for heavy metals, microbial load, aflatoxins and pesticide residues.</p>
      </Card>
      <Grid min={260}>
        {tests.map((test) => (
          <Card key={test.parameter} title={test.parameter}>
            <p className="muted">{test.purpose}</p>
          </Card>
        ))}
      </Grid>
      <Card title="External laboratory arrangements">
        <p className="muted">Heavy metals, microbial load, aflatoxins and pesticide residues may be arranged through external laboratories. No accreditation or certification is claimed.</p>
      </Card>
      <Card title="Batch traceability">
        <p className="muted">Every material lot should be identifiable from procurement through processing, testing and dispatch.</p>
        <div className="row" style={{ flexWrap: "wrap" }}>
          {traceability.map((step, index) => (
            <span key={step} className="badge badge-primary">{index + 1}. {step}</span>
          ))}
        </div>
      </Card>

      <Modal open={showCoa} title="Sample certificate of analysis" onClose={() => setShowCoa(false)}>
        <p className="muted" style={{ marginBottom: "var(--space-3)" }}>SAMPLE / ILLUSTRATIVE. This demonstration uses fictional data and is not a laboratory report.</p>
        <DataTable
          columns={[
            { header: "Test parameter", cell: (row) => row.parameter },
            { header: "Test method", cell: (row) => row.method },
            { header: "Observed result", cell: (row) => row.result },
            { header: "Specification", cell: (row) => row.specification },
          ]}
          rows={coaRows}
          rowKey={(row) => row.parameter}
        />
        <div className="stack" style={{ marginTop: "var(--space-4)" }}>
          <p><strong>Product name:</strong> Sample botanical material</p>
          <p><strong>Batch number:</strong> SAMPLE-001</p>
          <p><strong>Supplier reference:</strong> SAMPLE-SUPPLIER</p>
          <p><strong>Date of receipt:</strong> Sample date</p>
          <p><strong>Quality status:</strong> For demonstration only</p>
        </div>
      </Modal>
    </Page>
  );
}
