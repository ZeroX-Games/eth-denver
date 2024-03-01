const GAME_ATTRIBUTES = [
  'Win Rate',
  'Critical Hit Rate',
  'League Points',
  'Games',
  'Proficiency',
  'Training Hours',
  'Likes',
];
const CARD_ATTRIBUTES = [
  'Games',
  'Win Rate',
  'HP',
  'Attack',
  'Defense',
  'Likes',
];
const SOCIAL_ATTRIBUTES = [
  'Likes',
  'Level',
  'Badages',
  'Championships',
  'Pokedex',
  'Charm',
];

const BASE_CONFIG = {
  GAME_ATTRIBUTES,
  CARD_ATTRIBUTES,
  SOCIAL_ATTRIBUTES,
  GAME_DOMAINID: Number(import.meta.env.VITE_BASE_DOMAINID),
  CARD_DOMAINID: Number(import.meta.env.VITE_ARBI_DOMAINID),
  SOCIAL_DOMAINID: Number(import.meta.env.VITE_LINEA_DOMAINID),
  GAME_CHAINID: Number(import.meta.env.VITE_BASE_CHAINID),
  CARD_CHAINID: Number(import.meta.env.VITE_ARBI_CHAINID),
  SOCIAL_CHAINID: Number(import.meta.env.VITE_LINEA_CHAINID),
  COLLECTIONADDR: import.meta.env.VITE_COLLECTIONADDR,
  TOKENID1: Number(import.meta.env.VITE_TOKENID1),
  TOKENID2: Number(import.meta.env.VITE_TOKENID2),
  API_BASE: import.meta.env.VITE_API_BASE,
  API_PORT: import.meta.env.VITE_API_PORT,
  fetchUrl: `${import.meta.env.VITE_API_BASE}:${import.meta.env.VITE_API_PORT}/trpc/fetchNFTValuesRouter.fetchNFTValues`,
  postUrl: `${import.meta.env.VITE_API_BASE}:${import.meta.env.VITE_API_PORT}/trpc/flow.flow`,
};

const ARBI_CONFIG = {};

const LINEA_CONFIG = {};

const getConfig = () => {
  let chainConfig;

  if (import.meta.env.VITE_SELECTED_CHAIN === 'BASE') {
    chainConfig = BASE_CONFIG;
  } else if (import.meta.env.VITE_SELECTED_CHAIN === 'ARBI') {
    chainConfig = ARBI_CONFIG;
  } else if (import.meta.env.VITE_SELECTED_CHAIN === 'LINEA') {
    chainConfig = LINEA_CONFIG;
  }
  return chainConfig;
};
export default getConfig;
