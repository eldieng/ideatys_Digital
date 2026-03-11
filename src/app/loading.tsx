export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-gray-medium animate-pulse">Chargement...</p>
      </div>
    </div>
  );
}
