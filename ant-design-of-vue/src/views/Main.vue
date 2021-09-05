<!-- 主界面 -->
<template>
  <a-layout id="page" style="min-height: 100vh">
    <a-layout-sider
      style="background: #fff;"
      breakpoint="lg"
      v-model="collapsed"
      width="256"
    >
      <div ref="logo" class="logo" />
      <custom-slider-menu class="slider-menu" :style="sliderMenuStyle" :collapsed="collapsed" />
      <div ref="collapseds" @click="alterCollapsed" class="collapsed">
        <a-icon class="collapsed-icon" :type="collapsedIcon" />
      </div>
    </a-layout-sider>
    <div class="transparent-background" @click="closeMenu()"></div>
    <a-layout>
      <!-- 页头 -->
      <a-layout-header ref="header" class="header" >
        <div class="small-logo" @click="openMenu()"></div>
        <a-icon type="menu-unfold" class="menu-icon" @click="openMenu()" />

        <a-auto-complete
          class="search"
          placeholder="请输入您的搜索内容"
          option-label-prop="value"
        >
          <template slot="dataSource">
            <a-select-opt-group>
              <span slot="label">
                搜索历史
              </span>
              <span class="clear-history" slot="label" @click="clearHistory">
                清除全部
              </span>
              <a-select-option v-show="searchHistory.length == 0" key="" value=""><a-empty style="opacity: 0.7;margin: 10px auto 20px auto;" v-show="searchHistory.length == 0" description="搜索历史为空" /></a-select-option>
              <a-select-option v-show="searchHistory.length != 0" v-for="(item,index) in searchHistory" :key="index" :value="item">{{ item }}<a-icon class="close-now-history" type="close" @click="closeNowHistory(item)" /></a-select-option>
            </a-select-opt-group>
          </template>
          <a-input-search v-model="searchText" v-if="clientWidth <= 768" allow-clear placeholder="请输入您的搜索内容" @search="onSearch" />
          <a-input-search v-model="searchText" v-if="clientWidth > 768" allow-clear enter-button placeholder="请输入您的搜索内容" @search="onSearch" />
        </a-auto-complete>

        <!-- <a class="login" v-if="isLogin == false" @click="goto('/login')">登录</a> -->
        <a class="login" v-if="isLogin == false" @click="showDrawer">登录</a>
        

        <a-dropdown v-if="isLogin == true">
          <a-avatar size="large" class="head-image" shape="circle" icon="user" src="" />
          <a-menu slot="overlay" class="head-sub-menu">
            <a-menu-item key="0">
              <a @click="goto('/my')"><a-icon type="user" />我的信息</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="goto('/message')"><a-icon type="mail" />消息中心</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <a @click="goto('/exit')" style="color: red;"><a-icon type="export" />退出登录</a>
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
          <a-breadcrumb-item v-if="currentMenu != null">{{ currentMenu.menuName }}</a-breadcrumb-item>
          <a-breadcrumb-item v-if="currentMenu != null && currentMenu.nowTags.length != 0" >{{ currentMenu.nowTags[0].tagsName }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <!-- 内容部分 -->
      <a-layout-content class="content">
        <router-view style="min-height: 400px;" />
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
      <div class="login-board">
        <div class="login-logo"></div>
        <a-tabs class="login-board-tabs" default-active-key="1" tabPosition="top">
          <a-tab-pane key="1" tab="扫码登录" tabPosition>
            <img class="login-qrcode" :src="QRcode" alt="二维码加载失败" />
            <a-input class="login-input" ref="userNameInput" v-model="loginCode" placeholder="请输入登录码">
              <!-- <a-icon slot="prefix" type="unlock" /> -->
              <a-tooltip slot="suffix" title="进入公众号，点一键登录获取登录码">
                <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
              </a-tooltip>
            </a-input>
            <a-button class="login-button" type="primary" @click="submitLoginCode">提交</a-button>
          </a-tab-pane>
          <a-tab-pane key="2" tab="账号密码登录" tabPosition>
            <a-input class="login-input" v-model="username" style="margin-top: 10px;" placeholder="用户ID/邮箱号" allow-clear >
              <a-icon slot="prefix" type="user" />
            </a-input>
            <a-input-password class="login-input" v-model="password" style="margin-top: 10px;" placeholder="密码" >
              <a-icon slot="prefix" type="lock" />
            </a-input-password>
            <div class="login-input" style="margin-top: 10px;display: flex;align-items: center;">
              <a-input v-model="vcode" placeholder="验证码" allow-clear >
                <a-icon slot="prefix" type="safety-certificate" />
              </a-input>
              <img class="vcode-img" :src="vcodeImg" alt="验证码加载失败" />
            </div>
            <a-button style="margin-top: 20px;" class="login-button" type="primary" @click="submitUP">登录</a-button>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-drawer>
  </a-layout>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import customSliderMenu from "../components/customSliderMenu.vue";
import navOfClose from "../components/navOfClose.vue";
import { mapState } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { 
    customSliderMenu,
    navOfClose,
  },
  data() {
    //这里存放数据
    return {
      collapsed: null,
      collapsedIcon: "menu-unfold",
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      sliderMenuStyle: {},
      isLogin: null,
      searchHistory: [],
      searchText: "",
      visible: true,
      QRcode: require("../assets/QRCode.jpg"),
      loginCode: "",
      username: "",
      password: "",
      vcode: "",
      vcodeImg: require("../assets/vcode.jpg"),
      drawerPlacement: "right",
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
    clientWidth(val){
      // console.log(val);
      let leftMenu = document.querySelector(".ant-layout-sider");
      let transparentBackground = document.querySelector(".transparent-background");
      // 屏幕自适应显示隐藏菜单
      if(val > 992){
        leftMenu.style.display = "block";
        leftMenu.style.position = "relative";
        leftMenu.style.opacity = 1;
        transparentBackground.style.display = "none";
        this.collapsed = false;
        this.drawerPlacement = "right";
      }else if(val > 768 && val < 992){
        leftMenu.style.display = "block";
        leftMenu.style.position = "relative";
        leftMenu.style.opacity = 1;
        transparentBackground.style.display = "none";
        this.collapsed = true;
        this.drawerPlacement = "right";
      }else{
        leftMenu.style.display = "none";
        transparentBackground.style.display = "none";
        this.drawerPlacement = "bottom";
      }
    },
    clientHeight(val){
      // console.log(val);
    },

    // 监控搜索历史的变动
    searchHistory(val){
      let searchHistory = JSON.stringify(val);
      window.localStorage.setItem("SEARCH_HISTORY",searchHistory);
      this.$cookies.get("SEARCH_HISTORY",searchHistory);
    }

  },
  //方法集合
  methods: {

    // 使用登录码登录
    submitLoginCode(){
      console.log("登录码："+this.loginCode);
    },

    // 使用账号密码登录
    submitUP(){
      console.log("账号："+this.username+"/密码："+this.password+"/验证码："+this.vcode);
    },

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
    closeNowHistory(val){
      this.searchHistory = this.searchHistory.filter((item) => item != val);
    },

    // 清除全部历史记录
    clearHistory(){
      this.searchHistory = [];
    },

    // 点击搜索按钮
    onSearch(val){
      // 如果原来存在该搜索历史，则清除它
      this.searchHistory = this.searchHistory.filter((item) => item != val);
      this.searchHistory.unshift(val);
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
    openMenu(){
      let leftMenu = document.querySelector(".ant-layout-sider");
      let transparentBackground = document.querySelector(".transparent-background");
      leftMenu.style.display = "block";
      leftMenu.style.position = "fixed";

      // 菜单渐变显示
      let opacity = 0;
      transparentBackground.style.opacity = opacity;
      transparentBackground.style.display = "block";
      leftMenu.style.opacity = opacity;
      let opacityInterval = setInterval(() => {
        opacity += 0.1;
        transparentBackground.style.opacity = opacity;
        leftMenu.style.opacity = opacity;
        if(opacity >= 1){
          clearInterval(opacityInterval);
        }
      },10);
      

      this.collapsed = false;
    },
    // 关闭左侧菜单
    closeMenu(){
      let leftMenu = document.querySelector(".ant-layout-sider");
      let transparentBackground = document.querySelector(".transparent-background");

      // 菜单渐变隐藏
      let opacity = 1;
      transparentBackground.style.opacity = opacity;
      leftMenu.style.opacity = opacity;
      let opacityInterval = setInterval(() => {
        opacity -= 0.1;
        transparentBackground.style.opacity = opacity;
        leftMenu.style.opacity = opacity;
        if(opacity <= 0){
          leftMenu.style.position = "relative";
          leftMenu.style.display = "none";
          transparentBackground.style.display = "none";
          clearInterval(opacityInterval);
        }
      },10);

      this.collapsed = false;
    },

    // 判断是否登录
    loginStatus(){
      if(localStorage.getItem('JWT_TOKEN') || this.$cookies.get('JWT_TOKEN')){
        this.isLogin = true;
        // console.log("已登录");
      }else{
        this.isLogin = false;
        // console.log("未登录");
      }
    },

    // 跳转
    goto(path){
      this.$router.push({
        path: path
      });
    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var that = this;
    // 实时获取屏幕宽高
    window.onresize = function(){
      that.clientWidth = document.documentElement.clientWidth;
      that.clientHeight = document.documentElement.clientHeight;
    };
    
    // 判断是否登录
    this.loginStatus();

    // 自适应左侧菜单高度
    let logo = this.$refs.logo;
    let collapseds = this.$refs.collapseds;
    let blank = 50;
    let menuHeight = logo.offsetHeight + logo.offsetTop + collapseds.offsetHeight + blank;
    let height = this.clientHeight - menuHeight;
    this.sliderMenuStyle = {height: height+"px"};

    // 获取搜索历史
    if(localStorage.getItem('SEARCH_HISTORY') || this.$cookies.get('SEARCH_HISTORY')){
      localStorage.getItem('SEARCH_HISTORY') ? this.searchHistory = JSON.parse(localStorage.getItem('SEARCH_HISTORY').toString()) : "";
      this.$cookies.get('SEARCH_HISTORY') ? this.searchHistory = JSON.parse( this.$cookies.get('SEARCH_HISTORY').toString()) : "";
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
  height: 80px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 8px;
  margin-top: 20px;
}

.header{
  background: white;
  padding: 0;
  display: flex;
  align-items: center;
}
.small-logo{
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  display: none;
}
.menu-icon{
  font-size: 20px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: none;
}
.search{
  margin: 0px 20px;
  flex: 1;
  max-width: 360px;
  margin-left: auto;
}
.head-image{
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
.head-sub-menu .ant-dropdown-menu-item{
  padding: 10px 20px;
}
.head-sub-menu .ant-dropdown-menu-item .anticon{
  margin-right: 10px;
}
.login{
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
}

/* 清除全部历史 */
.clear-history{
  position: absolute;
  right: 20px;
  color: #1890ff;
  cursor: pointer;
  transition: 0.3s all;
}
.clear-history:hover{
  opacity: 0.8;
}

/* 清除当前历史 */
.close-now-history{
  position: absolute;
  font-size: 10px;
  right: 20px;
  top: 8px;
  display: block;
  border-radius: 50%;
  padding: 3px;
}
.close-now-history:hover{
  transition: 0.3s all;
  transform: rotateZ(360deg);
  background-color: rgba(0, 0, 0, 0.2);
}

/* 登录抽屉 */
.ant-drawer ::v-deep .ant-drawer-content-wrapper{
  width: 500px !important;
  min-height: 400px;
  overflow: hidden;
}
.ant-drawer ::v-deep .ant-drawer-content{
  background: url("../assets/background.svg");
  background-color: #F8FAFC;
}
/* 登录抽屉里的板块 */
.login-board{
  min-width: 300px;
  width: 100%;
  height: calc(80vh - 50px);
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-logo{
  width: 200px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.1);
}
.login-board-tabs{
  width: 235px;
  margin-top: 20px;
}

/* 登录二维码 */
.login-qrcode{
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: block;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 登录输入框 */
.login-input{
  width: 86%;
  display: block;
  margin: auto;
  margin-top: 20px;
}
/* 登录按钮 */
.login-button{
  width: 86%;
  display: block;
  margin: auto;
  margin-top: 10px;
}
/* 验证码图片 */
.vcode-img{
  width: 120px;
  height: 32px;
  margin-left: 5px;
}

.nav-of-close{
  width: 100%;
}

.breadcrumb{
  margin: 0 16px;
}

.content{
  padding: 0px 16px;
  overflow-y: auto;
}

.slider-menu{
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
.ant-layout ::v-deep .ant-layout-sider{
  height: 100vh;
  z-index: 999;
}
/* 侧边栏透明背景 */
.transparent-background{
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: none;
}

@media (max-width: 768px) {
  /* 手机模式隐藏侧边栏菜单 */
  .ant-layout-sider {
    display: none;
  }
  .menu-icon{
    display: inline;
  }
  .small-logo{
    display: block;
  }
  .search{
    margin-left: 50px;
    max-width: none;
  }
  .ant-drawer ::v-deep .ant-drawer-content-wrapper{
    height: 80% !important;
    width: 100% !important;
  }
  .login-qrcode{
    width: 180px;
    height: 180px;
  }
  .login-board{
    justify-content: start;
  }
  .login-logo{
    margin-top: 20px;
  }
}
</style>
