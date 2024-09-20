'use client'
import React, { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import luckyWheelApi from '../../api/luckyWheel'
import useStores from '@/stores/index'
import { observer } from 'mobx-react-lite'

const LuckyWheelEg = observer(() => {
  const { luckyStore } = useStores()
  const { luckyWheelData, getLuckyWheelData } = luckyStore
  useEffect(() => {
    // console.log(luckyWheelData.luckyWheel.prizeList)
    getLuckyWheelData().then((res) => console.log(res))
  }, [])
  const [blocks] = useState([{ padding: '10px', background: '#869cfa' }])
  // const [prizes] = useState([
  //   {
  //     background: '#e9e8fe',
  //     fonts: [{ text: luckyWheelData.prizeList[0].name, top: '50%' }],
  //   },
  //   {
  //     background: '#b8c5f2',
  //     fonts: [{ text: '1', fontSize: '32px', top: '50%' }],
  //   },
  //   { background: '#e9e8fe', fonts: [{ text: '2', top: '50%' }] },
  //   { background: '#b8c5f2', fonts: [{ text: '3', top: '50%' }] },
  // ])
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '20%',
      background: '#869cfa',
      pointer: true,
      imgs: [
        { src: '/看板娘.jpg', width: '100%', height: '100%', top: '-100%' },
      ],
    },
  ])
  const myLucky = useRef()
  return (
    <>
      <div>
        <LuckyWheel
          ref={myLucky}
          width="700px"
          height="700px"
          blocks={blocks}
          prizes={luckyWheelData.prizeList.map((item, index) => {
            return {
              background: index % 2 === 0 ? '#e9e8fe' : '#b8c5f2',
              fonts: [
                {
                  text: `${item.name}-${item.prize}`,
                  top: '70%',
                  fontSize: '28px',
                },
              ],
              imgs: [
                {
                  src: item.image,
                  width: '100px',
                  height: '100px',
                  top: '10%',
                },
              ],
            }
          })}
          buttons={buttons}
          onStart={async () => {
            // 点击抽奖按钮会触发star回调
            myLucky.current.play()
            await luckyWheelApi.drawPrize('2024社团招新抽奖2').then((res) => {
              console.log(res.data.name)
              const index = luckyWheelData.prizeList.findIndex(
                (item) => item.prize === res.data.prize
              )
              myLucky.current.stop(index)
            })

            // setTimeout(() => {
            //   const index = (Math.random() * 6) >> 0
            // }, 2500)
          }}
          onEnd={(prize) => {
            // 抽奖结束会触发end回调
            alert(`恭喜你获得${prize.fonts[0].text}`)
          }}
        />
      </div>
    </>
  )
})
export default LuckyWheelEg
