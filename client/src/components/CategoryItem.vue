<template>
  <div
    class="p-4 d-flex flex-column bg-dark mt-2 rounded w-50"
    :class="{ [category.class]: true }"
  >
    <span
      class="text-center text-warning d-flex justify-content-center align-items-center"
    >
      <i class="fab text-white" :class="{ [category.icon]: true }"></i>
      <span>{{ category.title }}</span>
    </span>
    <button class="btn btn-info mt-2" @click="subscribe">Subscribe</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      serviceWorker: null,
    };
  },
  props: ["category"],
  methods: {
    async subscribe() {
      console.log(this.category.id)
      this.serviceWorker = await navigator.serviceWorker.ready;
      const clientId = await this.serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BAUYMLtqiJu9K-x02hYi6MTSQTrmVHW8Tc9et8r9jJ-mIYTbu_1a4QfDrXT7tCp1Nq8lOzVmtzRWq-8E5mqAGvE",
      });
      console.log(clientId);
      let res = await axios.post(
        `http://localhost:3000/subscribe/${this.category.id}`,
        {
          subscriber: clientId,
        }
      );
      console.log(res);
    },
  },
  async created() {
    this.serviceWorker = await navigator.serviceWorker.register("./sw.js");
    console.log(this.serviceWorker);
  },
};
</script>

<style scoped>
.fab {
  font-size: 24px;
  padding: 10px;
}
</style>