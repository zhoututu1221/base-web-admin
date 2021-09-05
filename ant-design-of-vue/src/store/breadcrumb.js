// 面包屑功能
export default {
  state: {
    currentMenu: null,
  },
  mutations: {
    changeBreadcrumb(state,val){
      // 为避免无法修改的问题,需要先将currentMenu赋值为null
      state.currentMenu = null;
      state.currentMenu = val;
    }
  },
  actions: {
      
  },
};
