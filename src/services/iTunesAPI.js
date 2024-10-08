import axios from 'axios';

export const searchMusic = async (query) => {
    
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const URL = `${PROXY}/`;
    
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${query}&media=music`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching music data", error);
    return [];
  }
};
