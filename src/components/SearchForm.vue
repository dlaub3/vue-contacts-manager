<template>
  <div id="search">
    <div>
      <form>
          <input 
            v-model="first_name"
            placeholder="First Name" 
            type="text"
          />
          <input 
            v-model="last_name"
            placeholder="Last Name" 
            type="text" 
          />
      </form>
        <button class="focus" @click="search">Search</button>
    </div>
    <Table v-if="data.length >= 1" :data="data" />
    <div v-if="data.length < 1">
      No Results Found
    </div>
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
      first_name: '',
      last_name: '',
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
  computed: {
    ...mapState({
      data: state => state.data,
    }),
    query: {
      get() {
        return [
          { name: 'first_name', op: 'ilike', val: `%${this.first_name}%` },
          { name: 'last_name', op: 'ilike', val: `%${this.last_name}%` },
        ];
      },
    },
  },
  components: {
    Table,
  },
  methods: {
    ...mapActions(['setState']),
    async search() {
      let query = JSON.stringify(this.query);
      let data = await searchAPI(query);
      let payload = { key: 'data', data: data.objects };
      this.setState(payload);
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
