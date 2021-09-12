<!-- 主要框架 -->
<template>
  <el-container class="main">
    <transition name="left-fade">
      <el-aside
        v-show="sidebarShow"
        :class="isCollapse ? 'sidebar-back' : 'sidebar'"
      >
        <div :class="isCollapse ? 'logo-back' : 'logo'"></div>
        <custom-sidebar-menu class="sidebar-menu" :isCollapse="isCollapse" />
        <div class="collapse-button" @click="isCollapse = !isCollapse">
          <i
            :class="
              isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
            "
          ></i>
        </div>
      </el-aside>
    </transition>

    <!-- 遮罩层 -->
    <transition name="fade">
      <div v-show="maskShow" class="mask-layer" @click="closeSidebar"></div>
    </transition>
    <el-container class="main-right">
      <el-header>
        <div class="header-logo" @click="showSidebar"></div>

        <i
          class="iconfont ztt-icon-toggle-right header-open-menu"
          @click="showSidebar"
        ></i>

        <!-- 搜索框 -->
        <custom-search class="search" />

        <el-dropdown v-if="isLogin == true" class="dropdown-avatar">
          <el-avatar
            class="avatar"
            icon="el-icon-user-solid"
            src=""
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">我的信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-chat-line-round"
              >消息中心</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-switch-button"
              style="color: red;"
              divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <a class="login-text" v-if="isLogin == false" @click="goto('/login')">登录</a> -->
        <a class="login-text" v-if="isLogin == false" @click="drawer = true"
          >登录</a
        >
      </el-header>

      <el-header class="tools">
        <custom-nav-label class="tools-nav" />
        <custom-breadcrumb class="tools-breadcrumb" />
      </el-header>

      <el-main class="main-content">
        <router-view class="main-content-router" />
        <el-footer class="main-content-footer"
          >版权所有 © Zhoututu 2021</el-footer
        >
      </el-main>
    </el-container>
    <el-drawer
      :visible.sync="drawer"
      :direction="drawerDirection"
      :with-header="true"
    >
      <custom-login class="login-board" />
    </el-drawer>
  </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CustomSidebarMenu from "../components/CustomSidebarMenu.vue";
import CustomNavLabel from "../components/CustomNavLabel.vue";
import CustomBreadcrumb from "../components/CustomBreadcrumb.vue";
import CustomSearch from "../components/CustomSearch.vue";
import CustomLogin from "../components/CustomLogin.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CustomSidebarMenu,
    CustomNavLabel,
    CustomBreadcrumb,
    CustomSearch,
    CustomLogin,
  },
  data() {
    //这里存放数据
    return {
      clientWidth: 0,
      clientHeight: 0,
      isCollapse: null,
      isLogin: null,
      sidebarShow: null,
      maskShow: null,
      drawer: false,
      drawerDirection: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监控可视区域宽度
    clientWidth(val) {
      // console.log(val);

      // 屏幕自适应操作
      if (val > 992) {
        // 电脑模式
        this.isCollapse = false;
        this.sidebarShow = true;
        this.maskShow = false;
        this.drawerDirection = "rtl";
      } else if (val > 768 && val < 992) {
        // 平板模式
        this.isCollapse = true;
        this.sidebarShow = true;
        this.maskShow = false;
        this.drawerDirection = "rtl";
      } else {
        // 手机模式
        this.isCollapse = false;
        this.sidebarShow = false;
        this.maskShow = false;
        this.drawerDirection = "btt";
      }
    },
    clientHeight(val) {
      // console.log(val);
    },
  },
  //方法集合
  methods: {
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

    // 弹出左侧菜单
    showSidebar() {
      this.sidebarShow = true;
      this.maskShow = true;
    },

    // 关闭左侧菜单
    closeSidebar() {
      this.sidebarShow = false;
      this.maskShow = false;
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
<style scoped>
.main {
  height: 100vh;
}

/* 页头 */
.el-header {
  background-color: #ffffff;
  color: #333;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0px 15px;
}

/* 下拉菜单头像 */
.dropdown-avatar {
  margin-left: 20px;
}
/* 头像 */
.avatar {
  cursor: pointer;
}
/* 右上角登录 */
.login-text {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #1890ff;
  cursor: pointer;
  transition: 0.3s all;
}
.login-text:hover {
  opacity: 0.8;
}
/* 搜索 */
.search {
  margin-left: auto;
  max-width: 300px;
}

/* 登录板块 */
.login-board {
  margin-left: 0;
}
/* 登录抽屉 */
.el-drawer__wrapper ::v-deep .el-drawer {
  min-height: 500px;
}
/* 右侧登录抽屉 */
.el-drawer__wrapper ::v-deep .rtl {
  width: 30%;
  min-width: 500px !important;
  background-color: #f8fafc !important;
}
/* 登录抽屉标题部分 */
.el-drawer__wrapper ::v-deep .el-drawer__header{
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
}

/* 侧边栏 */
.el-aside {
  width: 256px !important;
  color: #333;
  overflow-x: hidden;
  border-right: 1px solid #e6e6e6;
  position: relative;
}
.sidebar {
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
}
/* 菜单收回的侧边栏 */
.sidebar-back {
  width: 64px !important;
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
}
.logo {
  background-color: #e6e6e6;
  height: 64px;
  min-height: 64px;
  margin: 16px;
  transition: 0.3s all;
}
/* 菜单收回的LOGO */
.logo-back {
  background-color: #e6e6e6;
  height: 52px;
  min-height: 52px;
  margin: 5px;
  transition: 0.3s all;
}
.sidebar-menu {
  flex: 1;
  overflow-x: hidden;
  margin-bottom: 60px;
}
.collapse-button {
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  min-height: 48px;
  cursor: pointer;
  transition: 0.3s all;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 999;
}
.collapse-button:hover i {
  color: #409eff;
  font-weight: bold;
}
/* 收缩展开文字图标 */
.collapse-button i {
  font-size: 20px;
}

/* 页面的右边部分 */
.main-right {
  background-color: #f0f2f5;
}

/* 头部小logo */
.header-logo {
  width: 35px;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.1);
  display: none;
}

/* 打开菜单按钮 */
.header-open-menu {
  font-size: 25px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 5px;
  display: none;
}

/* 头部扩展工具栏，用来放固定在头部的导航标签、面包屑等 */
.tools {
  padding: 0;
  background-color: transparent;
  height: auto !important;
  border: none;
  display: block;
}
/* 导航标签 */
.tools-nav {
  width: 100%;
}
.tools-nav ::v-deep .el-tabs__header {
  margin: 0;
}
/* 面包屑 */
.tools-breadcrumb {
  padding: 0px 20px;
  margin-top: 15px;
  margin-bottom: 10px;
}

/* 页面的右边部分中的内容部分 */
.main-content {
  /* background-color: #F0F2F5; */
  padding: 0;
}
.main-content-router {
  flex: 1;
  min-height: calc(100vh - 300px);
  padding: 20px;
  /* background-color: white; */
}
.main-content-footer {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto !important;
  min-height: 64px;
  padding: 40px 20px 30px 20px;
  /* border-top: 1px solid #e6e6e6; */
}

/* 遮罩层 */
.mask-layer {
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
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

/* 平板模式 */
@media (min-width: 768px) and (max-width: 992px) {
}

/* 手机模式 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    background-color: white;
    z-index: 999;
    width: 256px;
    height: 100vh;
    top: 0;
    left: 0;
  }
  /* 菜单收回的侧边栏 */
  .sidebar-back {
    position: fixed;
    background-color: white;
    z-index: 999;
    width: 64px;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .sidebar-menu {
    position: relative;
  }

  .search {
    max-width: 160px;
  }
  .login-text {
    margin-left: 10px;
  }

  /* 头部小logo */
  .header-logo {
    display: block;
  }

  /* 打开菜单按钮 */
  .header-open-menu {
    display: block;
  }

  /* 登录抽屉 */
  .el-drawer__wrapper ::v-deep .el-drawer {
    height: 80% !important;
  }
}
</style>
