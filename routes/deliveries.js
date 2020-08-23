const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");
const { check, validationResult } = require("express-validator");

const deliveryValidations = [
  check("client", "O cliente é obrigatório!").not().isEmpty(),
  check("weight", "O peso é obrigatório!").not().isEmpty(),
  check("address.street", "O logradouro é obrigatório!").not().isEmpty(),
  check("address.district", "O bairro é obrigatório!").not().isEmpty(),
  check("address.city", "A cidade é obrigatória!").not().isEmpty(),
  check("address.state", "O estado é obrigatório!").not().isEmpty(),
  check("address.country", "O país é obrigatório!").not().isEmpty(),
  check("address.geolocation.latitude", "A latitude é obrigatória!")
    .not()
    .isEmpty(),
  check("address.geolocation.longitude", "A longitude é obrigatória!")
    .not()
    .isEmpty(),
];

// @route   GET api/deliveries
// @desc    get and return deliveries
// @access  public
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();

    res.json(deliveries);
  } catch (err) {
    res.status(500).json({
      error: [
        {
          msg:
            "Algo deu errado, por favor verifique sua conexão e tente novamente.",
        },
      ],
    });
  }
});

// @route   POST api/deliveries
// @desc    add new delivery
// @access  public
router.post("/", deliveryValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { client, weight, address } = req.body;

  try {
    const newDelivery = new Delivery({
      client,
      weight,
      address,
    });

    const delivery = await newDelivery.save();

    res.json({ msg: "Entrega registrada com sucesso!", delivery });
  } catch (err) {
    res.status(500).json({
      error: [
        {
          msg:
            "Algo deu errado, por favor verifique sua conexão e tente novamente.",
        },
      ],
    });
  }
});

// @route   DELETE api/deliveries
// @desc    remove all deliveries
// @access  public
router.delete("/", async (req, res) => {
  try {
    await Delivery.deleteMany();
    res.json({ msg: "Entregas removidas com sucesso!" });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      error: [
        {
          msg:
            "Algo deu errado, por favor verifique sua conexão e tente novamente.",
        },
      ],
    });
  }
});

module.exports = router;
