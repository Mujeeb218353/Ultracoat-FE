interface SectionCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const SectionCard = ({ icon: Icon, title, children, className }: SectionCardProps) => (
  <section className={`w-sm sm:w-lg xl:w-4xl rounded-xl border border-gray-300 dark:border-white/10 shadow-sm ${className}`}>
    <header className="flex items-center gap-3 border-b border-gray-300 dark:border-white/10 px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg">
        <Icon size={14} />
      </span>
      <h3 className="text-sm font-bold">{title}</h3>
    </header>
    <div className="p-4">{children}</div>
  </section>
);

export default SectionCard;