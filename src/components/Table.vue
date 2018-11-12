<template>
  <div class="container">
    <table :class="layout">
      <thead>
      <tr>
        <th :key="index" v-for="(header, index) in columns">
          {{header.replace(/_/g, ' ')}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr :key="index + 'r'" v-for="(row, index) in data">
        <td :key="index + 'd'" v-for="(key, index) in columns">
          <router-link :to="'/contact/' + row.id">{{row[key]}}</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Table',
  props: {
    columns: {
      type: Array,
      default() {
        return ['id', 'first_name', 'last_name', 'date_of_birth'];
      },
    },
    layout: {
      type: String,
      default: 'horizontal',
    },
  },
  computed: {
    ...mapState({
      data: state => state.data,
    }),
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
thead {
  background: #41b883;
  color: #fff;
}
th {
  text-transform: capitalize;
  font-size: 1.2em;
  padding: 10px 20px;
}

tbody tr td {
  padding: 10px 20px;
}

tbody tr:nth-child(1n) {
  background: white;
}

tbody tr:nth-child(2n) {
  background: #2c3e50;
}

tbody tr a {
  transition: all 0.3s;
  cursor: pointer;
}

tbody tr a:hover {
  font-size: 1.2em;
  cursor: pointer;
}

tbody tr:nth-child(1n) a {
  color: #2c3e50;
}

tbody tr:nth-child(2n) a {
  color: white;
}

.vertical {
  display: flex;
}

.vertical thead tr {
  display: flex;
  flex-direction: column;
}

.vertical tbody tr {
  display: flex;
  flex-direction: column;
}

.vertical tbody tr td {
  display: flex;
}
</style>
