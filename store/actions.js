const actions = {
    addWinner({commit, state}, data) {
      commit('incrementWinners');
      commit('addWinner', data);
    },
    updateLeaderboard({commit, state}, data) {
        commit('updateNoOfWinners', data.items.length);
        commit('updateWinnersList', data.items);
    }
  }
  
export default actions