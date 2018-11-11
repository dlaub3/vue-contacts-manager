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
      <tr :key="index + 'r'" v-for="(row, index) in tableRows">
        <td :key="index + 'd'" v-for="(key, index) in columns">
          <!-- <Table :layout="'vertical'" :columns="columnsMap[key]" :data="row[key]" v-if="row[key].constructor === Array" /> -->
          <router-link :to="'/contact/' + row.id">{{row[key]}}</router-link>
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
    columns: {
      type: Array,
      default() {
        return [
          'id',
          'first_name',
          'last_name',
          'date_of_birth',
          // 'email_addresses',
          // 'phone_numbers',
          // 'addresses',
        ];
      },
    },
    layout: {
      type: String,
      default: 'horizontal',
    },
  },
  data() {
    return {
      rows: this.data,
      columnsMap: {
        email_addresses: ['id', 'email_address', 'type_id'],
        phone_numbers: ['id', 'phone_number', 'type_id'],
        addresses: [
          'id',
          'address_1',
          'address_2',
          'city',
          'state',
          'zip',
          'country',
          'type_id',
        ],
      },
    };
  },
  components: {},
  computed: {
    tableRows: {
      get() {
        return this.rows;
      },
    },
    ...mapState({}),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
  },
  watch: {},
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
