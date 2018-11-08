<template>
  <div id="search">
    <form>
        <input 
          v-model="form.firstName"
          placeholder="First Name" 
          type="text" autofocus required 
          @keyup="updateProp({propkey: 'personForm', value: form})"
        />
        <input 
          v-model="form.lastName"
          placeholder="Last Name" 
          type="text" 
        />
        <input 
          v-model="form.dateOfBirth"
          placeholder="Date Of Birth" 
          type="text" 
          @keyup="updateProp({propkey: 'personForm', value: form})"
        />
    </form>
      <button @click="search">Search</button>
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import formStyles from './formStyles.scss';
import { searchAPI } from '@/lib/api';

export default {
  name: 'SearchForm',
  props: {},
  data() {
    return {
      searchWord: '',
      selectedOption: 1,
      options: [
        {
          id: 1,
          text: 'All',
        },
        {
          id: 2,
          text: 'First Name',
        },
        {
          id: 3,
          text: 'Last Name',
        },
        {
          id: 4,
          text: 'Date Of Birth',
        },
        {
          id: 5,
          text: 'Email Address',
        },
        {
          id: 6,
          text: 'Phone Number',
        },
        {
          id: 7,
          text: 'Address',
        },
      ],
    };
  },
  components: {
    Select,
  },
  methods: {
    async search() {
      let type = this.$data.selectedOption;
      let string = this.$data.searchWord;
      let data = { type, string };
      data = await searchAPI(data);
      console.log(data);
    },
    setSelected(selected) {
      this.$data.selectedOption = selected;
    },
  },
};
</script>

<style scoped>
#search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
