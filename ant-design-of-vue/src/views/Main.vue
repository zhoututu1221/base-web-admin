<!-- 主界面 -->
<template>
  <a-layout id="page" style="min-height: 100vh">
    <a-layout-sider
      style="background: #fff"
      breakpoint="lg"
      v-model="collapsed"
      width="256"
    >
      <div class="logo" />
      <custom-slider-menu :collapsed="collapsed" />
      <div ref="collapseds" @click="alterCollapsed" class="collapsed">
        <a-icon class="collapsed-icon" :type="collapsedIcon" />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;" />
      <div class="nav-of-close">
        <navOfClose />
      </div>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-if="currentMenu != null">{{ currentMenu.menuName }}</a-breadcrumb-item>
          <a-breadcrumb-item v-if="currentMenu != null && currentMenu.nowTags.length != 0" >{{ currentMenu.nowTags[0].tagsName }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }" >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Base Web Admin ©2021 Created by Zhoututu
      </a-layout-footer>
    </a-layout>
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
  },
  //方法集合
  methods: {
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
  height: 50px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 16px;
  margin-bottom: 30px;
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

@media (max-width: 768px) {
  /* 手机模式隐藏侧边栏菜单 */
  .ant-layout-sider {
    display: none;
  }
}
</style>
