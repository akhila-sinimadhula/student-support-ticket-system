export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}