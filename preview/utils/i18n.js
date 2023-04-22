import VueI18n from "vue-i18n";
import { LANGUAGE } from "../statics/js/enums";
const setLanguage = (lang) => {
  return new Promise((resole, reject) => {
    if (
      !Object.values(LANGUAGE).includes(lang) ||
      !(window.$i18n instanceof VueI18n)
    ) {
      return reject(new Error("Fail"));
    }
    window.$i18n.locale = lang;
    return resole("");
  });
};

export { setLanguage };
