const router = require("express").Router();
const { Grade } = require("../config/dbConfig");
const { User } = require("../config/dbConfig");
const Joi = require("joi");

//ruta pentru note
const validateGrade = (data) => {
  const schema = Joi.object({
    grade: Joi.number().required().label("Grade"),
    description: Joi.string().required().label("Description"),
  });
  return schema.validate(data);
};

router.get("/", async (req, res) => {
  try {
    const grades = await Grade.findAll();
    return res.status(200).json(grades);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error occured trying to get all grades" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { grade, description } = req.body;

    const { error } = validateGrade({ grade, description });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    await Grade.create(req.body);
    return res.status(201).json({ message: "Grade set!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error occured trying to grade a Project" });
  }
});

//preia notele date pentru un anumit proiect
//cauta id ul proiectului in baza de date si afiseaza toate notele date pentru acesta
router.get("/:gid", async (req, res) => {
  try {
    const grades = await Grade.findAll();
    let grade = grades.filter((e) => e.projectId == req.params.gid);
    if (grade) {
      return res.status(200).json(grade);
    }
    return res.status(404).json({ message: "Grade not found" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: `Error occured trying to get a grade with id = ${req.params.gid}`,
      });
  }
});

router.get("/grade/:gid", async (req, res) => {
  try {
    let grade = await Grade.findByPk(req.params.gid);
    if (grade) {
      return res.status(200).json(grade);
    }
    return res.status(404).json({ message: "Grade not found" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: `Error occured trying to get a grade with id = ${req.params.gid}`,
      });
  }
});

router.get("/:gid/mean", async (req, res) => {
  try {
    const grades = await Grade.findAll();
    let grade = grades.filter((e) => e.projectId == req.params.gid);
    if (grade) {
      //calculeaza media notelor unui proiect fara nota minima si maxima
      //daca nu are cel putin 2 note atunci nu va elimina minim si maxim
      var valmin = Math.min.apply(
        Math,
        grade.map(function (e) {
          return e.grade;
        })
      );
      var valmax = Math.max.apply(
        Math,
        grade.map(function (e) {
          return e.grade;
        })
      );
      console.log(valmin + " " + valmax);
      totalul = grade.reduce((total, arg) => total + arg.grade, 0);
      let medie = 0;
      if (grade.length > 2) {
        medie = (totalul - valmax - valmin) / (grade.length - 2);
      } else {
        medie = totalul / grade.length;
      }
      //console.log(totalul / grade.length);
      return res.status(200).json(medie);
    }
    return res.status(404).json({ message: "Grade not found" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: `Error occured trying to get a grade with projectId = ${req.params.gid}`,
      });
  }
});

router.put("/:gid", async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.gid);
    if (grade) {
      const { grade, description } = req.body;
      const { error } = validateGrade({ grade, description });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      await grade.update(req.body);
      return res.status(200).json(project);
    }
    return res.status(404).json({ message: "Grade not found" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: `Error occured trying to update a grade with id = ${req.params.gid}`,
      });
  }
});

router.delete("/:gid", async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.gid);
    if (grade) {
      await grade.destroy();
      return res.status(200).json({ message: "Grade removed!" });
    }
    return res.status(404).json({ message: "Grade not found" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        message: `Error occured trying to delete a grade with id = ${req.params.gid}`,
      });
  }
});

module.exports = router;
