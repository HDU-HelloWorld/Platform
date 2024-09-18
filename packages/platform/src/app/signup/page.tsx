'use client'

import '@arco-design/web-react/dist/css/arco.css'
import useStores from '@/stores'
import React from 'react'
import { Form, Input, Button } from '@arco-design/web-react'
const FormItem = Form.Item

export default function signup() {
  // const [form] = Form.useForm()
  // const { recuritStore } = useStores()
  // return (
  //   <main className="border-0 p-0 page flex flex-col w-screen h-screen items-center justify-center">
  //     <div className="w-screen h-screen flex flex-col justify-cneter items-center p-2 bg-[#F2F3F9] rounded">
  //       <div className="h-[2%] w-[100%]"></div>
  //       <div className="h-[14%] w-[96%] border-4 border-indigo-200 border-b-indigo-500 items-center flex justify-center text-[#3491FA] font-bold text-3xl">HelloWorld</div>
  //       <div className="h-[4%] w-[100%]"></div>
  //       <div className="h-[82%] w-[96%] border-4 border-indigo-200  border-b-indigo-500 border-t-indigo-500 flex flex-col justify-center items-center">
  //         <div className="w-[100%] flex justify-center">
  //           <Form
  //             from={form}
  //             requiredSymbol={false}
  //             size='default'
  //             style={{ width: 20 + 'em' }}
  //             className={`flex flex-col justify-center items-center`}
  //             autoComplete='off'
  //             validateMessages={{
  //               required: (_, { label }) => `必须填写 ${label}`,
  //               string: {
  //                 length: `字符数必须是 #{length}`,
  //                 match: `不匹配正则 #{pattern}`,
  //               },
  //               number: {
  //                 min: `最小值为 #{min}`,
  //                 max: `最大值为 #{max}`,
  //               },
  //             }}
  //             onSubmit={(values) => {
  //               recuritStore.submitRecruitApply(values)
  //             }}>
  //             <FormItem field='username' className={`rounded font-semibold shadow-[0_2px_7px_rgb(0,0,0,0.25)]`} label='名字' required>
  //               <Input placeholder='please enter your name..' name='username' required />
  //             </FormItem>
  //             <FormItem field='id' className={`rounded font-semibold shadow-[0_0_10px_rgb(0,0,0,0.25)]`} label='学号'
  //               rules={[{ match: /^\d{8}$/, message: '请输入正确的学号' }]} required>
  //               <Input placeholder='enter your student number..' name='id' required />
  //             </FormItem>
  //             <FormItem field='school' className={`rounded font-semibold shadow-[0_-2px_7px_rgb(0,0,0,0.25)]`} label='学院' required>
  //               <Input placeholder='please enter your college..' name='school' required />
  //             </FormItem>
  //             <FormItem field='phone' className={`rounded font-semibold shadow-[0_0_10px_rgb(0,0,0,0.25)]`} label='电话'>
  //               <Input placeholder='enter your phone number..' name='phone' required />
  //             </FormItem>
  //             <FormItem field='qqId' className={`rounded font-semibold shadow-[0_-2px_7px_rgb(0,0,0,0.25)]`} label='Q&nbsp;Q&nbsp;' required>
  //               <Input placeholder='please enter your QQ ID..' name='qqId' required />
  //             </FormItem>
  //             <FormItem field='major' className={`rounded font-semibold shadow-[0_-2px_7px_rgb(0,0,0,0.25)]`} label='专业' required>
  //               <Input placeholder='enter your major..' name='major' required />
  //             </FormItem>
  //             <FormItem field='grade' className={`rounded font-semibold shadow-[0_-2px_7px_rgb(0,0,0,0.25)]`} label='年级' required>
  //               <Input placeholder='please enter your grade..' name='grade' required />
  //             </FormItem>
  //             <div className="w-[100%] flex justify-between">
  //               <div className="w-[60%] shadow-[0_0_10px_rgb(0,0,0,0.15)] p-0">
  //                 <FormItem layout='vertical' field="bio" style={{ height: 100 + '%' }}>
  //                   <Input.TextArea placeholder="介绍一下你自己吧~" name="bio" style={{ height: 100 + '%', width: 100 + '%' }} />
  //                 </FormItem>
  //               </div>
  //               <div className="flex w-[6em] h-[3em] self-end justify-end">
  //                 <Button
  //                   type='primary' style={{ height: 100 + '%' }}
  //                   className="rounded" htmlType="submit">
  //                   Submit</Button>
  //               </div>
  //             </div>
  //           </Form>
  //         </div>
  //       </div>
  //       <div className="h-[2%] w-[100%]"></div>
  //     </div>
  //   </main>
  // );
  return <></>
}
