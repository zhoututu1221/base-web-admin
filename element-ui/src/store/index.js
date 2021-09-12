import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumb from './breadcrumb'
import navLabel from './navLabel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    breadcrumb,
    navLabel,
  }
})
