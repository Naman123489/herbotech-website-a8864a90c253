import { Page, Card } from "../components/ui";

export default function NotFoundPage() {
  return (
    <Page title="Page not found" subtitle="The requested page could not be found.">
      <Card title="Continue browsing">
        <p className="muted">Use the navigation menu or return to the home page.</p>
        <a className="btn btn-primary" href="#/">Return home</a>
      </Card>
    </Page>
  );
}
