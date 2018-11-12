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
    <Table v-if="data.length !== 0" :data="data" />
    <div v-if="data.length < 1">
      {{message}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { searchAPI } from '@/lib/api';
import Table from '@/components/Table.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'SearchForm',
  components: {
    Table,
  },
  props: {},
  data() {
    return {
      message: '',
      first_name: '',
      last_name: '',
    };
  },
  computed: {
    ...mapState({
      data: state => state.data,
      page: state => state.page,
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
  methods: {
    ...mapActions(['setState', 'appendState']),
    setSelected(selected) {
      this.$data.selectedOption = selected;
    },
    setProps(data) {
      if (data.objects.length === 0) {
        this.message = 'No Results Found';
      } else {
        this.message = '';
      }
      let payload = { key: 'page', data: data.page + 1 };
      this.setState(payload);
    },
    async search() {
      let query = JSON.stringify(this.query);
      query = `q={"filters":${query}}`;
      let data = await searchAPI(query);
      let payload = { key: 'data', data: data.objects };
      this.setState(payload);
      this.setProps(data);
    },
    async loadMore() {
      if (this.data.length === 0) {
        return;
      }
      let query = JSON.stringify(this.query);
      query = `q={"filters":${query}}&page=${this.page}`;
      let data = await searchAPI(query);
      let payload = { key: 'data', data: data.objects };
      this.appendState(payload);
      this.setProps(data);
    },
    handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.loadMore();
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
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
