<template>
  <div>
    <h1>Page Not Found :( </h1>
  </div>
</template>
<script>
export default {
  name: 'pageNotFound',
  created() {
    window.location.href = '/#/page-not-found';
  },
};
</script>
