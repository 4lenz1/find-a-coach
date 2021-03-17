export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    // return 
    // false ==> token null 
    // true  ==> token not null 
    return !!state.token;
  }
};