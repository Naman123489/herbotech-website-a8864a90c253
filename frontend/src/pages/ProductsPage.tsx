import { useState } from "react";
import { Page, Card, Grid, Toolbar, Field, Select, EmptyState } from "../components/ui";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import EnquiryForm from "../components/EnquiryForm";
import { products, productForms } from "../data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState("All");
  const [detail, setDetail] = useState<(typeof products)[number] | null>(null);
  const [enquiry, setEnquiry] = useState<(typeof products)[number] | null>(null);

  const filtered = products.filter((product) => {
    const haystack = `${product.name} ${product.botanical} ${product.description} ${product.applications}`.toLowerCase();
    if (search.trim() && !haystack.includes(search.trim().toLowerCase())) return false;
    if (category !== "All" && product.category !== category) return false;
    if (form !== "All" && !product.forms.includes(form)) return false;
    return true;
  });

  return (
    <Page
      title="Products"
      subtitle="A B2B botanical catalogue with search, category filters and direct product enquiry. The range is indicative until availability is confirmed."
      actions={<a className="btn btn-primary" href="#/quote">Request a Quote</a>}
    >
      <Toolbar>
        <Field label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by herb, botanical name or application" />
        <Select
          label="Category"
          options={[
            ["All", "All categories"],
            ["Core botanical range", "Core botanical range"],
            ["Cosmetic herb powders (future)", "Cosmetic herb powders (future)"],
            ["Herbal tea ingredients (future)", "Herbal tea ingredients (future)"],
          ]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Select
          label="Product form"
          options={[["All", "All forms"], ...productForms.map((item) => [item, item] as [string, string])]}
          value={form}
          onChange={(e) => setForm(e.target.value)}
        />
      </Toolbar>

      {filtered.length === 0 ? (
        <EmptyState title="No products match these filters" action={<button type="button" className="btn btn-secondary" onClick={() => { setSearch(""); setCategory("All"); setForm("All"); }}>Clear filters</button>}>
          Adjust the search or filters to view the indicative catalogue range.
        </EmptyState>
      ) : (
        <Grid min={260}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onView={setDetail} onEnquire={setEnquiry} />
          ))}
        </Grid>
      )}

      <Card title="Product detail">
        <p className="muted">Select a product card to view botanical name, available forms, applications and an enquiry option.</p>
      </Card>

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
