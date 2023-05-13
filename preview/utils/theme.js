import cssVars from "css-vars-ponyfill";
import { DARK_THEME, LIGHT_THEME } from "../statics/js/enums";
const opacityColor = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
// 是否是暗黑模式
const isDarkMode = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// 将RGBA转为HEX
const RGBAToHEX = ({ r, g, b, a }) => {
  const rOut = Math.round((1 - a) * 255 + a * r);
  const gOut = Math.round((1 - a) * 255 + a * g);
  const bOut = Math.round((1 - a) * 255 + a * b);

  const hexR = rOut.toString(16).padStart(2, "0");
  const hexG = gOut.toString(16).padStart(2, "0");
  const hexB = bOut.toString(16).padStart(2, "0");

  return "#" + hexR + hexG + hexB;
};
// 将HEX转为RGBA
const HEXToRGBA = (hex, a) => {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a,
  };
};

// 切换主题
const generateTheme = (primaryColor, isDark = false) => {
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  theme.primary = primaryColor;
  const variables = {};
  for (const [key, value] of Object.entries(theme)) {
    variables[`--${key}`] = value;
  }
  const primaryFillColors = generateOpacityColor(primaryColor);
  opacityColor.forEach((opacity, i) => {
    variables[`--primary${opacity * 10}`] = primaryFillColors[i];
  });
  return variables;
};
// 生成不透明色
const generateOpacityColor = (color) => {
  const colors = [];
  opacityColor.forEach((alpha) => {
    const rgbaColor = HEXToRGBA(color, alpha);
    const hexColor = RGBAToHEX(rgbaColor);
    colors.push(hexColor);
  });
  return colors;
};

const generateCssVars = (
  primaryColor = LIGHT_THEME.primary,
  isDark = isDarkMode()
) => {
  cssVars({
    variables: generateTheme(primaryColor, isDark),
  });
};

export { isDarkMode, generateTheme, generateOpacityColor, generateCssVars };
