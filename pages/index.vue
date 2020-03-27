<template>
  <div class="container">
    <div class="columns">
      <div class="column ac-cont">
        <Autocomplete :suggestions="countries" @selection="searchCountry" />
      </div>
    </div>
    <h1 class="title media-right">Global Stats</h1>
    <div class="columns all">
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.total_cases}}</p>
          <p class="subtitle">Cases</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.total_recovered}}</p>
          <p class="subtitle">Recovered</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.total_deaths}}</p>
          <p class="subtitle">Deaths</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
    </div>
    <div class="hint">* click country name to see details</div>
    <div class="table-container">
      <table class="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>New Cases</th>
            <th>Total deaths</th>
            <th>New Deaths</th>
            <th>Recovered</th>
            <th>Active</th>
            <th>Critical</th>
            <th>Cases/1Million</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="country.country_name" v-for="country of filtered">
            <td><nuxt-link :to="'/'+country.country_name">{{country.country_name}}</nuxt-link></td>
            <td>{{country.cases}}</td>
            <td :class="{'cases-today': !!+country.new_cases.replace(/,/g, '')}">{{country.new_cases}}</td>
            <td>{{country.deaths}}</td>
            <td :class="{'death': !!+country.new_deaths.replace(/,/g, '')}">{{country.new_deaths}}</td>
            <td>{{country.total_recovered}}</td>
            <td>{{country.active_cases}}</td>
            <td>{{country.serious_critical}}</td>
            <td>{{country.total_cases_per_1m_population}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script>
import axios from '../plugins/axios';
import Chart from '../components/Chart';
import Autocomplete from '../components/Autocomplete';
import Loader from '../components/Loader';
import Header from '../components/Header';

export default {
  components: {
    Chart,
    Autocomplete,
    Loader,
    Header
  },
  data() {
    return {
      res: {},
      countries: [],
      allCases: [],
      filtered: [],
      value: '',
      loading: false,
    }
  },
  async asyncData() {
    const res = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php').then(resp => {
      return resp.data;
    });
    const countries = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php').then(resp => {
      return resp.data.affected_countries;
    });

    const allCases = await axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php').then(resp => {
      return resp.data.countries_stat;
    });

    return { res, countries, allCases, filtered: allCases };
    
  },
  methods: {
    searchCountry(country) {
      this.filtered = this.allCases.filter(count => count.country_name.indexOf(country) > -1);
    }
  }
}
</script>

<style scoped>

.hint {
  font-style: italic;
  font-weight: 600;
}

a {
  color: var(--color);
}
a:hover {
  text-decoration: underline;
}

.loader-cont {
  display: flex;
  justify-content: center;
}

.ac-cont {
  display: flex;
  justify-content: center;
}

div.all {
  padding: 1rem;
}

.table td, .table th {
  vertical-align: middle;
  background-color: var(--table-bg);
  color: var(--card-color);
  transition: background-color 300ms, color 500ms;
}
.card {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-radius: 4px;
  background-color: var(--card-bg);
  color: var(--card-color);
  transition: opacity 300ms, background-color 500ms;
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
  background-color: red !important;
  color: white;
}
.cases-today {
  background-color: rgb(238, 152, 73) !important;
  color: white;
}
.current-country {
  background-color: #ccc;
}

.title {
  color: var(--card-color);
  transition: color 500ms;
}
.subtitle {
  color: var(--card-color);
  transition: color 500ms;
}

.loader {
  position: absolute;
  top: 10px;
  right: 15px;
}

</style>
