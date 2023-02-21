export default async function handler(req, res) {
  if (!isValidRequest(req)) {
    return res.status(401).json({ message: 'Invalid request' })
  }

  try {
    const pathToRevalidate = getPathToRevalidate(req)
    if (!pathToRevalidate) res.status(202).json({ message: 'alive' })
    await res.revalidate(pathToRevalidate)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating: ' + err })
  }
}

const isValidRequest = (req) => {
  const signature = req.headers['x-blocken-signature']
  return signature == process.env.BLOCKEN_TOKEN
}
const getPathToRevalidate = (req) => {
  if (!req.body.article) return
  return `/posts/${req.body.article}`
}
