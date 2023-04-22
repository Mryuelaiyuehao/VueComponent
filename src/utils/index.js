import { COLORS } from "../assets/js/enums";
const handleColor = (color) => {
  if (!COLORS.includes(color)) {
    return color;
  }
  const results = [];
  for (let i = 0; i < color.length; i++) {
    let char = color.charAt(i);
    if(char === char.toUpperCase()){
      char = char.toLowerCase();
      results.push('-')
    }
    results.push(char)
  }
  return COLORS.includes(color) ? `var(--${results.join('')})` : color;
};
const pxToRem = function (px = 24) {
  return `${px / 75}rem`;
};

export { handleColor, pxToRem };
