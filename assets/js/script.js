const contactForm = document.getElementById('contact-form')
const submitBtn   = contactForm.querySelector('[type="submit"]')

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault()

  submitBtn.disabled    = true
  submitBtn.textContent = 'Enviando...'

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:     contactForm.querySelector('[name="name"]').value,
        email:    contactForm.querySelector('[name="email"]').value,
        whatsapp: contactForm.querySelector('[name="whatsapp"]').value,
        message:  contactForm.querySelector('[name="message"]').value,
      })
    })

    if (res.ok) {
      submitBtn.textContent = '✓ Mensagem Enviada!'
      contactForm.reset()
    } else {
      throw new Error('Erro no servidor')
    }
  } catch (error) {
    console.error(error)
    submitBtn.textContent = '❌ Erro — Tente Novamente'
  } finally {
    setTimeout(function () {
      submitBtn.disabled    = false
      submitBtn.textContent = 'Enviar Mensagem'
    }, 4000)
  }
})