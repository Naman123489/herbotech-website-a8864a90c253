import type { ReactNode } from "react";

export default function Modal({ open, title, children, onClose }: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgb(16 44 37 / .45)",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-4)",
        zIndex: 50,
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: "640px", maxHeight: "90vh", overflow: "auto" }}
      >
        <header className="card-header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
        </header>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
