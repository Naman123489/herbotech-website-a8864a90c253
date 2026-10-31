import { useHashRoute } from "./lib/useHashRoute";
import { AppShell } from "./components/ui";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProcessingPage from "./pages/ProcessingPage";
import QualityPage from "./pages/QualityPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ContactPage from "./pages/ContactPage";
import QuotePage from "./pages/QuotePage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

const nav = [
  { href: "#/", label: "Home" },
  { href: "#/about", label: "About" },
  { href: "#/products", label: "Products" },
  { href: "#/processing", label: "Processing" },
  { href: "#/quality", label: "Quality" },
  { href: "#/infrastructure", label: "Infrastructure" },
  { href: "#/sustainability", label: "Sustainability" },
  { href: "#/contact", label: "Contact" },
];

export default function App() {
  const [route, navigate] = useHashRoute("home");
  const section = route.split("/")[0] || "home";
  const current = section === "home" ? "" : section;

  function renderRoute() {
    switch (section) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "products":
        return <ProductsPage />;
      case "processing":
        return <ProcessingPage />;
      case "quality":
        return <QualityPage />;
      case "infrastructure":
        return <InfrastructurePage />;
      case "sustainability":
        return <SustainabilityPage />;
      case "contact":
        return <ContactPage />;
      case "quote":
        return <QuotePage />;
      default:
        return <NotFoundPage />;
    }
  }

  return (
    <>
      <AppShell
        brand="Herbotech Enquiry"
        nav={nav}
        current={current}
        right={<a className="btn btn-primary" href="#/quote">Request a Quote</a>}
      >
        {renderRoute()}
      </AppShell>
      <Footer />
    </>
  );
}
