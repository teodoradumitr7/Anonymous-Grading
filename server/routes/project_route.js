const router = require('express').Router();
const { Project } = require('../config/dbConfig');
const {User}=require('../config/dbConfig');
const Joi = require('joi');

//ruta pentru proiecte
//se foloseste schema joi pentru a valida inputul
const validateProject = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label('Title'),
        description: Joi.string().required().label('Description'),
        url: Joi.string().required().label('Url'),
        video: Joi.string().required().label('Video')
    });
    return schema.validate(data);
};

router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json(projects);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error occured trying to get all projects' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {title,description,url,video } = req.body;
        
        const { error } = validateProject({ title,description,url,video });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        await Project.create(req.body);
        return res.status(201).json({ message: 'Project created!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error occured trying create a Project' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.pid);
        if (project) {
            return res.status(200).json(project);
        }
        return res.status(404).json({ message: 'Project not found' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error occured trying to get a project with id = ${req.params.pid}` });
    }
});



router.put('/:pid', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.pid);
        if (project) {
            const { title,description,url,video } = req.body;
            const { error } = validateProject({ title,description,url,video});
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            await project.update(req.body);
            return res.status(200).json(project);
        }
        return res.status(404).json({ message: 'Project not found' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error occured trying to update a project with id = ${req.params.pid}` });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.pid);
        if (project) {
            await project.destroy();
            return res.status(200).json({ message: 'Project deleted!' });
        }
        return res.status(404).json({ message: 'Project not found' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: `Error occured trying to delete a project with id = ${req.params.pid}` });
    }
});

module.exports = router;