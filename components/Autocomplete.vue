<template>
<div class="autocomplete">
    <input class="form-control" type="text" v-model="value"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
        placeholder="Search for a country..."
    />
    <div class="dropdown-menu" v-bind:class="{'open': openSuggestion}">
      <div class="dropdown-content">
        <a v-for="(suggestion, index) in matches"
            v-bind:class="{'active': isActive(index)}"
            @click="suggestionClick(index)"
            :key="suggestion"
            class="dropdown-item"
            href="#">{{ suggestion }}
        </a>
      </div>
    </div>
</div>
</template>


<script>

export default {
    data() {
      return {
        open: false,
        current: 0,
        value: ''
      }
    },
    props: {
        suggestions: {
            type: Array,
            required: true
        }
    },
    computed: {
      matches() {
        return this.suggestions.filter((str) => {
            return str.indexOf(this.value) >= 0;
        });
      },
      openSuggestion() {
        return this.value !== "" &&
                this.matches.length != 0 &&
                this.open === true;
      }
    },
    methods: {
      enter() {
        if (!this.value) {
          return;
        }
        this.$emit('selection', this.matches[this.current]);
        this.value = this.matches[this.current];
        this.open = false;
      },
      up() {
        if (!this.value) {
          return;
        }
        if(this.current > 0) {
          this.current--;
        }
      },
      down() {
        if (!this.value) {
          return;
        }
        if(this.current < this.matches.length - 1) {
          this.current++;
        }
      },
      isActive(index) {
          return index === this.current;
      },
      change() {
        if (this.open == false) {
          this.open = true;
          this.current = 0;
        }
      },
      suggestionClick(index) {
        this.$emit('selection', this.matches[index]);
        this.value = this.matches[index]
        this.open = false;
      },
    }
}
</script>

<style scoped>
.autocomplete {
  position: relative;
  margin-bottom: 40px;
}
input {
  background-color: var(--card-bg);
  height: 40px;
  width: 20rem;
  color: var(--color);
  font-size: 18px;
  border: var(--autocomplete-border);
  border-radius: 4px;
  padding: 20px;
  transition: background-color 300ms, color 500ms, border 300ms, outline-color 100ms;
}
input:focus {
  outline-color: var(--color);
}
input::placeholder {
  color: var(--color);
}
.open {
  display: block;
}
.active {
  background-color: whitesmoke;
  color: #0a0a0a !important;
}
.dropdown-menu {
  right: 0;
}
.dropdown-content {
  background-color: var(--card-bg);
}
.dropdown-item {
  color: var(--color);
}
</style>