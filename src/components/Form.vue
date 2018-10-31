<template>
    <div id="form">
      <form>
        <input type="text" value="" placeholder="First Name" autofocus required/>
        <input type="text" value="" placeholder="Last Name"/>
        <input type="text" value="" placeholder="Date Of Birth"/>
      </form>
      <form>
        <input type="phone" value="" placeholder="Phone Number"/>
        <Select :name='type_id' :msg="'Select phone type'" :options="[{id:1, text: 'Primary'},{id:2, text: 'Secondary'},{id:3, text: 'Home'}]" />
      </form>
      <form>
        <input type="email" value="" placeholder="Email"/>
        <Select :name='type_id' :msg="'Select email type'" :options="[{id:1, text: 'Primary'},{id:2, text: 'Secondary'},{id:3, text: 'Home'}]" />
      </form>
      <form>
        <input type="text" value="" placeholder="Address 1"/>
        <input type="text" value="" placeholder="Address 2"/>
        <input type="text" value="" placeholder="City"/>
        <input type="text" value="" placeholder="State"/>
        <input type="text" value="" placeholder="Zip"/>
        <Select :name='type_id' :msg="'Select address type'" :options="[{id:1, text: 'Primary'},{id:2, text: 'Secondary'},{id:3, text: 'Home'}]"/>
      </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Select from "@/components/Select.vue";

export default {
  name: "Form",
  props: {
    example: {
      type: String,
      default: "all"
    },
  },
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
