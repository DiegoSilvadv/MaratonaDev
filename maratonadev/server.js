// exemplo
// const cor ="red"
// const tamanho = 2.5

// function verificarSeoCopoEstaSujo(sujo){
//     return `o copo: ${sujo}`
// }

// const copo = {
//     cor,
//     tamanho,
//     verificarSeoCopoEstaSujo,
// }

// console.log(copo.verificarSeoCopoEstaSujo("esta sujo"));
// fim do exemplo













// configurando o servidor 
const express = require("express");
const server = express();

// configurar o servidor para apresentar arquivos estaticos (css, imagens, script do front-end) 
server.use(express.static('public'));

// habilitar o body do formulario
server.use(express.urlencoded({ extended:true }));

// configurar a conexao com banco de dados 
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5232,
    database: 'doe'
})

// configurando a template engine
const nunjucks = require ("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true, //boolean ou boleano true ou false
});


const donors = [
    {
        name: "Diego da Silva",
        blood: "AB+"
    },

    {
        name: "Hinara de Moura Cubas ",
        blood: "B+"
    },

    {
        name: "Tere de Moura",
        blood: "A+"
    },

    {
        name: "Wesley de Moura",
        blood: "AB+"
    },
]

// configurar a apresentção da página
server.get("/", function(req, res){

    db.query("SELECT * FROM donors", function(err){
        if(err) return res.send("erro no banco de dados");

        const donors = result.rows 
        return res.render("index.html", { donors });

    })

    // renderizando o html
    const donors = []
    return res.render("index.html", { donors });
});

//post que vai ser usado pelo button do form
server.post("/", function(req, res) {
// pegar dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood  == "") {
        return res.send("Campos obrigatórios");
    }

// coloco valores dentro do banco de dados
const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`
const values = [name, email, blood];

db.query(query, values, function(err){
    // se der erro ele exibe a mensagem
    if(err) return res.send("Erro no banco de dados");

    return res.redirect("/");
})
db.query(query, [name, email, blood]);


// redirecionamento para a página
    return res.redirect("/");
});



// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
    console.log("Server iniciado");
});



