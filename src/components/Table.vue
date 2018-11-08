<template>
  <div>
    <table>
      <thead>
      <tr>
        <th  :key="index + 'h'" v-for="(key, index) in Object.keys(data[0])">
          {{ key.replace(/_/g, ' ').toLowerCase()}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr :key="index + 'r'" v-for="(row, index) in data">
        <td :key="index + 'd'" v-for="(value, index) in Object.values(row)">
          {{value}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
  computed: {
    ...mapState({}),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
  },
  watch: {
    data() {
      console.log(this.$props.data);
    },
  },
};
</script>

<style scoped>
thead {
  background: bisque;
}
th {
  text-transform: capitalize;
  font-size: 1.2em;
  padding: 10px 20px;
}
tbody tr:nth-child(1n) {
  background: white;
}

tbody tr:nth-child(2n) {
  background: lightgrey;
}
</style>
