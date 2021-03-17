<template>
    <div>
        <base-dialog
            :show="!!error"
            title="an error accour !!!"
            @close="handleerror"
        >
            {{ error }}</base-dialog
        >
        <base-dialog :show="isLoading" fixed title="Authenticating...">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        v-model.trim="email"
                    />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        v-model.trim="password"
                    />
                </div>
                <p v-if="!formIsValid">Please fix problem</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button @click="switchMode" type="button" mode="flat">{{
                    switchModeButtonCaption
                }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            mode: "login",
            formIsValid: true,
            isLoading: false,
            error: null,
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === "login") {
                return "Login";
            } else {
                return "SignUp";
            }
        },
        switchModeButtonCaption() {
            if (this.mode === "login") {
                return "Signup instead";
            } else {
                return "Login instead";
            }
        },
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            if (
                this.email === "" ||
                !this.email.includes("@") ||
                this.password.length < 6
            ) {
                this.formIsValid = false;
                return;
            }
            const loginInfo = {
                email: this.email,
                password: this.password,
            };

            try {
                // send http request
                if (this.mode === "login") {
                    await this.$store.dispatch("login", loginInfo);
                } else {
                    await this.$store.dispatch("signup", loginInfo);
                }
                this.$router.replace('/coaches')
            } catch (err) {
                this.error = err.message || "Failed to auth ";
            }

            this.isLoading = false;
        },
        switchMode() {
            if (this.mode === "login") {
                this.mode = "signup";
            } else {
                this.mode = "login";
            }
        },
        handleerror() {
            this.error = null;
        },
    },
};
</script>

<style scoped>
form {
    margin: 1rem;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>