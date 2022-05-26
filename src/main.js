import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import userRole from '../src/utils/userRole'
import { postCollection, getDocs } from "./firebase";
Vue.config.productionTip = false
Vue.mixin({
  data() {
    return {
      imageType: [
        { text: "Banner", value: "BANNER" },
        { text: "Fashion Photography", value: "FASHION" },
        { text: "Portrait", value: "PORTRAIT" },

      ],
      postData: [],
      urlBannerArray: []
    }

  },
  methods: {
    async getPostData() {
      let result = new Array();
      let data = await getDocs(postCollection);
      data.forEach((doc) => {
        let postData = doc.data();
        postData.id = doc.id;
        result.push(postData);
      });
      this.postData = result;
      let urlArray = new Array();
      for (let x of this.postData) {
        if (x.postType == "BANNER")
          urlArray.push({ src: x.postUrl, postType: x.postType })
      }
      this.urlBannerArray = urlArray;
    },

    isAdmin() {
      return userRole.isAdmin()

    }
  },
  created() {
    this.getPostData()
  }
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
