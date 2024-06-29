import { useState } from 'react'
import UpgradesPlans from 'src/views/setting/account/upgrades-plans'

const UpgradesPlansView = () => {
  const [tabValue, setTabValue] = useState('TEAM')

  return <UpgradesPlans setTabValue={setTabValue} tabValue={tabValue} />
}

export default UpgradesPlansView
