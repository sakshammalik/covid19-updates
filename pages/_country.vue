<template>
  <div class="container">
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
    <div class="columns all">
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
    <div class="columns all">
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
    <div class="columns">
      <div class="column">
        <Chart :chartdata="totalCasesChartData" :options="chartOptions" :key="totalCasesKey"/>
      </div>
      <div class="column">
        <Chart :chartdata="newCasesChartData" :options="chartOptions" :key="newCasesKey"/>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <Chart :chartdata="totalRecoveredChartData" :options="chartOptions" :key="totalRecoveredKey"/>
      </div>
      <div class="column">
        <Chart :chartdata="totalDeathsChartData" :options="chartOptions" :key="totalDeathsKey"/>
      </div>
    </div>
    </div>
</template>

<script>
import axios from '../plugins/axios';
import Chart from '../components/Chart';
import Loader from '../components/Loader';
import Header from '../components/Header';

export default {
  components: {
    Chart,
    Loader,
    Header
  },
  data() {
    return {
      res: {},
      countries: [],
      allCases: [],
      currentCountry: '',
      totalCasesKey: 'totalCasesKey',
      newCasesKey: 'newCasesKey',
      totalRecoveredKey: 'totalRecoveredKey',
      totalDeathsKey: 'totalDeathsKey',
      totalCasesChartData: null,
      newCasesChartData: null,
      totalRecoveredChartData: null,
      totalDeathsChartData: null,
      loading: false,
      chartOptions: {
            responsive: true,
            lineTension: 1,
            tooltips: {
              mode: 'x'
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
  async asyncData({ params }) {
      // this.loading = true;
      const data = await axios({
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php',
      params: {
        country: params.country
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


    const totalCasesChartData = {
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

    const newCasesChartData = {
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

    const totalRecoveredChartData = {
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

    const totalDeathsChartData = {
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

    const res = await axios({
      method: 'GET',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
      params: {
        country: params.country
        }
      }).then(resp => {
        return resp.data.latest_stat_by_country[0];
      });

      const currentCountry = params.country;

    return { res, currentCountry, totalDeathsChartData, totalRecoveredChartData, newCasesChartData, totalCasesChartData };
    
  },
  methods: {
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
