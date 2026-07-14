interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  className = "",
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-primary-bg" : "text-primary-text"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg sm:text-xl max-w-2xl ${
            light ? "text-primary-bg/70" : "text-secondary-text"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
