// 导航标签功能
export default {
  state: {
    menuList: [],
    currentMenu: null,
  },
  mutations: {
    // 选中导航标签
    selectMenu(state, val) {
      state.currentMenu = null;
      state.currentMenu = val;
    },
    // 添加导航标签
    addMenu(state, val) {
      let result = null;
      result = state.menuList.findIndex(item => item === JSON.stringify(val));
      // 为了避免无法插入重复项问题,需要将对象转换成字符串
      result === -1 ? state.menuList.push(JSON.stringify(val)) : "";
      state.currentMenu = null;
      state.currentMenu = val;
    },
    // 移除导航标签
    removeMenu(state, val) {
      // val为删除的索引
      state.menuList.splice(val,1);
    },
  },
  actions: {},
};
