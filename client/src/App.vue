<template>
  <body>
    <div class="app">
      <div
        class="d-flex justify-content-center align-items-center p-3 fs-2 text-white bg-dark"
      >
        Pushh Notification
      </div>
      <div class="categories d-flex justify-content-center align-items-center flex-column">
        <CategoryItem
          :category="category"
          v-for="category in categoryList"
          :key="category.id"
        />
      </div>
    </div>
  </body>
</template>

<script>
import CategoryItem from "./components/CategoryItem";
import axios from "axios"
export default {
  name: "App",
  data(){
    return {
      categoryList:[],
      serviceWorker:null,
    }
  },
  components: {
    CategoryItem,
  },
  async created(){
    axios.get("http://localhost:3000").then(res=>{
      this.categoryList=res.data.categoryList;
    });

  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  min-width: 100vh;
  background: rebeccapurple;
}
</style>
