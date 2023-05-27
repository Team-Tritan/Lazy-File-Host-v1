import { Router, Request, Response } from "express";
import path from "path";
import config from "../../config";

const router: Router = Router();

function generateRandomName(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/", (req: Request, res: Response) => {
  try {
    const { key } = req.headers;

    if (!config.keys.includes(key)) {
      return res.status(403).send({
        status: 403,
        message: "Invalid token, get fucked dumbass.",
      });
    }

    if (!req.files) {
      return res.status(404).send({
        status: 404,
        message: "No file uploaded, are you fucking stupid?",
      });
    }

    const { sharex } = req.files;
    const ext = path.extname(sharex.name);
    const name = generateRandomName(10);
    const dir = config.dirs[Math.floor(Math.random() * config.dirs.length)];

    sharex.mv(`./uploads/${name}${ext}`);
    res.send({
      status: 200,
      message: "File just got uploaded!",
      url: `${dir}/${name}${ext}`,
    });
  } catch (err) {
    res.status(500).send(err);
    console.error(`[ERROR] ${err.stack}`);
  }
});

export default router;