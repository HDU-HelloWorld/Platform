'use client'
//QR code scanner 签到’
import { Form, InputNumber, Input, Message } from '@arco-design/web-react'
const FormItem = Form.Item
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import signInAPi from '@/api/signIn'
export default function SignIn() {
  const searchParams = useSearchParams()
  const qqId = searchParams.get('qqId')
  const phone = searchParams.get('phone')
  const studentId = searchParams.get('studentId')
  useEffect(() => {
    if (studentId) {
      signInAPi.signIn('一面签到测试', parseInt(studentId)).then((res) => {
        if (res.code === 200) {
          Message.success('签到成功')
        } else {
          Message.error('签到失败')
        }
      })
    }
  }, [])

  return <></>
}
