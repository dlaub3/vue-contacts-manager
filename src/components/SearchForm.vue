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
    <div class="message" v-if="message">
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
      total_pages: '',
    };
  },
  computed: {
    ...mapState({
      data: state => state.data,
      page: state => state.page,
    }),
    query: {
      get() {
        return JSON.stringify([
          { name: 'first_name', op: 'ilike', val: `%${this.first_name}%` },
          { name: 'last_name', op: 'ilike', val: `%${this.last_name}%` },
        ]);
      },
    },
    canQueryMore: {
      get() {
        let page = this.page;
        let data = this.first_name + this.last_name;
        return data.trim() !== '' && page >= 2;
      },
    },
  },
  methods: {
    ...mapActions(['setState', 'appendState']),
    setSelected(selected) {
      this.$data.selectedOption = selected;
    },
    setProps(data) {
      this.total_pages = data.total_pages;
      if (!data.objects.length) {
        this.message = 'No Results Found';
      } else {
        this.message = '';
      }
      let payload = { key: 'page', data: data.page + 1 };
      this.setState(payload);
    },
    async search() {
      let query = `q={"filters":${this.query}}`;
      let data = await searchAPI(query);
      let payload = { key: 'data', data: data.objects };
      this.setState(payload);
      this.setProps(data);
    },
    async loadMore() {
      if (!this.canQueryMore || this.total_pages <= this.page) {
        this.message = 'No Further Results Found';
        return;
      }
      let query = `q={"filters":${this.query}}&page=${this.page || 2}`;
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

.message {
  margin: 50px;
}
</style>
