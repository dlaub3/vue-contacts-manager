<template>
    <form>
        <input type="phone" v-model="phoneNumber" @change="updatePerson" value="" placeholder="Phone Number"/>
        <Select :name="'type_id'" :msg="'Select phone type'" :options="[{id:1, text: 'Primary'},{id:2, text: 'Secondary'},{id:3, text: 'Home'}]" />
    </form>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Select from "@/components/Select.vue";

export default {
  name: "PhoneNumberForm",
  props: {
  },
  components: {
    Select,
  },
  data() {
    return {
      phoneNumber: ''
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    ...mapActions(["updatePerson"])
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
