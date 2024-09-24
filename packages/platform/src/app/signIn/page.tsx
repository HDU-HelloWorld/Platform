'use client'

import { Form, InputNumber, Input, Message } from '@arco-design/web-react'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import signInApi from '@/api/signIn'

export default function SignIn() {
  const [form] = Form.useForm()
  const [status, setStatus] = useState(false)
  const [studentId, setStudentId] = useState(0)
  // const qqId = searchParams.get('qqId')
  // const phone = searchParams.get('phone')

  useEffect(() => {
    if (window && studentId === 0) {
      window.location.href
        .split('?')
        .slice(1)[0]
        .split('&')
        .forEach((item) => {
          if (item.split('=')[0] === 'studentId')
            setStudentId(parseInt(item.split('=')[1]))
        })
    }
    if (studentId) {
      signInApi.signIn('一面签到', studentId).then((res) => {
        if (res.code === 200) {
          Message.success('签到成功')
          setStatus(true)
        } else {
          Message.error('签到失败')
        }
      })
    }
  }, [studentId]) // 依赖项中加入 studentId

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>签到页面</h1>
        {status ? (
          <div>签到成功</div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item
              label="学生ID"
              field="studentId"
              rules={[{ required: true, message: '请输入学生ID' }]}
            >
              <InputNumber placeholder="请输入学生ID" />
            </Form.Item>
            <Form.Item>
              <button type="submit" onClick={() => handleSignIn(form)}>
                签到
              </button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Suspense>
  )
}

const handleSignIn = (form: any) => {
  form
    .validate()
    .then((values: any) => {
      const { studentId } = values
      signInApi.signIn('一面签到测试', parseInt(studentId)).then((res) => {
        if (res.code === 200) {
          Message.success('签到成功')
        } else {
          Message.error('签到失败')
        }
      })
    })
    .catch((error: any) => {
      Message.error('表单验证失败')
    })
}
