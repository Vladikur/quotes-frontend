<script setup>
import { ref } from 'vue'
import {
  NInput,
  NButton,
  NSpace,
  NCard,
  useMessage,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { login } from '../../api/quotes'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const message = useMessage()
const { t } = useI18n()
const authStore = useAuthStore()

const loading = ref(false)
const loginValue = ref('')
const password = ref('')

async function onLogin() {
  if (!loginValue.value || !password.value) {
    message.warning(t('errors.fillAllFields'))
    return
  }

  loading.value = true

  try {
    const res = await login({
      login: loginValue.value,
      password: password.value,
    })

    if (!res.data.success) throw new Error()

    authStore.login(res.data.token, res.data.role)

    message.success(t('success.loginSuccess'))

    router.push('/')
  } catch {
    message.error(t('errors.loginFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container login-container">
    <NCard class="login-card" bordered>
      <n-h2 class="title">{{ $t('login.title') }}</n-h2>

      <NSpace vertical size="large">
        <NInput
          v-model:value="loginValue"
          size="large"
          :placeholder="$t('login.loginPlaceholder')"
          clearable
          @keyup.enter="onLogin"
        />

        <NInput
          v-model:value="password"
          type="password"
          size="large"
          :placeholder="$t('login.passwordPlaceholder')"
          show-password-on="click"
          @keyup.enter="onLogin"
        />

        <NButton
          type="primary"
          size="large"
          block
          :loading="loading"
          @click="onLogin"
        >
          {{ $t('login.submit') }}
        </NButton>
      </NSpace>
    </NCard>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.login-card {
  width: 100%;
  max-width: 420px;
}

.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
