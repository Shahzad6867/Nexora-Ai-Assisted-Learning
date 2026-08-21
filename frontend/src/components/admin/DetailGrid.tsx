export interface DetailItem {
  label: string;
  value: string;
  full ?: boolean
}

export default function DetailGrid({ items }: { items: DetailItem[] }) {
  return (
    <div className="detail-grid">
      {items.map((item) => (
        <div className="detail-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
