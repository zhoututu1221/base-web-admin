import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumb from './breadcrumb'
import navOfClose from './navOfClose'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    breadcrumb,
    navOfClose,
  }
})
