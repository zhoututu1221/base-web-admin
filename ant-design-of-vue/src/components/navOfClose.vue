<!-- 导航标签 -->
<template>
  <div class="nav-of-close">
    <a-tabs v-model="activeKey" @tabClick="tabClick" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane
        key="index"
        tab="首页"
        :closable="false"
      >
      </a-tab-pane>
      <a-tab-pane
        v-for="item in menuList"
        :key="JSON.parse(item).nowTags.length == 0 ? JSON.parse(item).menuId.toString() : JSON.parse(item).menuId.toString() + '-' + JSON.parse(item).nowTags[0].tagsId.toString()"
        :tab="JSON.parse(item).nowTags.length == 0 ? JSON.parse(item).menuName.toString() : JSON.parse(item).menuName.toString() + ' > ' + JSON.parse(item).nowTags[0].tagsName.toString()"
        :closable="true"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeKey: "index",
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      menuList: (state) => state.navOfClose.menuList,
      currentMenu: (state) => state.navOfClose.currentMenu,
    }),
  },
  //监控data中的数据变化
  watch: {
    currentMenu(){
      if(this.currentMenu.menuId != undefined){
        if(this.currentMenu.nowTags.length == 0){
          this.activeKey = this.currentMenu.menuId.toString();
        }else{
          this.activeKey = this.currentMenu.menuId.toString() + "-" + this.currentMenu.nowTags[0].tagsId.toString();
        }
      }
    },
    $route(val){
      let path = val.path;
      if(path != "/" && path != "/list"){
        this.activeKey = "";
      }else{
        if(val.query.select != undefined && val.query.select != ""){
          this.selectNav(val.query.select);
        }
      }
    },
  },
  //方法集合
  methods: {

    // 点击导航标签
    tabClick(key){

      let val = key;

      let path = "";
      let open = val.split('-')[0];
      let select = val;
      let query = null;

      if(val == "index"){
        path = "/";
        query = {};
      }else{
        path = "/list"
        query = { open: open, select: select };
      }

      this.$router.push({
        path: path,
        query: query,
      });

    },
    
    // 根据传入的val跳转
    selectNav(val){
      let path = "";
      let open = val.split('-')[0];
      let select = val;
      let query = null;

      if(val == "index"){
        path = "/";
        query = {};
      }else{
        path = this.$route.path;
        query = { open: open, select: select };
      }

      this.$router.push({
        path: path,
        query: query,
      });
    },

    onEdit(targetKey, action) {
      this[action](targetKey);
    },

    // 移除导航标签
    remove(targetKey) {
      let menu = this.menuList;
      
      let menuId = targetKey.split('-')[0];
      let tagsId = null;

      if(targetKey.split('-').length > 1){
        tagsId = targetKey.split('-')[1];
      }

      let index = -1;

      if(tagsId == null){
        index = menu.findIndex(item => JSON.parse(item).menuId == menuId);
      }else{
        index = menu.findIndex(item => JSON.parse(item).menuId == menuId && JSON.parse(item).nowTags[0].tagsId == tagsId);
      }
       
      index != -1 ? this.$store.commit("removeMenu", index) : "";

    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 刚进入页面时设置其选中的导航标签
    if(this.$route.query.select != undefined && this.$route.query.select != ""){
      this.activeKey = this.$route.query.select;
    }
  },
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
<style scoped>

.nav-of-close{
  background-color: rgba(255, 255, 255, 0.8);
}

/* 清除ant默认的margin-bottom */
.ant-tabs ::v-deep .ant-tabs-bar{
  margin: 0px;
}

</style>
