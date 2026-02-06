export const generateLogo = (name: string): string => {
  const initial = name.charAt(0).toUpperCase();
  const logoColors = ['#FF6B35', '#004E89', '#F7B801', '#06A77D', '#D64045', '#2A9D8F', '#E76F51', '#264653'];
  const color = logoColors[name.length % logoColors.length];

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="${color}"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Space Grotesk, sans-serif"
        font-size="32"
        font-weight="600"
        fill="white"
      >
        ${initial}
      </text>
    </svg>
  `)}`;
};
