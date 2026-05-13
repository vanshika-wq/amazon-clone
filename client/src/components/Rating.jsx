export default function Rating({ value, numReviews, color = '#FF9900' }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star) => (
          <span key={star} style={{ color }}>
            {value >= star ? '★' : value >= star - 0.5 ? '⯨' : '☆'}
          </span>
        ))}
      </div>
      {numReviews !== undefined && (
        <span className="text-blue-600 text-xs hover:text-orange-400 cursor-pointer">
          ({numReviews} reviews)
        </span>
      )}
    </div>
  );
}
