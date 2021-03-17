export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    console.log('user id' , userId);
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://fallenzone-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    console.log(payload.forceRefresh, !context.getters.shouldUpdate)
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    console.log('fetch');
    const response = await fetch(
      `https://fallenzone-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Faild to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    console.log(coaches);

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  }
};
