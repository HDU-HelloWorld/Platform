import RecuritStore from './recuritStore'
import { createContext, useContext } from 'react'

const recuritStore = new RecuritStore()

const stores = { recuritStore }
// 创建上下文

const storesContext = createContext(stores)
const useStores = () => {
  return useContext(storesContext)
}
export default useStores
