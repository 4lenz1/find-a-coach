export default {
    async addRequest(context, payload) {
        const request = {
            // id: new Date().toISOString(),
            // coachId: payload.coachId,
            userEmail: payload.email,
            userMessage: payload.message
        }

        const response = await fetch(
            `https://fallenzone-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
            {
                method: 'POST',
                body: JSON.stringify(request)
            }
        );

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(responseData.message || 'Faild to fetch!');
            throw error;

        }


        request.id = responseData.name;
        request.coachId = payload.coachId;


        context.commit('addRequest', request);
    },


    async loadRequest(context) {

    
        const userId = context.rootGetters.userId;

        // console.log(userId);

        const token = context.rootGetters.token;

        console.log('token',token)
        const response = await fetch(
            `https://fallenzone-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
        );
        const responseData = await response.json();
      
        if (!response.ok) {
            const error = new Error(responseData.message || 'Faild to fetch!');
            throw error;
        }


        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId: userId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].userMessage
            };
            requests.push(request);
        }

    
        context.commit('setRequest', requests);

    }
};