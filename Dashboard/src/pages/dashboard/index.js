import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/useAuth'

const Dashboard = () => {
  const { data: surveys, loading } = useSelector(state => state.dashboard)

  const { user } = useAuth()

  return <Box>Dashboard</Box>

  // return <DashboardView surveys={surveys} organizationId={user?.organization?.id} loading={loading} />
}

Dashboard.acl = {
  action: 'read',
  subject: 'Dashboard'
}

export default Dashboard
