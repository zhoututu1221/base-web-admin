// 导航标签功能
export default {
  state: {
    menuList: null,
    currentMenu: null,
  },
  mutations: {
    selectMenu(state, val) {
      state.currentMenu = null;
      state.currentMenu = val;
    },
    addMenu(state, val) {
      state.currentMenu = null;
      state.currentMenu = val;
    },
    removeMenu(state, val) {
      state.currentMenu = null;
      state.currentMenu = val;
    },
  },
  actions: {},
};
