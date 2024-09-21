'use client'
import React, { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import luckyWheelApi from '../../api/luckyWheel'
import useStores from '@/stores/index'
import { observer } from 'mobx-react-lite'
import { Message, Input } from '@arco-design/web-react'
const LuckyWheelEg = observer(() => {
  const { luckyStore } = useStores()
  const { luckyWheelData, getLuckyWheelData, resetLuckyWheel } = luckyStore
  useEffect(() => {
    getLuckyWheelData().then((res) => console.log(res))
  }, [])
  const [blocks] = useState([{ padding: '10px', background: '#869cfa' }])
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '20%',
      background: '#869cfa',
      pointer: true,
      imgs: [
        { src: '/看板娘.jpg', width: '100%', height: '100%', top: '-100%' }
      ]
    }
  ])
  const [userIdState, setUserIdState] = useState('')
  const myLucky = useRef()
  return (
    <>
      <Input
        style={{
          width: '300px',
          marginBottom: '32px'
        }}
        placeholder="Enter your student number"
        value={userIdState}
        onChange={setUserIdState}
      ></Input>
      <div>
        <LuckyWheel
          ref={myLucky}
          width="40vw"
          height="40vw"
          blocks={blocks}
          prizes={luckyWheelData.prizeList.map((item, index) => {
            return {
              background: index % 2 === 0 ? '#e9e8fe' : '#b8c5f2',

              fonts: [
                {
                  text: `${item.name}-${item.prize}`,
                  top: '70%',
                  fontSize: '1.5vw'
                }
              ],
              imgs: [
                {
                  src: item.image,
                  width: '7vw',
                  height: '7vw',
                  top: '10%'
                }
              ]
            }
          })}
          buttons={buttons}
          onStart={async () => {
            // 点击抽奖按钮会触发star回调
            if (!userIdState) {
              Message.error('请先输入用户id')
              return
            }
            await luckyWheelApi
              .drawPrize(luckyWheelData.name, Number(userIdState))
              .then((res) => {
                if (res.code === 500) {
                  Message.error(res.msg)
                  return
                }
                myLucky.current.play()
                const index = luckyWheelData.prizeList.findIndex(
                  (item) => item.prize === res.data.prize
                )
                myLucky.current.stop(index)
              })
          }}
          onEnd={(prize) => {
            alert(`恭喜你获得${prize.fonts[0].text}`)
          }}
        />
      </div>
    </>
  )
})
export default LuckyWheelEg
