<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Form />
  </div>
</template>

<script>
// @ is an alias to /src
import Form from "@/components/Form.vue";
// import Select from "@/components/Select.vue";

export default {
  name: "home",
  components: {
    Form
  }
};
</script>
