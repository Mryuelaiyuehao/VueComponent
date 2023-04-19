import { COLORS } from "../assets/js/const";
const handleColor = (color) => {
	return COLORS.includes(color) ? `var(--${color})` : color;
};

const pxToRem = function (px = 24) {
	return `${px / 75}rem`;
};

export { handleColor, pxToRem };

