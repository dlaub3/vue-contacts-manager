<template>
    <div></div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Example",
  props: {
    example: {
      type: String,
      default: "all"
    },
  },
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
    example() {}
  },
  methods: {
    example() {
    },
    ...mapActions([])
  },
  watch: {
    propName: function() {},
  },
  mounted() {}
};
</script>

<style scoped>

</style>
