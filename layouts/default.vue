<template>
  <div id="root" class="light">
    <nuxt />
  </div>
</template>

<style>

div#root {
  background-color: var(--bg);
  color: var(--color);
  transition: background-color 300ms, color 500ms;
}

:root {
  --bg: #ffffff;
  --color: #121212;
  --card-bg: #ffffff;
  --card-color: #121212;
}


.light {
  --bg: #ffffff;
  --color: #121212;
  --card-bg: #ffffff;
  --card-color: #121212;
}

.dark {
  --bg: #121212;
  --color: #ffffff;
  --card-bg: #4f4f4f;
  --card-color: #ffffff;
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
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
