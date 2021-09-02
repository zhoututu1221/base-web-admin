// 面包屑功能
export default {
  state: {
    currentMenu: null,
  },
  mutations: {
    changeBreadcrumb(state,val){
      state.currentMenu = null;
      state.currentMenu = val;
    }
  },
  actions: {
      
  },
};
