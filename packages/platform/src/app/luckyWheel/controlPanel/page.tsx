'use client'
import useStores from '@/stores'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

const ControlPanel = observer(() => {
  const { luckyStore } = useStores()
  const { luckyWheelData } = luckyStore
  return <>{JSON.stringify(toJS(luckyWheelData))}</>
})
export default ControlPanel
