import Vue from "vue";
import VueI18n from "vue-i18n";
import zh_TW from "vee-validate/dist/locale/zh_TW.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh_TW",
  messages: {
    zh_TW: {
      fields: {
        email: "E-mail",
        name:"姓名",
        address:'地址',
        phone:'電話',
        password: "Password"
      },
      validation: zh_TW.messages
    }
  }
});

export { i18n };
