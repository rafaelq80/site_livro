export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, whatsapp, message } = req.body

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id:     process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: { name, email, whatsapp, message }
    })
  })

  if (response.ok) {
    res.status(200).json({ success: true })
  } else {
    const text = await response.text()
    console.error('EmailJS error:', response.status, text)
    res.status(500).json({ error: text })
  }
}