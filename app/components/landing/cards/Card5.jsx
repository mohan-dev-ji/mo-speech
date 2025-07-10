const Card5 = ({ icon, title, description, iconBg, titleColor, className, hoverShadow }) => (
  <div
    className={`bg-brand-bg-alt-secondary border border-brand-line rounded-2xl flex flex-col items-center px-6 md:px-10 py-10 md:py-[60px] flex-1 w-full mx-auto ${className} transition-transform duration-200 hover:-translate-y-2`}
    style={{ boxShadow: 'none' }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0,116,205,0.32)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
  >
    <div className={`mb-9 rounded-full flex items-center justify-center ${iconBg}`} style={{ width: 82, height: 82 }}>
      <div className="flex items-center justify-center w-[50px] h-[50px]">{icon}</div>
    </div>
    <div className="text-h4 text-center mb-4 text-brand-text">
      {title}
    </div>
    <div className="text-large text-brand-text-secondary text-center">
      {description}
    </div>
  </div>
);

export default Card5; 