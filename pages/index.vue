<template>
  <div class="container">
    <header>
      <h1 class="header">Covid-19 Updates</h1>
      <span class="dark-mode-btn" @click="switchMode">Switch to {{switchTo}} Mode</span>
    </header>
    <div class="columns">
      <div class="column ac-cont">
        <Autocomplete :suggestions="countries" @selection="searchCountry" />
      </div>
    </div>
    <h1 class="title media-right">{{currentCountry + ' Stats'}}</h1>
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
    <div v-if="currentCountry !== 'Global'" class="columns all">
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.new_cases}}</p>
          <p class="subtitle">New Cases</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.active_cases}}</p>
          <p class="subtitle">Active Cases</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.new_deaths}}</p>
          <p class="subtitle">New Deaths</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
    </div>
    <div v-if="currentCountry !== 'Global'" class="columns all">
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.serious_critical}}</p>
          <p class="subtitle">Serious Critical</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
      <div class="column card">
        <div class="card-content">
          <p class="title">{{res.total_cases_per1m}}</p>
          <p class="subtitle">Total Cases Per 1 Million</p>
          <div v-if="loading" class="loader"></div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loader-cont">
      <Loader />
    </div>
    <div v-if="totalCasesChartData" class="columns">
      <div class="column">
        <Chart :chartdata="totalCasesChartData" :options="chartOptions" :key="totalCasesKey"/>
      </div>
      <div class="column">
        <Chart :chartdata="newCasesChartData" :options="chartOptions" :key="newCasesKey"/>
      </div>
    </div>
    <div v-if="totalCasesChartData" class="columns">
      <div class="column">
        <Chart :chartdata="totalRecoveredChartData" :options="chartOptions" :key="totalRecoveredKey"/>
      </div>
      <div class="column">
        <Chart :chartdata="totalDeathsChartData" :options="chartOptions" :key="totalDeathsKey"/>
      </div>
    </div>
    <div v-if="!totalCasesChartData" class="table-container">
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
          <tr :key="country.country_name" v-for="country of allCases">
            <td>{{country.country_name}}</td>
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

export default {
  components: {
    Chart,
    Autocomplete,
    Loader
  },
  data() {
    return {
      res: {},
      countries: [],
      allCases: [],
      currentCountry: 'Global',
      switchTo: 'Dark',
      isDark: false,
      totalCasesKey: 'totalCasesKey',
      newCasesKey: 'newCasesKey',
      totalRecoveredKey: 'totalRecoveredKey',
      totalDeathsKey: 'totalDeathsKey',
      totalCasesChartData: null,
      newCasesChartData: null,
      totalRecoveredChartData: null,
      totalDeathsChartData: null,
      value: '',
      loading: false,
      chartOptions: {
            responsive: true,
            lineTension: 1,
            tooltips: {
              mode: 'nearest'
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  padding: 5,
                }
              }]
            }
          }
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

    return { res, countries, allCases };
    
  },
  beforeMount() {
    this.initialSwitchMode();
  },
  methods: {
    switchMode() {
      const elem = document.getElementById('root');
      const body = document.getElementsByTagName('body')[0];
      if (this.isDark) {
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
    async searchCountry(country) {
      this.loading = true;
      this.currentCountry = country;
      const data = await axios({
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php',
      params: {
        country
      }
      }).then(resp => {
        const statsByCountry = resp.data.stat_by_country;
        let totalCases = {};
        let newCases = {};
        let totalRecovered = {};
        let totalDeaths = {};
        statsByCountry.forEach(stat => {
          let date = new Date(stat.record_date).toLocaleDateString();
          if (totalCases[date]) {
            totalCases[date] = stat.total_cases.replace(/,/g, '');
          } else if (newCases[date]) {
            newCases[date] = stat.new_cases.replace(/,/g, '');
          } else if (totalRecovered[date]) {
            totalRecovered[date] = stat.total_recovered.replace(/,/g, '');
          } else if (totalDeaths[date]) {
            totalDeaths[date] = stat.total_deaths.replace(/,/g, '');
          } else {
            totalCases = {
              ...totalCases,
              [date]: stat.total_cases.replace(/,/g, '')
            };
            newCases = {
              ...newCases,
              [date]: stat.new_cases.replace(/,/g, '')
            };
            totalRecovered = {
              ...totalRecovered,
              [date]: stat.total_recovered.replace(/,/g, '')
            };
            totalDeaths = {
              ...totalDeaths,
              [date]: stat.total_deaths.replace(/,/g, '')
            };
          }
        });
        return { totalCases, newCases, totalRecovered, totalDeaths };
    });


    this.totalCasesChartData = {
        labels: Object.keys(data.totalCases),
        datasets: [
          { // one line graph
            label: 'Total Cases',
            data: Object.values(data.totalCases),
            backgroundColor: '#69779b73',
            borderColor: '#69779b',
            borderWidth: 3
          }
        ]
      };

    this.newCasesChartData = {
        labels: Object.keys(data.newCases),
        datasets: [
          { // one line graph
            label: 'New Cases',
            data: Object.values(data.newCases),
            backgroundColor: '#fd701473',
            borderColor: '#fd7014',
            borderWidth: 3
          }
        ]
      };

    this.totalRecoveredChartData = {
        labels: Object.keys(data.totalRecovered),
        datasets: [
          { // one line graph
            label: 'Total Recovered',
            data: Object.values(data.totalRecovered),
            backgroundColor: '#3e363673',
            borderColor: '#3e3636',
            borderWidth: 3
          }
        ]
      };

    this.totalDeathsChartData = {
        labels: Object.keys(data.totalDeaths),
        datasets: [
          { // one line graph
            label: 'Total Deaths',
            data: Object.values(data.totalDeaths),
            backgroundColor: '#d7232373',
            borderColor: '#d72323',
            borderWidth: 3
          }
        ]
      };

    const stats = await axios({
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
      params: {
        country
        }
      }).then(resp => {
        return resp.data.latest_stat_by_country[0];
      });
    this.loading = false;
    this.res = stats;
    this.totalCasesKey = this.totalCasesKey + country;
    this.newCasesKey = this.newCasesKey + country;
    this.totalRecoveredKey = this.totalRecoveredKey + country;
    this.totalDeathsKey = this.totalDeathsKey + country;
    }
  }
}
</script>

<style scoped>

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
  background-color: var(--card-bg);
  color: var(--card-color);
}
header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.header {
  font-size: 3rem;
}
.dark-mode-btn {
  margin: 0 30px 0;
  cursor: pointer;
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
