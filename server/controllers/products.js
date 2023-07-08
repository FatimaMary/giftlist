import Products from "../models/Products.js";

export const postProduct = (req, res) => {
  const productName = req.body.productName;
  const productUrl = req.body.productUrl;
  const productPrice = req.body.productPrice;
  const description = req.body.description;
  const eventId = req.body.eventId;
  const participantsId = req.body.participantsId;

  const newProduct = new Products({
    productName,
    productUrl,
    productPrice,
    description,
    eventId,
    participantsId,
  });

  newProduct
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json("Error: ", err));
};
