<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 滚动条美化 */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  transition: color 0.2s ease;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
