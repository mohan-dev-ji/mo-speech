const FullscreenIcon = ({ color = "#eba91c", width = 50, height = 50, ...props }) => (
    <svg width={width} height={height} viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M43.75 44.2236L31.25 31.7236M43.75 44.2236V34.2236M43.75 44.2236H33.75" stroke="#0074CD" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.25 34.2236V44.2236M6.25 44.2236H16.25M6.25 44.2236L18.75 31.7236" stroke="#0074CD" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M43.75 16.7236V6.72363M43.75 6.72363H33.75M43.75 6.72363L31.25 19.2236" stroke="#0074CD" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.25 16.7236V6.72363M6.25 6.72363H16.25M6.25 6.72363L18.75 19.2236" stroke="#0074CD" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default FullscreenIcon;