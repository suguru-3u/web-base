<template>
  <h1>Checking the operation of cors</h1>
  <button @click="corsSimpleRequest()">Simple Request button</button>
  <button @click="corsPreflightRequest()">Preflight Request button</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup: () => {
    const corsSimpleRequest = async () => {
      try {
        console.log("SimpleRequest start");
        const url = "http://localhost:5000/simple-request";
        const res = await fetch(url);
        console.log("SimpleRequest result:", res);
      } catch (e) {
        console.log("エラー発生:", e);
      }
    };
    const corsPreflightRequest = async () => {
      try {
        console.log("PreflightRequest start");
        const url = "http://localhost:5000/preflight-request";
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "PreflightRequest",
          }),
        };
        const res = await fetch(url, option);
        console.log("PreflightRequest result:", res);
      } catch (e) {
        console.log("エラー発生:", e);
      }
    };
    return { corsSimpleRequest, corsPreflightRequest };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
