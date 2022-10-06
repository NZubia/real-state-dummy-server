var express = require('express');
var router = express.Router();

const {
  House
} = require('../models/house.model');
const {User} = require("../models/user.model");

/* GET users listing. */
router.get('/list', async function(req, res, next) {
  const houseType = req.query.houseType;
  const buildingType = req.query.buildingType;
  const minPrice = req.query.minPrice;
  const maxPrice = req.body.maxPrice;
  const houseLong = req.body.houseLong;
  const houseLat = req.body.houseLat;

  let query;

  // Query creation
  if (houseType || buildingType || minPrice || maxPrice || (houseLong && houseLat) ) {
    query = {$and: []};

    if (houseType) {
      query["$and"].push({houseType: houseType});
    }

    if (buildingType) {
      query["$and"].push({buildingType: buildingType});
    }

    if (minPrice) {
      query["$and"].push({price: {"$gte": minPrice}});
    }

    if (maxPrice) {
      query["$and"].push({price: {"$lte": maxPrice}})
    }

    if (houseLong && houseLat) {
      query["$and"].push(
          {
            location: {
              $near: {
                $maxDistance: 1000,
                $geometry: {
                  type: "Point",
                  coordinates: [houseLong, houseLat]
                }
              }
            }
          }
      )
    }

  } else {
    query = {};
  }

  try {
    const housesList = await House.find(query);

    return res.status(200).json({
      "message": "OK",
      "obj": housesList
    })
  } catch (e) {
    return res.status(500).json({
      "message": e.message
    })
  }
});

router.post('/create', async function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const address = req.body.address;
  const houseType = req.body.houseType;
  const buildingType = req.body.buildingType;
  const price = req.body.price;
  const image = req.body.image;
  const houseLat = req.body.houseLat;
  const houseLong = req.body.houseLong;
  const ownerName = req.body.ownerName;
  const ownerPhone = req.body.ownerPhone;


    const newHouse = await new House({
      title: title,
      description: description,
      address: address,
      houseType: houseType,
      buildingType : buildingType,
      price: price,
      image: image,
      location: {
        "type": "Point",
        coordinates: [houseLong, houseLat]
      },
      ownerName: ownerName,
      ownerPhone: ownerPhone
    }).save()


    res.status(200).json({
      "message": "OK",
      "obj": newHouse
    })

});

router.get('/house-info', async function(req, res, next) {
  const houseId = req.query.houseId;

  if (houseId){
    const house = await House.findOne({
      _id: houseId
    });

    if (house) {

      return res.status(200).json({
        "message": "OK",
        "obj": house
      })
    } else {
      return res.status(400).json({
        "message": "There is no house with that ID"
      })
    }

  } else {
    return res.status(400).json({
      "message": "Several fields were missing"
    })
  }
});

router.post('/add-fav', async function(req, res, next) {
  const houseId = req.body.houseId;

  if (houseId){
    const house = await House.findOne({
      _id: houseId
    });
    if (house) {

      await House.updateOne({
        _id: houseId
      }, {
        $set: {
          favourite: true
        }
      });

      return res.status(200).json({
        "message": "OK"
      })
    } else {
      return res.status(400).json({
        "message": "There is no house with that ID"
      })
    }

  } else {
    return res.status(400).json({
      "message": "Several fields were missing"
    })
  }
});

router.post('/delete-fav', async function(req, res, next) {
  const houseId = req.body.houseId;

  if (houseId){
    const house = await House.findOne({
      _id: houseId
    });
    if (house) {

      await House.updateOne({
        _id: houseId
      }, {
        $set: {
          favourite: false
        }
      });

      return res.status(200).json({
        "message": "OK"
      })
    } else {
      return res.status(400).json({
        "message": "There is no house with that ID"
      })
    }

  } else {
    return res.status(400).json({
      "message": "Several fields were missing"
    })
  }
});

router.post('/get-fav', async function(req, res, next) {

    const favouriteHouses = await House.find({
      favourite: true
    });

  return res.status(200).json({
    "message": "OK",
    "obj": favouriteHouses
  })
});

module.exports = router;
