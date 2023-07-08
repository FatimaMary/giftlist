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

export const getAllProducts = (req, res) => {
  Products.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(404).json("Error: ", err));
};

export const getProductsByParticipantsId = (req, res) => {
  const participantsId = req.params.participantsId;
  Products.findOne({ participantsId: participantsId })
    .then((products) => {
      if (products.length === 0) {
        res.status(200).json("No Products Found");
      } else {
        const productDetails = products.map((product) => {
          return {
            productId: product.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            description: product.description,
            eventId: product.eventId,
            participantsId: product.participantsId,
          };
        });
        res.json(productDetails);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const getProductsByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Products.findOne({ eventId: eventId })
    .then((products) => {
      if (products.length === 0) {
        res.status(200).json("No Products Found");
      } else {
        const productDetails = products.map((product) => {
          return {
            productId: product.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            description: product.description,
            eventId: product.eventId,
            participantsId: product.participantsId,
          };
        });
        res.json(productDetails);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
