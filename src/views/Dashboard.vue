<template>
  <main class="dashboard">
    <h1 class="page-title">Dashboard view</h1>

    <h3 v-if="getMyProfile" class="margin-bottom-15">
      Marketer: {{ getMyProfile.marketer.firstName + ' ' + getMyProfile.marketer.lastName }}
    </h3>
    <h3 v-if="getMyProfile" class="margin-bottom-15">
      Influencer: {{ getMyProfile.influencer.firstName + ' ' + getMyProfile.influencer.lastName }}
    </h3>
    <table class="profiledata">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Budget</th>
          <th>
            Count</th>
          <th>Platforms</th>
          <th>Time</th>
        </tr>
        <tr v-for="(mytask, index) in getTask" :key="index">
          <td>{{ mytask.title }}</td>
          <td>{{ mytask.description }}</td>
          <td>{{ mytask.budget.value + mytask.budget.currency }}</td>
          <td>{{ mytask.proposalCount }}</td>
          <td>{{ mytask.platforms.join(',') }}</td>
          <td>{{ mytask.addedTime }}</td>
        </tr>
      </thead>
    </table>
  </main>
</template>

<script lang="ts">
import useUserStore from '@/store/user'
import useTaskStore from '@/store/task'
import { onMounted, defineComponent } from 'vue'
import useUserAuthentificationController from '@/controllers/useUserAuthentificationController'
import useTaskManageController from '@/controllers/useTaskManageController'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { getMyProfile } = useUserStore()
    const { getTask } = useTaskStore()
    const authController = useUserAuthentificationController()
    const taskController = useTaskManageController()
    onMounted(() => {
      authController.checkLogininfo()
      taskController.getTaskApi()
    })
    return {
      getMyProfile,
      getTask,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/Dashboard';
</style>
