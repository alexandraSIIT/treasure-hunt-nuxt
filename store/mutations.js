const mutations = {
    addWinner(state, data) {
      state.winnersList.push(data);
    },
    incrementWinners(state) {
        state.noOfWinners++;
    },
    updateNoOfWinners(state, noOfWinners) {
        state.noOfWinners = noOfWinners;
    },
    updateWinnersList(state, winnersList) {
        state.winnersList = [...winnersList];
    }
  }
  
  export default mutations