<template>
   <div id="selector">
        <div>
            <p @click="toggle" class="display">{{ selected.text || message }}<span class="chevron">&laquo;</span></p>
        </div>
        <div v-show="toggled" class="options">
            <ul>
                <li 
                  v-bind:class="[ option.id === selected.id ? 'selected': '' ]"
                  v-for="option in options" 
                  v-bind:key="option.id"
                  @click="$emit('option-selected', option.id), toggle()" 
                >{{option.text}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'Select',
  props: {
    message: {
      type: String,
      default: 'Please select an option',
    },
    options: {
      type: Array,
      default() {
        console.error('Select missing options.');
        return [];
      },
    },
    selectedOption: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    selected: {
      get() {
        return this.options.filter(o => o.id === this.selectedOption)[0] || {};
      },
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    toggle() {
      this.$data.toggled = !this.$data.toggled;
    },
  },
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
}

#selector ul li {
  padding: 5px 20px;
  margin: 5px;
  border: 1px solid lightgrey;
  background: white;
}

.options {
  position: absolute;
  background: #fbfbfb;
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

#selector .selected {
  background: var(--color-green);
  color: white;
}
</style>
