export default {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;

      console.log('set coaches' , state.coaches);
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
  }
  };