const router = require("express").Router();
const fetch = require("node-fetch");
const { breeds, temperament } = require("../db");
const { createDog, findAll, dogDetail, dogTemp } = require('../models/breed')

const { API_KEY } = process.env;

// const breedSplice = require('./functions')

let breedId = 300;
router.post("/dogs", async function (req, res) {
  const { name, height, weight, years, tempName, sex } = req.body;
  console.log(req.body);
  try {
    let newBreed = await breeds.create({
      id: breedId++,
      name,
      sex,
      height,
      weight,
      years
    });
    console.log(newBreed);

    await newBreed.setTemperament(tempName);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/dogs", async function (req, res) {
  // query: despues del ?
  var { name } = req.query;
  if (name) {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .then((data) => data.json())
      .then(async (json) => {
        let breed = await breeds?.findAll({
          include: [
            {
              model: temperament,
              required: true,
            },
          ],
        });
        breed.map((data) => {
          if (data.dataValues.name.includes(name)) {
            let temperament = data.dataValues.temperament.map((temp) => {
              return temp.dataValues.tempName;
            });
            data.dataValues.temperament = temperament[0];
            json.push(data.dataValues);
          }
        });

        if (json.length > 0) {
          let breedStorage = [];

          for (let i = 0; i < json.length; i++) {
            let breed1 = {
              id: json[i].id,
              name: json[i].name,
              img:
                `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg` ||
                "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
              temperament: json[i].temperament || json[i].temperamentos,
            };
            breedStorage.push(breed1);
          }
          res.json(breedStorage);
        }
      });
  } else {
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
      .then((data) => data.json())
      .then(async (json) => {
        let breedscr = await breeds?.findAll({
          include: Temperament,
        });
        breedscr?.map((data) => {
          let temperaments = data.dataValues.temperament.map((temp) => {
            return temp.dataValues.tempName;
          });
          data.dataValues.temperament = temperaments[0];
          json.push(data.dataValues);
        });

        let breed2 = json.map((data) => {
          return {
            id: data.id,
            img:
              (data.image && data.image.url) ||
              "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
            name: data.name,
            temperament: data.temperament || data.temperamentos,
          };
        });

        breed2.sort((a, b) => (a.name > b.name ? 1 : -1));

        res.json(breed2);
      });
  }
});

router.get("/dogs/:idRaza", async function (req, res) {
  var { idRaza } = req.params;
  fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    .then((data) => data.json())
    .then(async (json) => {
      let raza = json?.find((data) => data.id === parseInt(idRaza));
      if (raza) {
        return res.json({
          img:
            (raza.image && raza.image.url) ||
            "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
          name: raza.name || "No se ha encontrado",
          temperament:
            raza.temperament || raza.temperamentos || "No se ha encontrado",
          weight: raza.weight.metric || "No se ha encontrado",
          height: raza.height.metric || "No se ha encontrado",
          life_span: raza.life_span || "No se ha encontrado",
        });
      } else {
        let breed3 = await breeds?.findAll({
          include: [
            {
              model: temperament,
              required: true,
            },
          ],
        });

        // console.log(userBreeds)
        let idFinder = breed3.find(
          (data) => data.dataValues.id === parseInt(idRaza)
        );
        if (idFinder) {
          return res.json({
            img:
              idFinder.dataValues.img ||
              "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
            name: idFinder.dataValues.name || "No se ha encontrado",
            temperament:
              idFinder.dataValues.temperamentos[0].tempName ||
              "No se ha encontrado",
            weight: idFinder.dataValues.weight || "No se ha encontrado",
            height: idFinder.dataValues.height || "No se ha encontrado",
            life_span: idFinder.dataValues.life_span || "No se ha encontrado",
          });
        }
        return res.status(404).json({ message: "No se ha encontrado" });
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
});


let temp = [];
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((json) => {
    json?.map((data) => {
      let temps = data.temperament?.split(", ");
      temps?.forEach((data) => {
        if (!temp.find((tp) => tp.name === data)) {
          temp.push({ name: data });
        }
      });
    });
  })
  .then(() => {
    temp.map((data) => {
      temperament.findOrCreate({
        where: {
          name: data.name,
        },
      });
    });
  })
  .catch((err) => console.error(err));

router.get("/temperament", async function (_req, res) {
  await temperament.findAll().then((result) => res.json(result));
});

module.exports = router;
