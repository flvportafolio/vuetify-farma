<script lang="ts">
import { defineComponent } from 'vue';
import showNotify, { TypeNotification } from '@/utils/notifications';
import $axios from '@/axiosConfig';
import { StatusCodes } from '@/utils/statusCodes';

export default defineComponent({
  data() {
    return {
      correo: '',
      pass: '',
      loading: false
    };
  },
  methods: {
    async login() {
      const payload = {
        correo: this.correo,
        password: this.pass,
      };
      try {
        this.loading = true;
        const response = await $axios.post('login', payload);
        localStorage.setItem('token', response.data.access_token);
        window.location.reload();
      } catch (error: any) {
        this.loading = false;
        localStorage.removeItem('token');
        if (error.response.status === StatusCodes.unAuthorized) {
          showNotify('Login Incorrecto', error.response.data.message, TypeNotification.Warn);
          return;
        }
        Object.entries(error.response.data.validations).reverse().forEach(([, value]) => {
          const tempList = value as Array<string>;
          tempList.forEach((el: string) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
      }
    },
  },
})
</script>

<template>
  <div class="login-wrapper">
    <form class="form" @submit.prevent="login" >
      <img src="img/avatar.png" alt="">
      <h2>Login</h2>
      <div class="input-group">
        <input type="text" name="email" v-model="correo">
        <label for="email">Email</label>
      </div>
      <div class="input-group">
        <input type="password" name="password" v-model="pass">
        <label for="password">Password</label>
      </div>
      <v-row style="text-align: center;">
        <v-col cols="12">
          <v-btn color="primary" type="submit">
            Login
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>

<style scoped>
.login-wrapper {
  background: url('img/bg.jpg') no-repeat center;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  position: relative;
  width: 100%;
  max-width: 380px;
  padding: 80px 40px 40px;
  background: rgba(0,0,0,0.7);
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 15px 25px rgba(0,0,0,0.5);
}
.form::before {
  content:'';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255,255,255, 0.08);
  transform: skewX(-26deg);
  transform-origin: bottom left;
  border-radius: 10px;
  pointer-events: none;
}
.form img {
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
  width: 100px;
  background: rgba(255,255,255, 0.8);
  border-radius: 50%;
}
.form h2 {
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  color: #fff;
}
.form .input-group {
  position: relative;
}
.form .input-group input {
  width: 100%;
  padding: 10px 0;
  font-size: 1rem;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: inherit;
}
.form .input-group label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 1rem;
  pointer-events: none;
  transition: .3s ease-out;
}
.form .input-group input:focus + label,
.form .input-group input:valid + label {
  transform: translateY(-24px);
  color: #fff;
  font-size: .8rem;
}
</style>