<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="container dp-flex">
        <div class="navbar-brand">
          <nuxt-link to="/" class="navbar-item header">
            Covid-19 Updates
          </nuxt-link>
        </div>
        <div class="dark-mode-switch">
          <div class="navbar-end">
            <DarkModeSwitcher :switchTo="switchTo" :isDark="isDark" @toggle="switchMode" />
            <!-- <a class="navbar-item dark-mode-btn" @click="switchMode">Switch to {{switchTo}} Mode</a> -->
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import DarkModeSwitcher from "@/components/DarkModeSwitcher";

export default {
  components: {
    DarkModeSwitcher
  },
  data() {
    return {
      switchTo: 'Dark',
      isDark: false,
    }
  },
  beforeMount() {
    this.initialSwitchMode();
  },
  methods: {
    initialSwitchMode() {
      this.isDark = JSON.parse(localStorage.getItem('isDark'));
      const elem = document.getElementById('root');
      const body = document.getElementsByTagName('body')[0];
      if (this.isDark) {
        this.switchTo = 'Light';
        elem.classList.replace('light', 'dark');
        body.classList.add('dark');
      } else if (this.isDark !== null && !this.isDark) {
        this.switchTo = 'Dark';
        body.classList.add('light');
      }
    },
    switchMode(checked) {
      const elem = document.getElementById('root');
      const body = document.getElementsByTagName('body')[0];
      if (!checked) {
        this.switchTo = 'Dark';
        this.isDark = false;
        elem.classList.replace('dark', 'light');
        body.classList.replace('dark', 'light');
      } else {
        this.switchTo = 'Light';
        this.isDark = true;
        elem.classList.replace('light', 'dark');
        body.classList.replace('light', 'dark');
      }
      localStorage.setItem('isDark', this.isDark);
      localStorage.setItem('switchTo', this.switchTo);
    },
  }
}
</script>

<style scoped>

.dark-mode-switch {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.hero-head {
  margin-bottom: 2rem;
}

.navbar-item {
  color: var(--color);
  transition: color 500ms;
}

.navbar {
  background-color: var(--bg);
  transition: background-color 300ms;
}

.header {
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 800;
}


.dark-mode-btn {
  margin: 0 30px 0;
  cursor: pointer;
}
.dp-flex {
  display: flex !important;
}
</style>
