<template>
   <div id="selector">
        <div>
            <p @click="toggle" class="display">{{label}}<span class="chevron">&laquo;</span></p>
        </div>
        <div v-show="toggled" class="options">
            <ul>
                <li @click="setSelected(option.id, option.text)" v-bind:class="[ option.id === selected ? 'selected': '' ]" v-for="option in options" v-bind:key="option.id">{{option.text}}</li>
            </ul>
        </div>
        <input type="hidden" v-bind:value="selected" v-bind:name="name">
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Select",
  props: {
    msg: {
      type: String,
      default: "Please select an option"
    },
    name: {
      type: String,
      default() { 
        console.error('Select missing name.');
        return '';
      }
    },
    options: {
      type: Array,
      default() {
          console.error('Select missing options.'); 
          return []; 
        }
    },
  },
  components: {},
  data() {
    return {
        toggled: false,
        selected: '',
        label: '',
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    toggle() {
        this.$data.toggled = !this.$data.toggled;
    },
    prepItems() {
        this.$data.items = this.$props.options;
    },
    setSelected(id, text) {
        this.$data.selected = id;
        this.$data.label = text;
    },
    setLabel() {
        this.$data.label = this.$props.msg;
    },
    ...mapActions([])
  },
  watch: {
    propName: function() {},
  },
  mounted() {
      this.setLabel();
  }
};
</script>

<style scoped>

  #selector {
    position: relative;
  }

  #selector > * {
    font-size: 1.5em;
    margin: 0.5em;
    padding: 0.2em;
    border: 1px solid lightgrey;
    text-align: left; 
  }

  #selector .display {
    margin: 0;
    color: #75757d;
  }

  #selector ul li {
    padding: 10px 20px;
    margin: 5px;
    border: 1px solid lightgrey;
  }

  .options {
    position: absolute;
    background: white;
    left: 0;
    right: 0;
    top: 30px;
    z-index: 1;
  }

  .options > ul {
    list-style-type: none;
    margin: 0;
    padding: 5px;
    max-height: 200px;
  }

  .chevron {
    transform: rotate(-90deg);
    display: inline-block;
    float: right;
    margin-right: 15px;
  }

  .selected {
      background: teal;
  }

</style>
