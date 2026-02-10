export default async function handler(req, res) {
  const { user, pass } = req.body;

  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    return res.json({ status: true });
  }

  res.json({ status: false });
}
