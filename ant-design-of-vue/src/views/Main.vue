<!-- 主界面 -->
<template>
  <a-layout id="page" style="min-height: 100vh">
    <transition name="left-fade">
      <a-layout-sider
        style="background: #fff;"
        breakpoint="lg"
        v-model="collapsed"
        width="256"
        v-show="sidebarShow"
      >
        <div ref="logo" class="logo" />
        <custom-slider-menu
          class="slider-menu"
          :style="sliderMenuStyle"
          :collapsed="collapsed"
        />
        <div ref="collapseds" @click="alterCollapsed" class="collapsed">
          <a-icon class="collapsed-icon" :type="collapsedIcon" />
        </div>
      </a-layout-sider>
    </transition>
    <transition name="fade">
      <div
        v-show="backShow"
        class="transparent-background"
        @click="closeMenu()"
      ></div>
    </transition>
    <a-layout>
      <!-- 页头 -->
      <a-layout-header ref="header" class="header">
        <div class="small-logo" @click="openMenu()"></div>
        <a-icon type="menu-unfold" class="menu-icon" @click="openMenu()" />

        <custom-search class="search" />

        <!-- <a class="login" v-if="isLogin == false" @click="goto('/login')">登录</a> -->
        <a class="login" v-if="isLogin == false" @click="showDrawer">登录</a>

        <a-dropdown v-if="isLogin == true">
          <a-avatar
            size="large"
            class="head-image"
            shape="circle"
            icon="user"
            src=""
          />
          <a-menu slot="overlay" class="head-sub-menu">
            <a-menu-item key="0">
              <a @click="goto('/my')"><a-icon type="user" />我的信息</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="goto('/message')"><a-icon type="mail" />消息中心</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a @click="goto('/exit')" style="color: red;"
                ><a-icon type="export" />退出登录</a
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <!-- 页头导航标签 -->
      <div ref="nav" class="nav-of-close">
        <navOfClose />
      </div>
      <!-- 面包屑 -->
      <div ref="breadcrumb" class="breadcrumb">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-if="currentMenu != null">{{
            currentMenu.menuName
          }}</a-breadcrumb-item>
          <a-breadcrumb-item
            v-if="currentMenu != null && currentMenu.nowTags.length != 0"
            >{{ currentMenu.nowTags[0].tagsName }}</a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <!-- 内容部分 -->
      <a-layout-content class="content">
        <router-view style="min-height: calc(100vh - 300px);" />
        <!-- 页脚 -->
        <a-layout-footer style="text-align: center">
          Base Web Admin ©2021 Created by Zhoututu
        </a-layout-footer>
      </a-layout-content>
    </a-layout>

    <!-- 登录抽屉 -->
    <a-drawer
      :placement="drawerPlacement"
      :closable="true"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <custom-login class="login-board" />
    </a-drawer>
  </a-layout>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import customSliderMenu from "../components/customSliderMenu.vue";
import navOfClose from "../components/navOfClose.vue";
import customSearch from "../components/customSearch.vue";
import customLogin from "../components/customLogin.vue";
import { mapState } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    customSliderMenu,
    navOfClose,
    customSearch,
    customLogin,
  },
  data() {
    //这里存放数据
    return {
      collapsed: null,
      collapsedIcon: "menu-unfold",
      clientWidth: 0,
      clientHeight: 0,
      sliderMenuStyle: {},
      isLogin: null,
      searchHistory: [],
      searchText: "",
      visible: false,
      drawerPlacement: "right",
      sidebarShow: null,
      backShow: null,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      currentMenu: (state) => state.breadcrumb.currentMenu,
    }),
  },
  //监控data中的数据变化
  watch: {
    collapsed(val) {
      if (val) {
        this.collapsedIcon = "menu-unfold";
      } else {
        this.collapsedIcon = "menu-fold";
      }
      this.collapsedIconStyle();
    },
    clientWidth(val) {
      // console.log(val);

      // 屏幕自适应显示隐藏菜单
      if (val > 992) {
        this.sidebarShow = true;
        this.backShow = false;
        this.collapsed = false;
        this.drawerPlacement = "right";
      } else if (val > 768 && val < 992) {
        this.sidebarShow = true;
        this.backShow = false;
        this.collapsed = true;
        this.drawerPlacement = "right";
      } else {
        this.sidebarShow = false;
        this.backShow = false;
        this.drawerPlacement = "bottom";
      }
    },
    clientHeight(val) {
      // console.log(val);
      
      // 动态设置菜单高度
      this.setMenuHeight();
    },

    // 监控搜索历史的变动
    searchHistory(val) {
      // 最多保存六条记录
      val = val.slice(0, 6);

      let searchHistory = JSON.stringify(val);
      window.localStorage.setItem("SEARCH_HISTORY", searchHistory);
      this.$cookies.get("SEARCH_HISTORY", searchHistory);
    },
  },
  //方法集合
  methods: {
    // 登录抽屉相关事件
    afterVisibleChange(val) {
      // console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },

    // 清除当前历史选项
    closeNowHistory(val) {
      this.searchHistory = this.searchHistory.filter((item) => item != val);
    },

    // 清除全部历史记录
    clearHistory() {
      this.searchHistory = [];
    },

    // 点击搜索按钮
    onSearch(val) {
      // 如果原来存在该搜索历史，则清除它
      this.searchHistory = this.searchHistory.filter((item) => item != val);
      this.searchHistory.unshift(val);
      // 最多展示六条记录
      this.searchHistory = this.searchHistory.slice(0, 6);
    },

    // 收缩展开侧边栏
    alterCollapsed() {
      this.collapsed = !this.collapsed;
    },

    collapsedIconStyle() {
      // 控制收缩展开时图标的样式
      var collapseds = this.$refs.collapseds;
      var collapsedsIcon = collapseds.querySelector(".collapsed-icon");
      if (this.collapsed) {
        collapseds.style.textAlign = "center";
        collapsedsIcon.style.marginLeft = "0px";
      } else {
        collapseds.style.textAlign = "left";
        collapsedsIcon.style.marginLeft = "20px";
      }
    },

    // 打开左侧菜单
    openMenu() {
      this.sidebarShow = true;
      this.backShow = true;
      this.collapsed = false;
    },
    // 关闭左侧菜单
    closeMenu() {
      this.sidebarShow = false;
      this.backShow = false;
      this.collapsed = false;
    },

    // 判断是否登录
    loginStatus() {
      if (localStorage.getItem("JWT_TOKEN") || this.$cookies.get("JWT_TOKEN")) {
        this.isLogin = true;
        // console.log("已登录");
      } else {
        this.isLogin = false;
        // console.log("未登录");
      }
    },

    // 跳转
    goto(path) {
      this.$router.push({
        path: path,
      });
    },

    // 动态设置菜单高度
    setMenuHeight() {
      let logo = this.$refs.logo;
      let collapseds = this.$refs.collapseds;
      let blank = 20;
      let menuHeight =
        logo.offsetHeight + logo.offsetTop + collapseds.offsetHeight + blank;
      let height = this.clientHeight - menuHeight;
      this.sliderMenuStyle = { height: height + "px" };
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var that = this;

    that.clientWidth = document.documentElement.clientWidth;
    that.clientHeight = document.documentElement.clientHeight;

    // 实时获取屏幕宽高
    window.addEventListener("resize", () => {
      that.clientWidth = document.documentElement.clientWidth;
      that.clientHeight = document.documentElement.clientHeight;
    });

    // 判断是否登录
    this.loginStatus();

    // 自适应左侧菜单高度 this.$nextTick是为了保证DOM渲染完成
    this.$nextTick(() => {
      that.setMenuHeight();
    });

    // 获取搜索历史
    if (
      localStorage.getItem("SEARCH_HISTORY") ||
      this.$cookies.get("SEARCH_HISTORY")
    ) {
      localStorage.getItem("SEARCH_HISTORY")
        ? (this.searchHistory = JSON.parse(
            localStorage.getItem("SEARCH_HISTORY").toString()
          ))
        : "";
      this.$cookies.get("SEARCH_HISTORY")
        ? (this.searchHistory = JSON.parse(
            this.$cookies.get("SEARCH_HISTORY").toString()
          ))
        : "";
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
@import "../assets/css/theme-style.scss";

#page {
  width: 100%;
  height: 100vh;
}
#page .logo {
  height: 60px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 8px;
  margin-top: 20px;
}

.header {
  background: white;
  padding: 0;
  display: flex;
  align-items: center;
}
.small-logo {
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  display: none;
}
.menu-icon {
  font-size: 20px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: none;
}
.search {
  margin: 0px 20px;
  flex: 1;
  max-width: 360px;
  margin-left: auto;
}
.head-image {
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
.head-sub-menu .ant-dropdown-menu-item {
  padding: 10px 20px;
}
.head-sub-menu .ant-dropdown-menu-item .anticon {
  margin-right: 10px;
}
.login {
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
}

/* 清除全部历史 */
.clear-history {
  position: absolute;
  right: 20px;
  color: #1890ff;
  cursor: pointer;
  transition: 0.3s all;
}
.clear-history:hover {
  opacity: 0.8;
}

/* 清除当前历史 */
.close-now-history {
  position: absolute;
  font-size: 10px;
  right: 20px;
  top: 8px;
  display: block;
  border-radius: 50%;
  padding: 3px;
}
.close-now-history:hover {
  transition: 0.3s all;
  transform: rotateZ(360deg);
  background-color: rgba(0, 0, 0, 0.2);
}

/* 登录抽屉 */
.ant-drawer ::v-deep .ant-drawer-content-wrapper {
  width: 500px !important;
  min-height: 400px;
  overflow: hidden;
}
.ant-drawer ::v-deep .ant-drawer-content {
  background: url("../assets/background.svg");
  background-color: #f8fafc;
}
/* 登录抽屉里的板块 */
.login-board {
  min-width: 300px;
  width: 100%;
  height: calc(80vh - 50px);
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nav-of-close {
  width: 100%;
}

.breadcrumb {
  margin: 0 16px;
}

.content {
  padding: 0px 16px;
  overflow-y: auto;
}

.slider-menu {
  overflow-y: auto;
  overflow-x: hidden;
}

.ant-layout-sider ::v-deep .ant-layout-sider-trigger {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  color: rgba(0, 0, 0, 0.65);
}

.collapsed {
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 50px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  line-height: 50px;
  cursor: pointer;
}
.collapsed:hover {
  color: #1890ff;
  transition: 0.3s all;
}
.collapsed-icon {
  font-size: 18px;
  margin-left: 20px;
}

/* 侧边栏 */
.ant-layout ::v-deep .ant-layout-sider {
  height: 100vh;
  z-index: 999;
}
/* 侧边栏透明背景 */
.transparent-background {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

/* 进入离开动画 */
/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 左侧滑出 */
.left-fade-enter-active {
  transition: all 0.3s ease;
}
.left-fade-leave-active {
  transition: all 0.3s ease;
}
.left-fade-enter,
.left-fade-leave-to {
  transform: translateX(-256px);
}

@media (max-width: 768px) {
  /* 手机模式隐藏侧边栏菜单 */
  .ant-layout-sider {
    position: fixed;
  }
  .menu-icon {
    display: inline;
  }
  .small-logo {
    display: block;
  }
  .search {
    margin-left: 50px;
    max-width: none;
  }
  .ant-drawer ::v-deep .ant-drawer-content-wrapper {
    height: 80% !important;
    width: 100% !important;
  }
}
</style>
