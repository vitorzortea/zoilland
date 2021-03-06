const restify = require('restify');
const errs = require('restify-errors');
const jwt = require('jsonwebtoken');
const corsMiddleware = require('restify-cors-middleware');
const SECRET = 'meuSecret';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
const cors = corsMiddleware({  
    origins: ["*"],
    allowHeaders: ["Authorization", "x-access-token"],
    exposeHeaders: ["Authorization"]
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'vitorz00_zoiland'
    }
});

server.pre(cors.preflight);  
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(cors.actual);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//Rotas Rest
server.get('/', verifyJWT, (req, res, next) => {
    knex('users')
    .then((dados) => {
        res.send(dados);
    }, next)
});

//Autenticação
server.post('/newuser', (req, res, next) => {
    knex('users')
        .insert(req.body)
        .then((dados) => {
            res.send({create: true, data: dados});
        }, next);
});
server.post('/login', (req, res, next) => {
    const { email, senha } = req.body;
    knex('users')
        .where('email', email)
        .where('senha', senha)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('Email ou senha invalidos'))
            const token = jwt.sign({idusers: dados.idusers}, SECRET, {expiresIn: 30000});
            res.send({
                token: token,
                user: {
                    nome: dados.nome,
                    email: dados.email,
                    avatar: dados.avatar,
                    createOn: dados.createOn,
                    zoicoin: dados.zoicoin
                }
            });
        }, next)
});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded)=> {
        if(err) return res.send(new errs.BadRequestError('Não autorizado'))
        req.userId = decoded.idusers
    });
    next();
}


//Usuários
server.get('/user', verifyJWT, (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.idusers;
    knex('users')
        .where('idusers', userId)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('User invalidos'))
            res.send({
                user: {
                    nome: dados.nome,
                    email: dados.email,
                    avatar: dados.avatar,
                    zoicoin: dados.zoicoin
                }
            });
        }, next)
});

//Pet
server.get('/pet', verifyJWT, (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.idusers;
    knex('pet')
        .where('users_idusers', userId)
        .then((pet) => {
            knex('especie').then((especie)=>{
                const pets = pet.map(element => {
                    const index = especie.findIndex((element2)=> element2.idespecie == element.especie_idespecie);
                    element.especie = especie[index];
                    const hj = new Date();
                    const timeDiff = Math.abs(hj.getTime() - element.data.getTime());
                    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    let status = 'Bebê'
                    let foto = element.especie.pic0
                    let colect = element.especie.colect0
                    if(diffDays >= element.especie.dia1 && diffDays < element.especie.dia2){
                        status = 'Criança'
                        foto = element.especie.pic1
                        colect = element.especie.colect1
                    }
                    if(diffDays >= element.especie.dia2 && diffDays < element.especie.dia3){
                        status = 'Adulto'
                        foto = element.especie.pic2
                        colect = element.especie.colect2
                    }
                    if(diffDays >= element.especie.dia3){
                        status = 'Ansião'
                        foto = element.especie.pic3
                        colect = element.especie.colect3
                    }
                    return {
                        id: element.idpet,
                        nivel: element.nivel,
                        nome: element.nome,
                        colect: colect,
                        tipo: element.especie.tipo,
                        dias: diffDays,
                        status: status,
                        img: foto,
                    }
                });
                res.send(pets);
            })
        }, next)
});
server.post('/pet/create', verifyJWT, (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.idusers;
    knex('pet')
        .insert({
            nome: req.body.nome,
            nivel: 1,
            coleta: 0,
            data: new Date(),
            diversao: 100,
            fome: 100,
            energia: 100,
            higiente: 100,
            genero: req.body.genero,
            users_idusers: userId,
            especie_idespecie: req.body.tipo
        })
        .then((dados) => {
            res.send({message: 'Pet Criado', pet: dados});
        }, next)
});



//----------------------------------------------------------------------------------------//
server.post('/create', (req, res, next) => {
    knex('especie')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next) 
});

server.get('/show/:id', (req, res, next) => {    
    const { id } = req.params;
    knex('especie')
        .where('idespecie', id)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)        
});

server.put('/update/:id', (req, res, next) => {    
    const { id } = req.params;
    knex('especie')
        .where('idespecie', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
    }, next)        
});

server.del('/delete/:id', (req, res, next) => {    
    const { id } = req.params;
    knex('especie')
        .where('idespecie', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)
        
});