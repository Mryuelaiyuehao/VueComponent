<template>
  <base-view class="home" is-root>
    <NavBar slot="header" :title="$t('common.title')" />
    <CellGroup class="cell-group-custom">
      <Cell :title="$t('common.theme')" center>
        <ul class="theme">
          <li
            v-for="color in primaryColors"
            :key="color"
            :class="[
              'theme-item',
              primaryColor === color ? 'theme-item-cur' : '',
            ]"
            :style="{ backgroundColor: color }"
            @click="changeTheme(color)"
          />
        </ul>
      </Cell>
      <Cell :title="$t('common.dark')">
        <xzy-switch v-model="isDark" size="normal" @input="onChange" />
      </Cell>
      <Cell :title="$t('common.multiLanguage')">
        <xzy-switch v-model="isEnglish" size="normal" @input="changeLanguage" />
      </Cell>
    </CellGroup>
    <CellGroup
      v-for="(item, index) in list()"
      :key="index"
      class="cell-group-custom"
      :title="item.title"
    >
      <Cell
        v-for="({ title, to }, subIndex) in item.children"
        :key="subIndex"
        :title="title"
        :to="to"
        is-link
        center
        clickable
      />
    </CellGroup>
  </base-view>
</template>
<script>
import { NavBar, CellGroup, Cell, Switch } from "../../src/index";
import { LANGUAGE, DARK_THEME, LIGHT_THEME } from "../statics/js/enums";
import { generateCssVars, isDarkMode } from "../utils/theme";
import { setLanguage } from "../utils/i18n";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    NavBar,
    CellGroup,
    Cell,
    "xzy-switch": Switch,
  },
  data() {
    return {
      isDark: isDarkMode(),
      list: () => [
        {
          title: this.$t("common.baseComponent"),
          children: [
            {
              title: this.$t("common.cellTitle"),
              to: "/cell",
            },
            {
              title: this.$t("common.iconTitle"),
              to: "/icon",
            },
            {
              title: this.$t("common.buttonTitle"),
              to: "/button",
            },
          ],
        },
        {
          title: this.$t("common.navComponent"),
          children: [
            {
              title: this.$t("common.navTitle"),
              to: "/navBar",
            },
          ],
        },
        {
          title: this.$t("common.formComponent"),
          children: [
            {
              title: this.$t("common.switchTitle"),
              to: "/switch",
            },
          ],
        },
      ],
      isEnglish: false,
      primaryColors: [
        "#0060a6",
        "#1374bd",
        "#007edf",
        "#ff4444",
        "#ff8000",
        "#005924",
        "#30b768",
        "#00be9d",
      ],
      primaryColor: isDarkMode() ? DARK_THEME.primary : LIGHT_THEME.primary,
    };
  },
  created() {
    this.changeTheme(this.primaryColor);
  },
  methods: {
    changeTheme(color) {
      this.primaryColor = color;
      generateCssVars(this.primaryColor, this.isDark);
    },
    onChange() {
      generateCssVars(this.primaryColor, this.isDark);
    },
    changeLanguage() {
      setLanguage(this.isEnglish ? LANGUAGE.ENGLISH : LANGUAGE.CHINESE)
        .then(() => {})
        .catch((e) => {
          this.isEnglish = false;
          if (e instanceof Error) {
            console.log(e.message);
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.cell-group-custom {
  margin-bottom: $space5;
}

.switch {
  color: $c-text-primary;
}

.theme {
  display: flex;
  align-items: center;

  > .theme-item {
    width: 36px;
    height: 36px;
    margin-left: $space2;
    list-style-type: none;
    border-radius: 50%;

    &-cur {
      width: 46px;
      height: 46px;
    }
  }
}
</style>
