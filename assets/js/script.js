emailjs.init(EMAILJS_CONFIG.publicKey)

const contactForm = document.getElementById('contact-form')
const submitBtn   = contactForm.querySelector('[type="submit"]')

contactForm.addEventListener('submit', function (e) {
	e.preventDefault()

	submitBtn.disabled    = true
	submitBtn.textContent = 'Enviando...'

	emailjs
		.sendForm(
			EMAILJS_CONFIG.serviceId,
			EMAILJS_CONFIG.templateId,
			contactForm,
		)
		.then(function () {
			submitBtn.textContent = '✓ Mensagem Enviada!'
			contactForm.reset()

			setTimeout(function () {
				submitBtn.disabled    = false
				submitBtn.textContent = 'Enviar Mensagem'
			}, 4000)
		})
		.catch(function (error) {
			console.error('Erro EmailJS:', error)
			submitBtn.disabled    = false
			submitBtn.textContent = '❌ Erro — Tente Novamente'

			setTimeout(function () {
				submitBtn.textContent = 'Enviar Mensagem'
			}, 4000)
		})
})