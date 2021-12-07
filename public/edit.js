
// для проверки подключения скрипта 
console.log('work')

const $posteditForm = document.forms.postEditForm
$posteditForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = Object.fromEntries(new FormData($posteditForm))
  console.log(formData)
  const id = $posteditForm.dataset.id
  console.log(`/edit/${id}`)
  const response = await fetch(`/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })

  if (response.ok) {
    window.location = '/posts'
  }

})
//
