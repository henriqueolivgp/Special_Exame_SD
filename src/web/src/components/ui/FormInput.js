export function FormInput({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink/80 dark:text-chalk/80 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="block w-full rounded-lg border border-black/10 dark:border-white/10 bg-bone dark:bg-fog-2
          px-3 py-2.5 text-sm text-ink dark:text-chalk placeholder:text-ink/35 dark:placeholder:text-chalk/35
          shadow-sm focus:outline-none focus:ring-2 focus:ring-shard focus:border-shard transition-colors"
        {...props}
      />
    </div>
  );
}
