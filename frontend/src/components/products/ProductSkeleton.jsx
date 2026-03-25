export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-3 space-y-2">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-5 w-1/2 rounded" />
            <div className="skeleton h-8 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
}
