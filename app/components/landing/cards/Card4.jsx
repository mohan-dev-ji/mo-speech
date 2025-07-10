export default function Card4({ icon, title, description }) {
  return (
    <div className="bg-brand-background border border-brand-line rounded-2xl flex flex-col items-center px-4 py-[60px] flex-1 hover:shadow-[0_8px_32px_0_rgba(0,181,205,0.25)] transition-shadow duration-300">
      <div className="mb-8">{icon}</div>
      <div className="text-h4 text-brand-text text-center font-inter mb-[18px]">
        {title}
      </div>
      <div className="text-p-ui text-brand-text-secondary text-center font-inter">
        {description}
      </div>
    </div>
  );
} 