'use client'

import '@arco-design/web-react/dist/css/arco.css';

import { Form, Input, Button } from '@arco-design/web-react';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default function Home() {
  return (
    <main className="border-0 p-0 page flex flex-col w-screen h-screen items-center justify-center">
      <div className="w-screen h-screen flex flex-col justify-cneter items-center p-2 bg-[#F2F3F9] rounded">
        <div className="h-[10%] w-[100%]"></div>
        <div className="h-[15%] w-[90%] border-4 border-indigo-200 border-b-indigo-500 items-center flex justify-center text-[#3491FA] font-bold text-2xl">HelloWorld</div>
        <div className="h-[5%] w-[100%]"></div>
        <div className="h-[60%] w-[90%] border-4 border-indigo-200  border-b-indigo-500 border-t-indigo-500 flex flex-col justify-center items-center">
          <div className="w-[100%] flex justify-center items-end">
            <Form style={{ width: 20 + 'em' }} className={`flex flex-col justify-center items-center`} autoComplete='off'>
              <FormItem className={`font-semibold shadow-[0_2px_7px_rgb(0,0,0,0.25)]`} label='名字'>
                <Input placeholder='please enter your name..' />
              </FormItem>
              <FormItem className={`font-semibold shadow-[0_0_10px_rgb(0,0,0,0.25)]`} label='学号'>
                <Input placeholder='enter your student number..' />
              </FormItem>
              <FormItem className={`font-semibold shadow-[0_0_10px_rgb(0,0,0,0.25)]`} label='电话'>
                <Input placeholder='enter your phone number..' />
              </FormItem>
              <FormItem className={`font-semibold shadow-[0_-2px_7px_rgb(0,0,0,0.25)]`} label='Q&nbsp;Q&nbsp;'>
                <Input placeholder='please enter your QQ ID..' />
              </FormItem>
            </Form>
          </div>
          <div className="w-[100%] flex justify-center">
            <div className="w-[14em] shadow-[0_0_10px_rgb(0,0,0,0.15)] p-0">
              <TextArea placeholder='Something about why you choose HW..' style={{ minHeight: 100, width: 100 + '%' }} />
            </div>
            <div className="flex w-[6em] h-[40%] self-end justify-end">
              <Button type='primary' style={{ height: 100 + '%' }}>Submit</Button>
            </div>
          </div>
        </div>
        <div className="h-[10%] w-[100%]"></div>
      </div>
    </main>
  );
}