<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* 滚动条美化 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  /* background: white; */
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  transition: color 0.2s ease;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}


/* 自定义消息框 */
.el-message{
  z-index: 3000 !important;
  background-color: white !important;
  padding: 10px 20px !important;
  border: none !important;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  min-width: auto !important;
}
.el-message__content{
  font-size: 12px !important;
  color: rgba(0, 0, 0, 0.6) !important;
}

</style>
