export default function EventDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-64 rounded bg-muted" />
      <div className="mt-4 h-[330px] rounded-2xl bg-muted sm:h-[400px] lg:h-[440px]" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="h-52 rounded-2xl bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-32 rounded-2xl bg-muted" />
            <div className="h-32 rounded-2xl bg-muted" />
          </div>
          <div className="h-64 rounded-2xl bg-muted" />
        </div>
        <div className="h-[420px] rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
