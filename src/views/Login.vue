<template>
  <div class="Login">
    <img class="Abstract06" src="../assets/login.png" />
    <div class="right">
      <div class="ComponentLogo">
        <img class="Abstract05" src="../assets/abstract-05.png" />
        <div class="Frame2186">
          <div class="AigAiImagesGenerator">
            AIG <br />
            <span>AI Images Generator</span>
          </div>
        </div>
      </div>
      <div class="Frame1000003532">
        <input class="usernameId" v-model="form.email" type="text" placeholder="用户名或邮箱" />
      </div>
      <div class="Frame1000003533">
        <input class="passwordId" 
        v-model="form.password" 
        :type="isPasswordVisible ? 'text' : 'password'"
        placeholder="密码" />
        <div class="CommonEyeSlash"
          @click="togglePasswordVisibility">
          <div class="EyeSlash">
           <img :src="isPasswordVisible ? 'src/assets/eye.png' : 'src/assets/eye-slash.png'">
          </div>
        </div>
      </div>
      <div class="Frame1000003534">
        <div class="Frame2">
          <div class="CommonTickSquare">
            <div class="TickSquare">
              <img src="../assets/tick-square.png">
            </div>
          </div>
          <div class="remember">30天内记住我</div>
        </div>
        <div>忘记密码？</div>
      </div>
      <div class="login">
        <div class="login-button" @click="login">登录</div>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="bottom">
        <div>
          <span>内部系统需申请开通，如需使用请</span>
          <span>点击这里申请</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive} from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

const form = reactive({
  email: '',
  password: '',
  type: 0
})
const router = useRouter();

// 定义密码可见性状态
const isPasswordVisible = ref(false);

// 切换密码可见性
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const error = ref('')

const login = async () => {
  try {
    error.value = ''
    const response = await axios.post('http://13.215.140.116:5001/api/v1/user/login', {
      email: form.email,
      password: form.password,
      type: form.type
    })
 
    // 处理成功登录后的逻辑
    // 保存token到localStorage
    localStorage.setItem('token', response.data.data.token)
    console.log(localStorage.getItem('token'))
    console.log('登录成功', response.data);
    router.push('/main');
  } catch (err) {
    if (error.response && err.response.status === 401) {
      error.value = '用户名或密码错误'
    } else {
      error.value = '登录失败，请稍后重试'
    }
  }
}
</script>

<style scoped>
/** 禁止水平滑动 */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.Login {
  width: 100vw;
  height: 100vh;
  background: white;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  overflow: hidden; /* 禁止容器内部滚动 */
}

.Abstract06 {
  width: 500px;
  height: 100%;
  margin: 0;
}

.right {
  /* width: 1227px; */
  flex:1;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  display: inline-flex;
  flex-shrink: 0;
}

.ComponentLogo {
  margin-top: auto;
  width: 236px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  display: inline-flex;
}

.Abstract05 {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.Frame2186 {
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.AigAiImagesGenerator {
  width: 190px;
  height: 55px;
  color: #1d1d1d;
  font-size: 24px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.24px;
  word-wrap: break-word;
}

.AigAiImagesGenerator span {
  color: #797979;
  font-size: 14px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.14px;
  word-wrap: break-word;
}

.Frame1000003532 {
  width: 600px;
  height: 40px;
  border-bottom: 1px #1d1d1d solid;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: inline-flex;
}
.usernameId{
  width: 100%;
  border: 1px solid transparent; /* 设置边线宽度、样式和颜色为透明 */ 
}
.passwordId{
  width: 100%;
  border: 1px solid transparent; /* 设置边线宽度、样式和颜色为透明 */ 
}
.Frame1000003533 {
  width: 600px;
  height: 40px;
  border-bottom: 1px #1d1d1d solid;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
}

.CommonEyeSlash {
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.EyeSlash {
  width: 24px;
  height: 24px;
  position: relative;
}


.Frame1000003534 {
  width: 600px;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.Frame2 {
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: flex;
}

.CommonTickSquare {
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.TickSquare {
  width: 24px;
  height: 24px;
  position: relative;
}
.remember {
  color: #1D1D1D; 
  font-size: 16px; 
  font-family: Nunito; 
  font-weight: 400; 
  text-transform: capitalize; 
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.login {
  width: 600px;
  height: 40px;
  padding: 12px 50px;
  background: #377dff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  margin-bottom: auto;
}

.login-button {
  color: white;
  font-size: 16px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
  cursor: pointer;
}

.bottom {
  width: 600px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: auto;
}

.Frame1000003535 span {
  color: #8e8e8e;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.Frame1000003535 span:last-child {
  color: #377dff;
  font-weight: 700;
}
</style>
