import { Router } from "express";
import { uploadImageToS3 } from "../util/uploadImage";
var router = Router();

/* POST for uploading images. */
router.post("/upload", async (req, res, next) => {
  const {
    picture: { name, encoding },
    price,
  } = req.body;
  const imageS3Url = await uploadImageToS3({ key: name, encoding });
  // TODO: Save image to DB
  res.send({ success: true });
});

export default router;
