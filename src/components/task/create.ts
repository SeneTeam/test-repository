import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import useTaskManageController from '@/controllers/useTaskManageController'
import { TaskInfoToCreate, TaskErrInfoToCreate } from '@/types/task.model'
import { Currency } from '@/types/money.model'
import { Platform } from '@/types/platform.model'

export default function useCreateTask() {
  const taskController = useTaskManageController()
  const router = useRouter()

  const task = reactive<TaskInfoToCreate>({
    title: '',
    description: '',
    budget: { value: 0, currency: Currency.USD },
    platforms: [Platform.INSTAGRAM, Platform.YOUTUBE, Platform.TWITCH, Platform.OTHER],
    filesIds: [],
  })

  const errors = reactive<TaskErrInfoToCreate>({
    title: { status: false, msg: '' },
    description: { status: false, msg: '' },
    budget: { status: false, msg: '' },
  })

  const clear = () => {
    task.title = ''
    task.description = ''
    task.budget = { value: 0, currency: Currency.USD }
    task.platforms = [Platform.INSTAGRAM, Platform.YOUTUBE, Platform.TWITCH, Platform.OTHER]
    task.filesIds = []
  }

  const validate = (task: TaskInfoToCreate) => {
    let status = true
    if (!task.title || task.title.length > 20) {
      errors.title.status = true
      errors.title.msg = 'less than 20 characters'
      status = false
    } else {
      errors.title.status = false
    }
    if (!task.description || task.description.length > 200) {
      errors.description.status = true
      errors.description.msg = 'less than 200 characters'
      status = false
    } else {
      errors.description.status = false
    }
    if (task.budget.value < 0 || typeof task.budget.value !== 'number') {
      errors.budget.status = true
      errors.budget.msg = '0 is not allowed'
      status = false
    } else {
      errors.budget.status = false
    }

    return status
  }

  const create = () => {
    const response = validate(task)
    if (response) {
      taskController
        .createApi(task)
        .then(() => {
          router.push({ name: 'Dashboard' })
        })
        .catch(() => {
          clear()
        })
    }
  }

  return {
    task,
    create,
    clear,
    errors,
  }
}
