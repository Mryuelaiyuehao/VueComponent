import { COLORS, LIGHT_THEME, DARK_THEME } from "../assets/js/const";
const handleColor = (color) => {
	return COLORS.includes(color) ? `var(--${color})` : color;
};

// 是否是暗黑模式
const isDarkMode = () => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// 切换主题
const generateTheme = (isDark = false) => {
	const theme = isDark ? DARK_THEME : LIGHT_THEME;
	const variables = {};
	for (const [key, value] of Object.entries(theme)) {
		variables[`--${key}`] = value;
	}
	return variables;
};
const pxToRem = function (px = 24) {
	return `${px / 75}rem`;
};
export { handleColor, pxToRem, isDarkMode, generateTheme };

