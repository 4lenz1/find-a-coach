<template>
    <div>
        <base-dialog :show="!!error" title="Error accour" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Request Recived</h2>
                </header>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasRequests && !isLoading">
                    <request-item
                        v-for="request in receivedRequest"
                        :key="request.id"
                        :email="request.userEmail"
                        :message="request.userMessage"
                    ></request-item>
                </ul>
                <h3 v-else>You haven't reveived any request yet</h3>
            </base-card>
        </section>
    </div>
</template>
<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
    components: {
        RequestItem,
    },
    data() {
        return {
            isLoading: true,
            error: null,
        };
    },
    created() {
        this.loadRequest();
    },
    methods: {
        async loadRequest() {
            this.isLoading = true;

            try {
                await this.$store.dispatch("requests/loadRequest");
            } catch (error) {
                this.error = error.message || "Something Went Wrong";
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        },
    },
    computed: {
        receivedRequest() {
            return this.$store.getters["requests/requests"];
        },
        hasRequests() {
            return this.$store.getters["requests/hasRequests"];
        },
    },
};
</script>


<style  scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>