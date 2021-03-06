import service from '@/utils/request'
export function fetchList(query) {
  return service.get('/get_all_articles', {
    params: query
  })
}
// 获取文章具体内容，当点击编辑按钮时会触发
export function fetchContent(id) {
  return service.get('/get_article', {
    params: {
      'id': id
    }
  })
}
// 用于新建文章
export function postArticle(condition) {
  console.log(condition)
  return service.post('/add_article', {
    'title': condition.title,
    'subtitle': condition.subtitle,
    'time': condition.time,
    'category': condition.category,
    'status': condition.status,
    'cover': condition.cover,
    'content': condition.content
  })
}
// 用于保存编辑的文章
export function updateArticle(condition) {
  console.log(condition)
  return service.post('/update_article', {
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
// 设置文章取消置顶
export function cancelTop(id) {
  return service.get('/cancel_top', {
    params: {
      'id': id
    }
  })
}

export function setTop(id) {
  return service.get('/set_top', {
    params: {
      'id': id
    }
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

export function fetchArticle(article) {
  return service({
    url: '/article/article',
    method: 'get',
    params: { article }
  })
}

export function fetchPv(pv) {
  return service({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

