<template>
  <div class="container">
    <header>
      <h1 class="header">Covid-19 Updates</h1>
    </header>
    <div class="columns">
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.cases.toLocaleString()}}</p>
          <p class="subtitle">Cases</p>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.deaths.toLocaleString()}}</p>
          <p class="subtitle">Deaths</p>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.recovered.toLocaleString()}}</p>
          <p class="subtitle">Recovered</p>
        </div>
      </div>
    </div>
      <table class="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Country</th>
            <th>Cases</th>
            <th>Cases Today</th>
            <th>Total deaths</th>
            <th>Deaths Today</th>
            <th>Recovered</th>
            <th>Active</th>
            <th>Critical</th>
            <th>Cases/1Million</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="country.countryInfo._id" v-for="country of countries">
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}"><img class="flag" :src="country.countryInfo.flag" :alt="country.country"/></td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.country}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.cases.toLocaleString()}}</td>
            <td :class="{'cases-today': !!country.todayCases, 'current-country': country.countryInfo.iso2 === userCountry}">{{country.todayCases.toLocaleString()}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.deaths.toLocaleString()}}</td>
            <td :class="{'death': !!country.todayDeaths, 'current-country': country.countryInfo.iso2 === userCountry}">{{country.todayDeaths.toLocaleString()}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.recovered.toLocaleString()}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.active.toLocaleString()}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.critical.toLocaleString()}}</td>
            <td :class="{'current-country': country.countryInfo.iso2 === userCountry}">{{country.casesPerOneMillion.toLocaleString()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      res: {},
      countries: [],
      userCountry: ''
    }
  },
  async asyncData() {
    const res = await axios.get('https://corona.lmao.ninja/all').then(resp => {
      return resp.data;
    });
    const countries = await axios.get('https://corona.lmao.ninja/countries').then(resp => {
      return resp.data;
    });

    const userCountry = await axios.get('http://ip-api.com/json').then(resp => {
      return resp.data.countryCode;
    });

    return { res, countries, userCountry };
    
  }
}
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
header {
  margin-bottom: 30px;
}
.header {
  font-size: 3rem;
}
.card {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  margin: 10px;
}
 .flag {
   width: 50px;
 }
 table {
   position: relative;
   /* border-collapse: collapse; */
 }
 th {
  background: white;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #ccc;
}
.death {
  background-color: red;
  color: white;
}
.cases-today {
  background-color: rgb(238, 152, 73) !important;
  color: white;
}
.current-country {
  background-color: #ccc;
}

</style>
