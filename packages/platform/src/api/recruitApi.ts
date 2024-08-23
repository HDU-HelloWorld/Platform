import request from '@/utils/request'
const recruitApi = {
  //提交招新申请表单
  submitRecruitApply: (data: FormData) => {
    return request({
      url: '/recruit/apply',
      method: 'post',
      data,
    })
  },
  //获取招新列表 <>
  getRecruitList: (timeFrame: [string, string]) => {
    return request({
      url: '/recruit/apply/list',
      method: 'get',
      data: timeFrame, //时间范围
    })
  },
  //修改招新申请表单状态
  modifyRecruitApplyStatus: (id: number, status: number) => {
    //0:未审核 1:一面通过 2:一面未通过 3:二面通过 4:二面未通过 5:录取
    return request({
      url: '/recruit/apply/status',
      method: 'put',
      data: {
        id,
        status,
      },
    })
  },
}
export default recruitApi
