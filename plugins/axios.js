import axios from 'axios';

export default axios.create({
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
	  "x-rapidapi-key": "h3mZpVfQAhmsh1CbhEOyTmp8yWGFp11Vs1QjsnXD9WLGn2HSr9"
  }
})
