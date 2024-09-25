'use client'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import useStores from '@/stores/index'
import {
  Button,
  Table,
  Input,
  Select,
  Form,
  Modal,
  FormInstance,
  Tag,
  Message
} from '@arco-design/web-react'
import { recuritTable } from '@/models/recurit.model'
import { useEffect, useRef } from 'react'
import { IconDown, IconRight, IconSearch } from '@arco-design/web-react/icon'
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
import type { RefInputType } from '@arco-design/web-react/es/Input'
const RecuritList = observer(() => {
  const { recuritStore } = useStores()
  const idInputRef = useRef<RefInputType>(null)
  const [deleteRow, setDeleteRow] = useState<recuritTable>()
  const {
    recruitList,
    loading,
    getRecruitList,
    updateRecruitApply,
    deleteRecruitApply
  } = recuritStore
  useEffect(() => {
    getRecruitList()
  }, [])
  //
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username'
    },
    {
      title: 'Id',
      dataIndex: 'id',
      filterIcon: <IconSearch />,
      filterDropdown: ({
        filterKeys,
        setFilterKeys,
        confirm
      }: {
        filterKeys?: string[]
        setFilterKeys?: (filterKeys: string[], callback?: Function) => void
        confirm?: Function
      }) => {
        return (
          <div className="arco-table-custom-filter">
            <Input.Search
              ref={idInputRef}
              searchButton
              placeholder="Please enter name"
              value={filterKeys?.[0] || ''}
              onChange={(value) => {
                setFilterKeys?.(value ? [value] : [])
              }}
              onSearch={() => {
                confirm?.()
              }}
            />
          </div>
        )
      },
      onFilter: (value: string | undefined, row: recuritTable) =>
        value ? row.id === parseInt(value) : true,
      onFilterDropdownVisibleChange: (visible: any) => {
        if (visible) {
          setTimeout(() => idInputRef?.current?.focus(), 150)
        }
      }
    },
    {
      title: '意愿部门',
      dataIndex: 'department',
      editable: true,
      filters: ['WEB', '后端', 'AI', '行政'].map((item) => {
        return {
          text: item,
          value: item
        }
      }),
      onFilter: (value: string, row: recuritTable) => {
        // console.log(value, row)
        return row.department === value
      },
      filterMultiple: false,
      render: (_: any, record: recuritTable) => {
        return (
          <Select
            className=""
            onChange={async (_) => {
              console.log(
                await recuritStore.updateRecruitApply(record.id, {
                  department: _
                })
              )
            }}
            defaultValue={record.department}
            options={['WEB', '后端', 'AI', '行政']}
          ></Select>
        )
      }
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
          <>
            <Select
              className=""
              defaultValue={record.status}
              onChange={async (_) => {
                await updateRecruitApply(record.id, {
                  status: _
                })
              }}
            >
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
          </>
        )
      },
      filters: ['pending', 'signed', 'rejected', 'approved'].map((item) => {
        return {
          text: item,
          value: item
        }
      }),
      onFilter: (value: string, row: recuritTable) => {
        // console.log(value, row)
        return row.status === value
      },
      filterMultiple: false
    },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_: any, record: any) => (
        <Button
          onClick={() => removeRow(record.key)}
          type="primary"
          status="danger"
        >
          Delete
        </Button>
      )
    }
  ]

  async function removeRow(key: any) {
    setDeleteRow(
      recruitList.find((item) => {
        if (item.id + item.username === key) {
          return item
        }
      })
    )
  }
  function addRow() {
    window.location.href = '/recruit'
  }

  return (
    <>
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
            }
          }}
          columns={columns.map((column) =>
            column.editable
              ? {
                  ...column,
                  onCell: () => ({
                    // onHandleSave: handleSave,
                  })
                }
              : column
          )}
          className="table-demo-editable-cell"
          expandedRowRender={(record) => {
            return (
              <>
                <p>
                  <strong>申请人：</strong>
                  <span className="text-green-600">{record.username}</span>
                </p>
                <p>
                  <strong>学院-专业：</strong>
                  <span className="text-gray-500">
                    {record.college} - {record.major}
                  </span>
                </p>
                <p>
                  <strong>入学年份：</strong>
                  <span className="text-red-400">{record.grade}</span>
                </p>
                <p>
                  <strong>申请部门：</strong>
                  <span className="text-blue-600"> {record.department}</span>
                </p>
                <p>
                  <strong>申请理由：</strong>
                  {record.bio}
                </p>
                {/* <p>
                  <strong>QQ：</strong>
                  <span className="text-green-600">{record.qqId}</span>
                </p> */}
              </>
            )
          }}
          expandProps={{
            icon: ({ expanded, record, ...restProps }) =>
              expanded ? (
                <button {...restProps}>
                  <IconDown />
                </button>
              ) : (
                <button {...restProps}>
                  <IconRight />
                </button>
              ),
            width: 60,
            columnTitle: 'Expand',
            rowExpandable: (record) => record.key !== '4'
          }}
        />
      </section>
      <Modal
        title="Modal Title"
        visible={deleteRow !== undefined}
        onOk={async () => {
          await deleteRecruitApply(deleteRow?.id as number).then((res) => {
            Message.success('删除成功')
          })
        }}
        onCancel={() => {
          setDeleteRow(undefined)
          Message.warning('取消删除')
        }}
        autoFocus={false}
        focusLock={true}
      >
        <p>{` 确定要删除${deleteRow?.username}的申请吗？`}</p>
      </Modal>
    </>
  )
})
export default RecuritList
