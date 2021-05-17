import request from '../utils/request'

export function getPictureList(pageNo, pageSize) {
  const params = { page: pageNo, page_size: pageSize }
  return request({
    url: 'pictures',
    method: 'get',
    params,
  })
}
