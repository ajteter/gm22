export default function SkeletonCard() {
  return (
    <li className="card">
      <div className="media">
        <div className="thumb skeleton" />
      </div>
      <div className="content">
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text-sm" />
      </div>
    </li>
  );
}
