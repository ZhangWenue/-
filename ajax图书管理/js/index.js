const creator = "洛鲸"
let booklist
let delate
let edit
function getBookList() {
  axios({
    url: "https://hmajax.itheima.net/api/books",
    params: {
      creator
    }
  }).then(result => {
    booklist = result.data.data
    document.querySelector('.list').innerHTML = booklist.map((item, index) => {
      return `
      <tr class="tr${index + 1}">
      <td>${index + 1}</td>
      <td>${item.bookname}</td>
      <td>${item.author}</td>
      <td>${item.publisher}</td>
      <td data-id=${item.id}>
        <span class="del">删除</span>
        <span class="edit">编辑</span>
      </td>
      </tr>
      `
    }).join(" ")
  })
}
getBookList()

// 增加
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
document.querySelector('.add-btn').addEventListener('click', () => {
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  axios({
    url: 'https://hmajax.itheima.net/api/books',
    method: 'POST',
    data: {
      ...bookObj,
      creator
    }
  }).then(() => {
    getBookList()
    addForm.reset()
    addModal.hide()
  })
})

// 删除
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('del')) {
    const theId = e.target.parentNode.dataset.id
    // alert(`确认要删除${}这本书吗？`)
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,
      method: 'DELETE'
    }).then(() => {
      getBookList()
    })
  }
})

// 修改
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('edit')) {
    const theId = e.target.parentNode.dataset.id
    axios({
      url: `https://hmajax.itheima.net/api/books/${theId}`
    }).then(result => {
      const bookObj = result.data.data
      const keys = Object.keys(bookObj)
      keys.forEach(key => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key]
      })
    })
    editModal.show()
  }
})
document.querySelector('.edit-btn').addEventListener('click', () => {
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
  axios({
    url: `https://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(() => {
    getBookList()
    editModal.hide()
  })
})