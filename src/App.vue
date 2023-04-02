<template>
  <div class="container">
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from "@/components/Table.vue";

export default defineComponent({
  name: 'App',
  components: {
    Table,
  }
});
</script>

<style>
 .container {
   width: 1500px;
   margin: 50px auto 0 auto;
 }
</style>
