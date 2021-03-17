export default {
  setUser(state, payload) {
    console.log('set user info', payload);
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
  // logout(state) {
  //   state.tokenExpiration = null;
  //   state.token = null;
  //   state.userId = null;
  // }
};