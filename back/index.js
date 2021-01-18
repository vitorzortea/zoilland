const restify = require('restify');
const errs = require('restify-errors');
const jwt = require('jsonwebtoken');
const SECRET = 'meuSecret';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
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

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

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
server.post('/login', (req, res, next) => {
    const { email, senha } = req.body;
    knex('users')
        .where('email', email)
        .where('senha', senha)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('Email ou senha invalidos'))
            const token = jwt.sign({idusers: dados.idusers}, SECRET, {expiresIn: 30000});
            res.send({auth: true, token: token});
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
server.post('/user', (req, res, next) => {
    knex('users')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
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