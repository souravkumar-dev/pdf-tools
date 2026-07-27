function FeatureCard({
    icon,
    title,
    description,
  }) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="mb-4">
          {icon}
        </div>
  
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
  
        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>
      </div>
    );
  }
  
  export default FeatureCard;