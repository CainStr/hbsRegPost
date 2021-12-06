
// для проверки подключения скрипта 
console.log('work')
// чтобы найти форму . $-условный знак, о котором договорились для ДОМ элементов
const $postAddForm = document.forms.postaddform
//к дом элементу проверяем обращение через браузер document.querySelector('[data-postwr]')
const $postsWr = document.querySelector('[data-postswr]')
// Кнопка для заагрузки постов, на которую повесим загрузку , при прокрутке
const $loadBtn = document.querySelector('[data-load]')

// создаем функцию с разметкой  в виде строки с шаблонными строками, в которую передадим аргументом объект и вытащим константы через деструктуризацию проверяем, что  в hbs  естьт data- атрибут для обращения к нему, копируем разметку 

const generateHtmlForPost = (postOb) => {
  // Вставляем разметку из hbs  и меняем {{{}}}на шаблонные строки `${} и this на аргумент передаваемый`
  return `<div data-id = "${postOb.id}" class="card my-4" style="width: 18rem;">
			<img src="${postOb.picture}" class="card-img-top" alt="${postOb.title}">
			<div class="card-body">
				<h5 class="card-title">${postOb.title}</h5>
				<p class="card-text">${postOb.description}</p>
				<a data-action="delete" href="#" class="btn btn-danger">Delete</a>
			</div>
		</div>`
}

// вешаем на форму оброботчик событий submit
//сталкиваемся с проблемой , что main.js подключен ко всем страницам через layout , при переходе на другие страницы , где нет формы будет вылетать ошибка, для устранения этой проблемы нужно добавить "оператор опциональной последовательности (для  проверки наличия на странице искомого ДОМ элемента"
$postAddForm?.addEventListener('submit', async (event) => {
  // обнуляем дефолтное действие формы , чтобы сраница не обновлялась
  event.preventDefault()
  // Достаем объект , собранный из инпутов формы 
  const formData = Object.fromEntries(new FormData(event.target))

  // ответ от сервера . Фетч работает в 2 этапа 1) статус запроса , 2 ) тело объекта
  const response = await fetch('/posts', {
    // каким методом идет отправка
    method: 'POST',
    // указываем тип данный в заголовке
    headers: {
      // Ключ в кавычках , чтобы js понял что это единое целое и дефис не разделяет. сработает благодаря мидваре app.use(express.json())
      'Content-Type': 'application/json',
    },
    //какое тело передаем 
    body: JSON.stringify(formData)
  })
  //Дожидаемся второго эапа феча ( объекта)
  const newPostFromServer = await response.json()


  // метод вставляющий html разметку в DOM дерево (буквально переводится вставить по соседству ) ( аргументом принимается место куда я хочу вставить  )
  $postsWr.insertAdjacentHTML('afterbegin', generateHtmlForPost(newPostFromServer))
  //Для очистки формы , после добавления поста
  event.target.reset()

})
// вешаем обрабочик собыий на $postsWr --> внешний блок  
$postsWr?.addEventListener('click', async (event) => {
  // пиши проверку, что если событие по элементу dom c dataset(вытаскивает значение атрибута data- ).action равное значению этого атрибута равному delete
  if (event.target.dataset?.action === 'delete') {
    event.preventDefault()
    //нужен id картоочки , ищем с помощью closest верхнего родителя с data артрибутом id
    const $postsWr = event.target.closest('[data-id]')
    const postId = $postsWr.dataset.id

    if (await deletePost(postId, 3, 1e3))
      $postsWr.remove()
  }
})

const deletePost = async (id, countAttempt, delay) => {
  try {
    if (countAttempt === 0) throw new Error('Server ot responded')

    const response = await fetch('/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    if (response.status === 200) {
      return true
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(deletePost(id, countAttempt - 1, delay))
      }, delay)
    })

  } catch (error) {
    alert('Some error on server')
    return false
  }
}

async function loadNewPosts() {
  const offset = +$loadBtn.dataset.load

  const response = await fetch(`/posts/get?offset=${offset}`)
  const newPosts = await response.json()
  const resultStr = newPosts.reduce((aac, post) => aac += generateHtmlForPost(post), '')

  $loadBtn.dataset.load = offset + 1
  $postsWr.insertAdjacentHTML('beforeend', resultStr)
}

$loadBtn.addEventListener('click', (event) => {
  event.preventDefault()
  loadNewPosts()
})

const optios = {
  threshold: 1.0,
}
const callback = (entries, observer) => {
  if (entries[0].isIntersecting) {
    loadNewPosts()
  }
}

const observer = new IntersectionObserver(callback, optios)

observer.observe($loadBtn)
