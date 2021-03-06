import axios from 'axios';
import lscache from 'lscache';
import ReactGA from 'react-ga';

export {default as languages} from './languages.json';

const TRENDING_API_URL = 'https://github-trending-api.now.sh/repositories';

export const trendingPeriodDefs = {
    'day': {heading: 'Today', ghParamKey: 'daily'},
    'week': {heading: 'This Week', ghParamKey: 'weekly'},
    'month': {heading: 'This Month', ghParamKey: 'monthly'},
};

export async function fetchTrendingRepositories({language, since}) {
  let dataLabel = `${language || "all"}/${since}`;
  let cacheKey = `github-trending-repositories:${dataLabel}`;
  let reposities;

  reposities = lscache.get(cacheKey);
  if (reposities) {
    console.debug(`Got trending repositories from cache. (cacheKey: ${cacheKey})`);
    return reposities;
  }

  console.debug(`Fetching trending repositories (${dataLabel}).`);
  let resp = await axios.get(TRENDING_API_URL, {
    params: {language, since}
  }).catch(error => {
    ReactGA.exception({
      description: `Failed to Fetch Trending Data: ${error.message}. detail: ${JSON.stringify(error)}`,
      fatal: true
    });
    throw(error);
  });

  ReactGA.event({
    category: 'API',
    label: 'Trending API Call',
    action: `Done Fetch Trending Data (${dataLabel})`
  });

  reposities = resp.data;

  reposities.forEach((repo) => {
    let ownerLogin = repo.author;
    repo.html_url = repo.url;
    repo.owner = {
      login: ownerLogin,
      html_url: `https://github.com/${ownerLogin}`,
      avatar_url: `https://avatars.githubusercontent.com/${ownerLogin}?s=200&v=4`,
    }
  });

  // console.debug(`Got trending data (${dataLabel}):`, reposities);

  if (reposities && reposities.length > 0) {
    lscache.set(cacheKey, reposities, 60);
  }
  return reposities;
}
