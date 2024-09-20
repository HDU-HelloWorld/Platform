import RecuritStore from './recuritStore'

import { createContext, useContext } from 'react'
import LuckyWheelStore from './luckyWheel'

const recuritStore = new RecuritStore()
const luckyStore = new LuckyWheelStore()
const stores = { recuritStore, luckyStore }
// 创建上下文

const storesContext = createContext(stores)
const useStores = () => {
  return useContext(storesContext)
}
export default useStores
