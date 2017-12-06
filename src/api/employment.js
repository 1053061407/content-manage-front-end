import service from '@/utils/fetch'
export function fetchAllEmployment(query) {
  return service.get('/get_all_hires', {
    params: query
  })
}

// 获取文章具体内容，当点击编辑按钮时会触发
export function fetchContent(id) {
  return service.get('/get_hire', {
    params: {
      'id': id
    }
  })
}
// 用于新建一条招聘
export function createEmployment(position) {
  console.log(position)
  return service.post('/add_hire', {
    'category': position.category,
    'position': position.position,
    'time': position.time,
    'status': position.status,
    'experience': position.experience,
    'education': position.eduction,
    'numbers': position.numbers,
    'detail': position.detail,
    'requirement': position.requirement,
    'welfare': position.welfare,
    'location': position.location
  })
}
// 用于保存编辑的招聘信息
export function updateEmployment(condition) {
  console.log(condition)
  return service.post('/update_hire', {
    'id': condition.id,
    'title': condition.title,
    'subtitle': condition.subtitle,
    'time': condition.time,
    'category': condition.category,
    'status': condition.status,
    'cover': condition.cover,
    'content': condition.content
  })
}

// 设置为发布状态
export function setPublish(id) {
  return service.get('/publish_article', {
    params: {
      'id': id
    }
  })
}
// 设置为草稿状态
export function setDraft(id) {
  return service.get('/draft_article', {
    params: {
      'id': id
    }
  })
}
// 删除文章
export function setDelete(id) {
  return service.get('/delete_article', {
    params: {
      'id': id
    }
  })
}

// 设置招聘信息为发布状态
export function setPublishEmploy(id) {
  return service.get('/publish_hire', {
    params: {
      'id': id
    }
  })
}
// 设置招聘信息为草稿状态
export function setDraftEmploy(id) {
  return service.get('/draft_hire', {
    params: {
      'id': id
    }
  })
}
// 删除招聘信息
export function setDeleteEmploy(id) {
  return service.get('/delete_hire', {
    params: {
      'id': id
    }
  })
}
