'use client'

import { observer } from 'mobx-react-lite'
import useStores from '@/stores/index'
import {
  Button,
  Table,
  Input,
  Select,
  Form,
  FormInstance,
  Tag,
  Message,
} from '@arco-design/web-react'
import { recuritTable } from '@/models/recurit.model'
import { useEffect } from 'react'

// function EditableCell(props: any) {
//   const { children, className, rowData, column, onHandleSave } = props
//   const ref = useRef(null)
//   const refInput = useRef(null)
//   const { getForm } = useContext(EditableContext)
//   const [editing, setEditing] = useState(false)
//   const handleClick = useCallback(
//     (e: any) => {
//       if (
//         editing &&
//         column.editable &&
//         ref.current &&
//         !ref.current.contains(e.target) &&
//         !e.target.classList.contains('js-demo-select-option')
//       ) {
//         cellValueChangeHandler(rowData[column.dataIndex])
//       }
//     },
//     [editing, rowData, column]
//   )
//   useEffect(() => {
//     editing && refInput.current && refInput.current.focus()
//   }, [editing])
//   useEffect(() => {
//     document.addEventListener('click', handleClick, true)
//     return () => {
//       document.removeEventListener('click', handleClick, true)
//     }
//   }, [handleClick])

//   const cellValueChangeHandler = (value: any) => {
//     if (column.dataIndex === 'salary') {
//       const values = {
//         [column.dataIndex]: value,
//       }
//       onHandleSave && onHandleSave({ ...rowData, ...values })
//       setTimeout(() => setEditing(!editing), 300)
//     } else {
//       const form = getForm()
//       form.validate([column.dataIndex], (errors, values) => {
//         if (!errors || !errors[column.dataIndex]) {
//           setEditing(!editing)
//           onHandleSave && onHandleSave({ ...rowData, ...values })
//         }
//       })
//     }
//   }

//   if (editing) {
//     return (
//       <div ref={ref}>
//         {column.dataIndex === 'salary' ? (
//           <Select
//             onChange={cellValueChangeHandler}
//             defaultValue={rowData[column.dataIndex]}
//             options={[2000, 5000, 10000, 20000]}
//           />
//         ) : (
//           <FormItem
//             style={{ marginBottom: 0 }}
//             labelCol={{ span: 0 }}
//             wrapperCol={{ span: 24 }}
//             initialValue={rowData[column.dataIndex]}
//             field={column.dataIndex}
//             rules={[{ required: true }]}>
//             <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
//           </FormItem>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div
//       className={column.editable ? `editable-cell ${className}` : className}
//       onClick={() => column.editable && setEditing(!editing)}>
//       {children}
//     </div>
//   )
// }

const RecuritList = observer(() => {
  const { recuritStore } = useStores()
  const {
    recruitList,
    loading,
    getRecruitList,
    updateRecruitApply,
    deleteRecruitApply,
  } = recuritStore
  useEffect(() => {
    getRecruitList()
  }, [])
  //
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '意愿部门',
      dataIndex: 'department',
      editable: true,
      render: (_: any, record: recuritTable) => {
        return (
          <Select
            className=""
            onChange={async (_) => {
              console.log(
                await recuritStore.updateRecruitApply(record.id, {
                  department: _,
                })
              )
            }}
            defaultValue={record.department}
            options={['WEB', '后端', 'AI', '行政']}></Select>
        )
      },
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      editable: true,
      render: (_: any, record: recuritTable) => {
        let color = 'blue'
        if (record.status === 'approved') {
          color = 'green'
        } else {
          if (record.status === 'rejected') {
            color = 'red'
          }
        }
        return (
          <Select
            className=""
            defaultValue={record.status}
            onChange={async (_) => {
              await updateRecruitApply(record.id, {
                status: _,
              })
            }}>
            <Select.Option value="pending">
              <Tag color="blue">pending</Tag>
            </Select.Option>
            <Select.Option value="rejected">
              <Tag color="red">rejected</Tag>
            </Select.Option>
            <Select.Option value="approved">
              <Tag color="green">approved</Tag>
            </Select.Option>
          </Select>
        )
      },
    },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_: any, record: any) => (
        <Button
          onClick={() => removeRow(record.key)}
          type="primary"
          status="danger">
          Delete
        </Button>
      ),
    },
  ]

  // function handleSave(row) {
  //   const newData = [...data]
  //   const index = newData.findIndex((item) => row.key === item.key)
  //   newData.splice(index, 1, { ...newData[index], ...row })
  //   setData(newData)
  // }

  async function removeRow(key: any) {
    console.log(key)
    recruitList.find((item) => {
      if (item.id + item.username === key) {
        deleteRecruitApply(item.id).then((res) => {
          Message.success('删除成功')
        })
      }
    })
  }

  function addRow() {
    window.location.href = '/recruit'
  }

  return (
    <section className="w-full">
      <Button style={{ marginBottom: 10 }} type="primary" onClick={addRow}>
        Add
      </Button>
      <Table
        stripe
        data={recruitList.map((item) => {
          return { ...item, key: item.id + item.username }
        })}
        loading={loading}
        components={{
          body: {
            // row: EditableRow,
            // cell: EditableCell,
          },
        }}
        columns={columns.map((column) =>
          column.editable
            ? {
                ...column,
                onCell: () => ({
                  // onHandleSave: handleSave,
                }),
              }
            : column
        )}
        className="table-demo-editable-cell"
      />
    </section>
  )
})
export default RecuritList
