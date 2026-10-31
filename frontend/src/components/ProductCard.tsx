import type { Product } from "../data/products";

export default function ProductCard({ product, onView, onEnquire }: {
  product: Product;
  onView: (product: Product) => void;
  onEnquire: (product: Product) => void;
}) {
  return (
    <article className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div
        aria-hidden="true"
        style={{
          height: "150px",
          background: "linear-gradient(135deg, var(--primary-soft), var(--surface-2))",
          display: "grid",
          placeItems: "center",
          color: "var(--primary)",
          fontSize: "2.4rem",
          fontWeight: 700,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {product.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", flex: 1 }}>
        <div>
          <h3>{product.name}</h3>
          <p className="muted">{product.botanical}</p>
        </div>
        <p>{product.description}</p>
        <div className="row">
          <span className="badge badge-primary">{product.category}</span>
        </div>
        <p className="muted" style={{ fontSize: ".9rem" }}>Available forms: {product.forms.join(", ")}.</p>
        <div className="row" style={{ marginTop: "auto" }}>
          <button type="button" className="btn btn-secondary" onClick={() => onView(product)}>View details</button>
          <button type="button" className="btn btn-primary" onClick={() => onEnquire(product)}>Enquire</button>
        </div>
      </div>
    </article>
  );
}
