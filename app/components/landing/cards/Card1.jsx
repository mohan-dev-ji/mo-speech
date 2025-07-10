export default function Card1({ icon, title, description, hoverShadow }) {
  return (
    <div
      className={`flex-1 bg-brand-card rounded-2xl relative flex flex-col items-start border-line-width border-brand-line transition-transform duration-200 hover:-translate-y-2 ${hoverShadow}`}
    >
      <div className="absolute inset-0 pointer-events-none rounded-roundness" />
      <div className="flex flex-col items-start gap-between-icon px-card-x py-card-y w-full">
        {icon}
        <div className="flex flex-col gap-between-heading items-start text-left w-full">
          <h4 className="text-h4 text-brand-text">{title}</h4>
          <p className="text-p-ui text-brand-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
} 