<template>
  <el-form :model="account" label-width="80px" ref="formRef" :rules="accountRules">
    <el-form-item label="账号" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
    <el-form-item label="验证码" prop="code" class="code_item">
      <el-input v-model="account.code" style="width: 100px" />
      <el-image :src="codeUrl" class="img_warp" @click="getCode" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, PropType, computed, ref, onMounted } from 'vue'
import { Account } from '../types'
import { ElMessage } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from '@/store/index'

import { getLoginCode } from '@/service/login/login'

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Account>,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const store = useStore()

    const account = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    })

    const accountRules = {
      username: [
        { required: true, message: '必须输入用户名', trigger: 'blur' },
        { pattern: /^[a-z0-9]{5,20}$/, message: '必须是5~20个字母或者数字', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '必须输入密码', trigger: 'blur' },
        { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字', trigger: 'blur' }
      ],
      code: [{ required: true, message: '请输入验证码', targger: 'blur' }]
    }
    const codeId = ref('')

    // 验证form的函数
    const formRef = ref<InstanceType<typeof ElForm>>()
    const accountLoginAction = (isKeep: boolean) => {
      // 1.验证是否成功
      formRef.value?.validate((valid) => {
        if (valid) {
          // 登录逻辑
          const username = account.value.username
          const password = account.value.password
          const code = account.value.code
          const id = codeId.value

          // 保存账号和密码
          if (isKeep) {
            localCache.setCache('username', username)
            localCache.setCache('password', password)
          }

          // 登录
          store.dispatch('login/accountLoginAction', { username, password, code, codeId: id })
        } else {
          ElMessage.error('账号或者密码错误~')
        }
      })
    }
    // 获取验证码
    const codeUrl = ref('')
    const getCode = () => {
      getLoginCode().then((res: { image: string; uuId: string }) => {
        codeUrl.value = res.image
        codeId.value = res.uuId
      })
    }
    onMounted(() => {
      getCode()
    })
    return {
      account,
      accountRules,
      formRef,
      accountLoginAction,
      codeUrl,
      codeId,
      getCode
    }
  }
})
</script>

<style scoped>
.code_item >>> .el-form-item__content {
  display: flex;
  align-items: center;
}
.img_warp {
  cursor: pointer;
}
</style>
