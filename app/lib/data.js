import { CONFIG } from './config.js';
import gmbestvertical from './gmbestvertical.json';
import gpvertical from './gpvertical.json';

const sources = {
    gmbestvertical,
    gpvertical,
};

/**
 * Loads game data from a specified source name.
 * Used for the dynamic /source/[sourceName] routes.
 * @param {string} sourceName - The name of the data source.
 * @returns {Array} An array of game items.
 */
export function loadGames(sourceName) {
    return sources[sourceName] || [];
}

/**
 * Loads the game data that is currently active in the config.
 * Used for the main site routes (/, /game, /game/random).
 * @returns {Array} An array of game items.
 */
export function getActiveGames() {
    const sourceName = CONFIG.ACTIVE_GAMES_SOURCE;
    return loadGames(sourceName);
}
