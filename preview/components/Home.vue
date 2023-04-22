<template>
  <base-view
    class="home"
    is-root
  >
    <NavBar
      slot="header"
      :title="$t('common.title')"
    />
    <CellGroup class="cell-group-custom">
      <Cell
        :title="$t('common.theme')"
        center
      >
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
        <xzy-switch
          v-model="isDark"
          size="normal"
          @input="onChange"
        />
      </Cell>
      <Cell :title="'是否英文'">
        <xzy-switch
          v-model="isEnglish"
          size="normal"
          @input="changeLanguage"
        />
      </Cell>
    </CellGroup>
    <CellGroup
      v-for="(item, index) in list"
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
import NavBar from "../../src/components/nav-bar";
import CellGroup from "../../src/components/cell-group";
import Cell from "../../src/components/cell";
import Switch from "../../src/components/switch";
import { LANGUAGE, DARK_THEME, LIGHT_THEME } from "../statics/js/enums";
import { generateCssVars, isDarkMode } from "../utils/theme";
import { setLanguage } from "../utils/i18n";
export default {
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
      list: [
        {
          title: this.$t("common.baseComponent"),
          children: [
            {
              title: "Cell 单元格",
              to: "/cell",
            },
            {
              title: "Icon 图标",
              to: "/icon",
            },
            {
              title: "Button 按钮",
              to: "/button",
            },
          ],
        },
        {
          title: "导航组件",
          children: [
            {
              title: "NavBar 导航栏",
              to: "/navBar",
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
    margin-left: $space2;
    list-style-type: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    &-cur {
      width: 46px;
      height: 46px;
    }
  }
}
</style>
