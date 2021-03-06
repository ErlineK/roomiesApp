const express = require("express");
const router = express.Router();
const auth = require("../../helpers/auth");

// Load House model
const House = require("../../models/House");

// /**
//  * @route       GET api/houses/
//  * @description Get all houses
//  * @access      Private
//  */
// router.get("/", (req, res) => {
//   House.find()
//     .sort({ active: +1 })
//     .then(houses => res.json(houses))
//     .catch(err => res.status(404).json({ noHousesfound: "No houses found" }));
// });

/**
 * @route       GET api/houses
 * @description Get all houses for userId
 * @access      Public
 */
router.get("/:userId", auth, (req, res) => {
  console.log("fetching houses for user id " + req.params.userId);
  House.find({ tenants: req.params.userId })
    .populate({ path: "tenants" })
    .sort({ active: -1, opened: -1 })
    .then(houses => res.json({ msg: "Got houses successfully", houses }))
    .catch(err => res.status(404).json({ error: "No houses found" }));
});

// /**
//  * @route       GET api/houses/:id
//  * @description Get single house by id
//  * @access      Public
//  */
// router.get("/:id", (req, res) => {
//   House.findById(req.params.id)
//     .then(house => res.json(house))
//     .catch(err => res.status(404).json({ error: "No house found" }));
// });

/**
 * @route       POST api/houses
 * @description add/save house
 * @access      Public
 */
router.post("/", auth, (req, res) => {
  console.log("adding new house");

  const reqDataHouse = req.body.newHouse;

  const newHouse = new House({
    admin: req.body.userId,
    houseName: reqDataHouse.houseName,
    address: reqDataHouse.address,
    city: reqDataHouse.city,
    province: reqDataHouse.province,
    description: reqDataHouse.description,
    tenants: reqDataHouse.tenants
  });

  console.log(newHouse);

  newHouse
    .save()
    .then(house => {
      // set all other houses of that user to active: false
      setAllHousesNotActive(req.body.userId, house.id);

      // return entire user houses list
      House.find({ tenants: [req.body.userId] })
        .populate({ path: "tenants" })
        .sort({ active: -1 })
        .then(houses => res.json({ msg: "House added successfully", houses }))
        .catch(err =>
          res.status(404).json({ error: "Error getting houses list" })
        );
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: "Unable to add this house" });
    });
});

/**
 * update all user's houses to be not active except one
 */
function setAllHousesNotActive(userId, exeptionHouseID) {
  House.updateMany(
    {
      _id: { $ne: exeptionHouseID },
      tenants: userId,
      active: true
    },
    { $set: { active: false } }
  )
    .then(houses => {
      console.log("updated unactive houses: ");
      console.log(houses);
      // res.json({ msg: "Houses updated successfully", houses });
    })
    .catch(err => {
      console.log("Could not find unactive houses");
      console.log(err);
      // res.status(400).json({ error: "Error updating houses" });
    });
}

/**
 * @route       PUT api/houses/:id
 * @description Update house
 * @access      Public
 */
router.put("/:id", auth, (req, res) => {
  House.findByIdAndUpdate(req.params.id, req.body)
    .then(house => res.json({ msg: "Updated successfully", house }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

/**
 * @route       PUT api/houses/remove/:id
 * @description Remove house for tenant. If no tenants left in house - delete house
 * @access      Public
 */

//  TODO: set that
// router.put("/reamove/:id", (req, res) => {
//   House.findByIdAndUpdate(req.params.id, req.body)
//     .then(house => res.json({ msg: "Updated successfully", house }))
//     .catch(err =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

// TODO: add tenants to house

/**
 * @route       DELETE api/houses/:id
 * @description Delete house by id
 * @access      Private
 */
router.delete("/:id", (req, res) => {
  House.findByIdAndRemove(req.params.id, req.body)
    .then(house => res.json({ mgs: "House entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such a house" }));
});

module.exports = router;
