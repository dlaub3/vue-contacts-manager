<template>
  <div id="search">
    <form>
        <input 
          v-model="firstName"
          placeholder="First Name" 
          type="text"
        />
        <input 
          v-model="lastName"
          placeholder="Last Name" 
          type="text" 
        />
    </form>
      <button @click="search">Search</button>
    <Table v-if="data" :data="data" />
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import Table from '@/components/Table.vue';
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
      firstName: '',
      lastName: '',
      data: false,
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
    Table,
  },
  methods: {
    async search() {
      let firstName = this.$data.firstName;
      let lastName = this.$data.lastName;
      let data = { firstName, lastName };
      data = await searchAPI(data);
      this.$data.data = JSON.parse(data);
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
