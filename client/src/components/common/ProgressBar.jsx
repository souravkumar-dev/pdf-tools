function ProgressBar({ progress }) {
    return (
      <div className="w-full mt-6">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Processing...</span>
  
          <span>{progress}%</span>
        </div>
  
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    );
  }
  
  export default ProgressBar;