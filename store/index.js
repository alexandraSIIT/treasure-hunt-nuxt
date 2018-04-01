import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

const createStore = () => {
  return new Vuex.Store({
    state: {
      noOfWinners: 0,
      winnersList: [],
    },
    mutations,
    actions,
  })
}

export default createStore