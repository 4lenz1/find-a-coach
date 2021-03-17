export default {
  async login(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_FtLpEuc9V6Nb6bh6OvPjMoZFKQH_lZs', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to auth on login');
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
    console.log(responseData);

  },
  async signup(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_FtLpEuc9V6Nb6bh6OvPjMoZFKQH_lZs', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to auth');
      throw error;
    }

    context.commit('setUser', {
      token: responseData.iDToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
    console.log(responseData);
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
