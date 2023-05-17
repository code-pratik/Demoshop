import { withSessionRoute } from "../lib/config/withsession";
const VALID_EMAIL = "test@gmail.com";
const VALID_PASSWORD = "password";

const user= [{email:"test@gmail.com",password:""}]

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      req.session.user = {
        username: "test@gmail.com",
        isAdmin: true,
      };
      await req.session.save();
      res.send({ ok: true });
    }
    return res.status(403).send("");
  }
  return res.status(404).send("");
}
