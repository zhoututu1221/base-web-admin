<!-- 自定义搜索框 -->
<template>
  <div class="search">
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
          <a-select-option v-show="searchHistory.length == 0" key="" value=""
            ><a-empty
              class="empty"
              v-show="searchHistory.length == 0"
              description="搜索历史为空"
          /></a-select-option>
          <a-select-option
            v-show="searchHistory.length != 0"
            v-for="(item, index) in searchHistory"
            :key="index"
            :value="item"
            ><font>{{ item }}</font
            ><a-icon
              class="close-now-history"
              type="close"
              @click="closeNowHistory(item)"
          /></a-select-option>
        </a-select-opt-group>
      </template>
      <a-input-search
        v-model="searchText"
        v-if="clientWidth <= 768"
        allow-clear
        placeholder="请输入您的搜索内容"
        @search="onSearch"
      />
      <a-input-search
        v-model="searchText"
        v-if="clientWidth > 768"
        allow-clear
        enter-button
        placeholder="请输入您的搜索内容"
        @search="onSearch"
      />
    </a-auto-complete>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      clientWidth: 0,
      clientHeight: 0,
      searchHistory: [],
      searchText: "",
    };
  },
  // 父元素的属性
  props: [],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    clientWidth(val) {
      // console.log(val);

      // 屏幕自适应显示隐藏菜单
      if (val > 992) {
        // console.log(val);
      } else if (val > 768 && val < 992) {
        // console.log(val);
      } else {
        // console.log(val);
      }
    },
    clientHeight(val) {
      // console.log(val);
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
      if (val == "") {
        this.$message.warning("请输入搜索内容");
      } else {
        // 如果原来存在该搜索历史，则清除它
        this.searchHistory = this.searchHistory.filter((item) => item != val);
        this.searchHistory.unshift(val);
        // 最多展示六条记录
        this.searchHistory = this.searchHistory.slice(0, 6);
      }
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
<style scoped>
.search {
  width: 100%;
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

/* 搜索历史为空 */
.empty {
  opacity: 0.7;
  margin: 10px auto 20px auto;
}

/* 平板模式 */
@media (min-width: 768px) and (max-width: 992px) {
}

/* 手机模式 */
@media (max-width: 768px) {
  .empty {
    margin: 10px auto 20px -20px;
  }
}
</style>
