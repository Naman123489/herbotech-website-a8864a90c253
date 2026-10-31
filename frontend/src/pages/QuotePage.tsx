import { Page, Card } from "../components/ui";
import { useAsync } from "../lib/useAction";
import { api } from "../api/generated";
import EnquiryForm from "../components/EnquiryForm";

export default function QuotePage() {
  const health = useAsync(() => api.getHealth(), "quote-health");

  return (
    <Page title="Request a Quote" subtitle="Submit ingredient requirements, processing specifications and quality expectations.">
      <Card title="Service status">
        <p className="muted">{health.loading ? "Checking service..." : health.error ? "Service unavailable" : health.data?.status ?? "Service available"}</p>
      </Card>
      <Card title="Business enquiry">
        <EnquiryForm />
      </Card>
    </Page>
  );
}
