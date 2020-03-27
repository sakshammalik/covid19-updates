<template>
  <div id="root" class="light">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
}
</script>

<style>

body, div#root {
  background-color: var(--bg);
  color: var(--color);
  transition: background-color 300ms, color 500ms;
  min-height: 100%;
}

.dp-flex {
  display: flex;
}

:root {
  --bg: #ffffff;
  --color: #121212;
  --card-bg: #ffffff;
  --table-bg: #ffffff;
  --card-color: #121212;
  --hover-color: whitesmoke;
  --autocomplete-border: 1px solid #747171;
}


.light {
  --bg: #ffffff;
  --color: #121212;
  --card-bg: #ffffff;
  --table-bg: #ffffff;
  --card-color: #121212;
  --hover-color: whitesmoke;
  --autocomplete-border: 1px solid #747171;
}

.dark {
  --bg: #121212;
  --color: #ffffff;
  --card-bg: #727070;
  --table-bg: #3e3d3d;
  --card-color: #ffffff;
  --hover-color: #7b7a7a;
  --autocomplete-border: none
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
