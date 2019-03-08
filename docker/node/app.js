const express = require('express')
const app = express()
const mysql = require('mysql')
const morgan = require('morgan')

app.use(express.static('./public'))
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended: false}))
app.use(morgan('short'))


function getConnection () {
    return mysql.createConnection({
        host: 'mysql',
        user: 'root',
        database: 'financo',
        password: 'senhacadastro'
    })
}

app.get("/", (req, res) => {
    console.log("Root")
    res.send("API - Cadastro de Cliente PJ.")
})

app.post('/cliente_pj/inserir', (req, res) => {
    console.log('Criacao de usuario.')
    const cnpjID = req.body.cnpjID
    const RazaoSocial = req.body.RazaoSocial
    const NomeFantasia = req.body.NomeFantasia
    const EnderecoPJ = req.body.EnderecoPJ
    const InscrEstadual = req.body.InscrEstadual
    const Telefone = req.body.Telefone
    const NomeResponsavel = req.body.NomeResponsavel
        
    if(isNaN(cnpjID))
        {
            console.log('CNPJ Invalido');
            res.sendStatus(500)
            return
        }

    const sqlQuery = "insert into ClientePJ (cnpjID, RazaoSocial, NomeFantasia, " + 
                     "EnderecoPJ, InscrEstadual, Telefone, NomeResponsavel, StatusCliente" + 
                     ") values (?, ?, ?, ?, ?, ?, ?, 1) "

    getConnection().query(sqlQuery, [cnpjID, RazaoSocial, NomeFantasia, EnderecoPJ, 
        InscrEstadual, Telefone, NomeResponsavel], (err, results, fields) => {
        if (err) {
            console.log("Erro ao inserir registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Novo Cliente inserido com sucesso, CNPJ: ", cnpjID)
    })

    const mensagem = {Mensagem: "Cliente Inserido com Sucesso.", cnpjID: cnpjID}
    res.json(mensagem)
})

app.post('/cliente_pj/alterar', (req, res) => {
    console.log('Alterar usuario.')
    const cnpjID = req.body.cnpjID
    const RazaoSocial = req.body.RazaoSocial
    const NomeFantasia = req.body.NomeFantasia
    const EnderecoPJ = req.body.EnderecoPJ
    const InscrEstadual = req.body.InscrEstadual
    const Telefone = req.body.Telefone
    const NomeResponsavel = req.body.NomeResponsavel
        
    const sqlQuery = "update ClientePJ set RazaoSocial = ?, NomeFantasia = ?, " + 
                     "EnderecoPJ = ?, InscrEstadual = ?, Telefone = ?, NomeResponsavel = ? " + 
                     " where cnpjID = ? and StatusCliente = 1 "

    getConnection().query(sqlQuery, [RazaoSocial, NomeFantasia, EnderecoPJ, 
        InscrEstadual, Telefone, NomeResponsavel, cnpjID], (err, results, fields) => {
        if (err) {
            console.log("Erro ao alterar registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Cliente alterado com sucesso, CNPJ: ", cnpjID)
    })

    const mensagem = {Mensagem: "Cliente Alterado com Sucesso.", cnpjID: cnpjID}
    res.json(mensagem)
})

app.post('/cliente_pj/excluir', (req, res) => {
    console.log('Excluir usuario.')
    const cnpjID = req.body.cnpjID

        
    const sqlQuery = "update ClientePJ set StatusCliente = 0 " + 
                     " where cnpjID = ? and StatusCliente = 1 "

    getConnection().query(sqlQuery, [cnpjID], (err, results, fields) => {
        if (err) {
            console.log("Erro ao excluir registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Cliente excluido com sucesso, CNPJ: ", cnpjID)
    })

    const mensagem = {Mensagem: "Cliente Excluido com Sucesso.", cnpjID: cnpjID}
    res.json(mensagem)
})


app.get('/cliente_pj/listar_clientes', (req, res) => {

    const connection = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        database: 'financo',
        password: 'senhacadastro'
    })
    const sqlQuery = "select * from ClientePJ where StatusCliente = 1"
    connection.query(sqlQuery, (err, rows, fields) => {
        if (err) {
            console.log("Erro ao carregar os dados: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Dados carregados com suesso.")

        const clientes = rows.map((row) => {
            return{cnpjID: row.cnpjID, RazaoSocial: row.RazaoSocial, 
                    NomeFantasia: row.NomeFantasia, EnderecoPJ: row.EnderecoPJ,
                    InscrEstadual: row.InscrEstadual, Telefone: row.Telefone,
                    NomeResponsavel: row.NomeResponsavel}
        })

        res.json(clientes)
    })

})

app.get('/cliente_pj/buscar_cliente/:id', (req, res) => {
    console.log('CNPJ do Cliente: ' + req.params.id)

    const connection = getConnection()


    cnpjID = req.params.id
    const sqlQuery = "select * from ClientePJ where cnpjID = ? and StatusCliente = 1"
    connection.query(sqlQuery, [cnpjID], (err, rows, fields) => {
        if (err) {
            console.log("Erro ao carregar os dados: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Dados carregados com suesso.")

        const clientes = rows.map((row) => {
            return{cnpjID: row.cnpjID, RazaoSocial: row.RazaoSocial, 
                    NomeFantasia: row.NomeFantasia, EnderecoPJ: row.EnderecoPJ,
                    InscrEstadual: row.InscrEstadual, Telefone: row.Telefone,
                    NomeResponsavel: row.NomeResponsavel}
        })
        res.json(clientes)
    })

})



//##############################################################################
// Contas do Cliente

app.post('/cliente_pj/conta/inserir', (req, res) => {
    console.log('Criacao de Conta.')
    const cnpjID = req.body.cnpjID
    const codBanco = req.body.codBanco
    const codAgencia = req.body.codAgencia
    const codConta = req.body.codConta
    const descrConta = req.body.descrConta
        
    if(isNaN(cnpjID))
        {
            console.log('CNPJ Invalido');
            res.sendStatus(500)
            return
        }

    const sqlQuery = "insert into ClienteContaBancaria (cnpjID, codBanco, codAgencia, codConta, descrConta, statusConta)" + 
                     " values (?, ?, ?, ?, ?, 1) "

    getConnection().query(sqlQuery, [cnpjID, codBanco, codAgencia, 
                                     codConta, descrConta], (err, results, fields) => {
        if (err) {
            console.log("Erro ao inserir registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Nova conta inserida com sucesso, CNPJ: ", cnpjID)
    })

    const mensagem = {Mensagem: "Conta Inserida com Sucesso.", cnpjID: cnpjID}
    res.json(mensagem)
})

app.post('/cliente_pj/conta/alterar', (req, res) => {
    console.log('Alterar Conta.')
    const cnpjID = req.body.cnpjID
    const RazaoSocial = req.body.RazaoSocial
    const NomeFantasia = req.body.NomeFantasia
    const EnderecoPJ = req.body.EnderecoPJ
    const InscrEstadual = req.body.InscrEstadual
    const Telefone = req.body.Telefone
    const NomeResponsavel = req.body.NomeResponsavel
        
    const sqlQuery = "update ClienteContaBancaria set codBanco = ?, codAgencia = ?, " + 
                     "codConta = ?, descrConta = ? " + 
                     " where contaID = ? and cnpjID = ? "

    getConnection().query(sqlQuery, [codBanco, codAgencia, codConta, descrConta, 
                                        contaID, cnpjID], (err, results, fields) => {
        if (err) {
            console.log("Erro ao alterar registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Conta alterada com sucesso, contaID: ", contaID)
    })

    const mensagem = {Mensagem: "Conta Alterada com Sucesso.", contaID: contaID, cnpjID: cnpjID}
    res.json(mensagem)
})

app.post('/cliente_pj/conta/excluir', (req, res) => {
    console.log('Excluir Conta.')
    const contaID = req.body.contaID
    const cnpjID = req.body.cnpjID

        
    const sqlQuery = "update ClienteContaBancaria set StatusConta = 0 " + 
                     " where contaID = ? and cnpjID = ? and StatusCliente = 1 "

    getConnection().query(sqlQuery, [contaID, cnpjID], (err, results, fields) => {
        if (err) {
            console.log("Erro ao excluir registro: " + err)
            res.sendStatus(500)
            return 
        }
        console.log ("Conta excluida com sucesso, contaID: ", contaID)
    })

    const mensagem = {Mensagem: "Conta Excluida com Sucesso.", contaID: contaID, cnpjID: cnpjID}
    res.json(mensagem)
})


app.get('/cliente_pj/conta/listar', (req, res) => {
    console.log('Listar Contas.')
    const connection = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        database: 'financo',
        password: 'senhacadastro'
    })
    const sqlQuery = "select * from ClienteContaBancaria where statusConta = 1" // where StatusCliente = 1"
    connection.query(sqlQuery, (err, rows, fields) => {
        if (err) {
            console.log("Erro ao carregar os dados: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Dados carregados com suesso.")

        const contas = rows.map((row) => {
            return{contaID: row.contaID, cnpjID: row.cnpjID, codBanco: row.codBanco,
                    codAgencia: row.codAgencia, codConta: row.codConta, descrConta: row.descrConta}
        })

        res.json(contas)
    })

})

app.get('/cliente_pj/conta/:id', (req, res) => {
    console.log('ID da Conta do Cliente: ' + req.params.id)

    const connection = getConnection()


    cnpjID = req.params.id
    const sqlQuery = "select * from ClienteContaBancaria where contaID = ? and statusConta = 1 "
    connection.query(sqlQuery, [cnpjID], (err, rows, fields) => {
        if (err) {
            console.log("Erro ao carregar os dados: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Dados carregados com suesso.")

        const contas = rows.map((row) => {
            return{contaID: row.contaID, cnpjID: row.cnpjID, codBanco: row.codBanco,
                    codAgencia: row.codAgencia, codConta: row.codConta, descrConta: row.descrConta}
        })

        res.json(contas)
    })

})

app.get('/cliente_pj/conta/por_cnpj/:id', (req, res) => {
    console.log('CNPJ do Cliente: ' + req.params.id)

    const connection = getConnection()


    cnpjID = req.params.id
    const sqlQuery = "select * from ClienteContaBancaria where cnpjID = ? and statusConta = 1 "
    connection.query(sqlQuery, [cnpjID], (err, rows, fields) => {
        if (err) {
            console.log("Erro ao carregar os dados: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Dados carregados com suesso.")

        const contas = rows.map((row) => {
            return{contaID: row.contaID, cnpjID: row.cnpjID, codBanco: row.codBanco,
                    codAgencia: row.codAgencia, codConta: row.codConta, descrConta: row.descrConta}
        })

        res.json(contas)
    })

})


// ...
//localhost:80
app.listen(80, () => {
    console.log("Servidor rodando em 80")
})
