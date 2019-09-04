const express = require('express');

const server = express();


server.use(express.json());

let numberRequests = 0;
const projects = [];


//Middleware de verificação de projetos

function checkProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  
  if (!project) {
    return res.status(400).json({ error: 'Project is required' });
  }

  return next();
}

//Middleware de contagem de requisições

function countRequests(req, res, next){
  numberRequests++;

  console.log(`Total de requisições: ${numberRequests}`);

  return next();
}

server.use(countRequests);


//listar todos os projetoss

server.get('/projects', (req, res) => {
return res.json(projects);
});


//criar projetos

server.post('/projects', (req, res) =>{
const { id, title } = req.body;
const project = {
  id,
  title,
  tasks: []
};

projects.push(project);

return res.json(project);
});

//editar projetos

server.put('/projects/:id', checkProjectExist, (req, res) =>{
const { id } = req.params;
const { title} = req.body;
const project = projects.find(p => p.id == id);

projects.title = title;

return res.json(project);
});

//deletar projetos

server.delete('/projects/:id', checkProjectExist, (req, res) =>{
  const { id } = req.params;
  const projectLocation = projects.findIndex(p => p.id == id);

  projects.splice(projectLocation, 1);

  return res.send();
});

//receber titulo e armazenar nova tarefa 

server.post('/projects/:id/tasks', checkProjectExist, (req, res) =>{
	const { id } = req.params;
	const { title } = req.body;
  
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);
  
	return res.json(project)
});
 
server.listen(4000);

