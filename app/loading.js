import SkeletonCard from './components/SkeletonCard';

export default function Loading() {
  // Display a grid of skeleton cards
  const skeletons = Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />);

  return (
    <main className="container">
      <ul className="grid onecol">
        {skeletons}
      </ul>
    </main>
  );
}
