import VueI18n from "vue-i18n";
import { LANGUAGE } from "../statics/js/const";
const loadedLanguages = [LANGUAGE.CHINESE]; // 默认已经加载的语言
const setLanguage = (lang) => {
	if (!(window.$i18n instanceof VueI18n)) {
		return;
	}
	window.$i18n.locale = lang;
};

const loadLanguageAsync = (lang) => {
	if (window.$i18n.locale === lang) {
		return Promise.resolve(lang);
	}
	// 已经存在当前语言
	if (loadedLanguages.includes(lang)) {
		return Promise.resolve(lang);
	}
	return import(`../languages/${lang}.js`).then((messages) => {
		window.$i18n.mergeLocaleMessage(lang, messages.default);
		loadedLanguages.push(lang);
		return Promise.resolve(lang);
	});
};

export { setLanguage, loadLanguageAsync };

