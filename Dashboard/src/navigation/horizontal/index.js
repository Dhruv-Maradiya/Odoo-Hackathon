import { HOME, SETTING, SETTING_ACCOUNT } from '../constants'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: HOME,
      icon: 'tabler:home',
      action: 'read',
      subject: 'Dashboard'
    },
    {
      title: 'Exams',
      icon: 'tabler:list',
      path: '/exams',
      action: 'manage',
      subject: 'Exam'
    },
    {
      title: 'Settings',
      icon: 'tabler:settings',
      path: SETTING,
      children: [
        {
          title: 'Users',
          path: '/setting/users',
          icon: 'tabler:user-circle'
        },
        {
          title: 'Account',
          path: SETTING_ACCOUNT,
          icon: 'tabler:user'
        }
      ],
      action: 'manage',
      subject: 'Setting'
    }
  ]
}

export default navigation
