import { Router } from "express";
import { saveImageToDB, uploadImageToS3, getImagesFromUsername, updateImagePrice } from "../util/image";
var router = Router();

/* POST for uploading images. */
router.post("/upload", async (req, res, next) => {
  const {
    picture: { name, encoding },
    price,
    username
  } = req.body;
  const imageS3Url = await uploadImageToS3({ key: name, encoding });
  // TODO: Save image to DB
  const imageObject = await saveImageToDB({imageS3Url, name, price, username});

  res.send({ image: imageObject });
});

/* GET for fetching images from a username. */
router.get("/images/:username", async (req, res, next) => {
  const {username} = req.params;
  const images = await getImagesFromUsername(username);
  res.send({images});
});

/* POST for changing image price. */
router.post("/update-price", async (req, res, next) => {
  const {
    name,
    updatedPrice,
    username
  } = req.body;
  const imageObject = await updateImagePrice({name, updatedPrice, username});

  res.send({ image: imageObject });
});

export default router;
