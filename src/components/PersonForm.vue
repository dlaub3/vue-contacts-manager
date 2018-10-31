<template>
    <form>
        <input type="text" value="" placeholder="First Name" autofocus required/>
        <input type="text" value="" placeholder="Last Name"/>
        <input type="text" value="" placeholder="Date Of Birth"/>
    </form>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Select from "@/components/Select.vue";

export default {
  name: "PersonForm",
  props: {},
  components: {
    Select,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([])
  },
  watch: {
    propName: function() {},
  },
  mounted() {}
};
</script>

<style scoped>
  #form {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  input, select {
    font-size: 1.5em;
    margin: 0.5em;
    padding: 0.2em; 
    display: block;
    border: 1px solid lightgrey;
  }

  select > option {
    width: 400px;
  }

  form {
    margin: 0 auto;
  }

</style>
