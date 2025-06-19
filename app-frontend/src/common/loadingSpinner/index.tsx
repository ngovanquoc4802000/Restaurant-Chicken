function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
