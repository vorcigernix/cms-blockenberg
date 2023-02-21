export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (!isValidRequest(req)) {
    return res.status(401).json({ message: 'Invalid request' })
  }

  try {
    const pathToRevalidate = getPathToRevalidate(req)
    if (!pathToRevalidate) return res.status(202).json({ message: 'Alive' })

    await res.revalidate(pathToRevalidate)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating: ' + err })
  }
}

const isValidRequest = (req) => {
  const signature = req.headers['x-blocken-signature']
  //console.log(signature, process.env.BLOCKEN_TOKEN)
  return signature == process.env.BLOCKEN_TOKEN
}

const getPathToRevalidate = (req) => {
  if (!req.body.article) return
  return `/posts/${req.body.article}`
}
