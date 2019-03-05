-- drop table ClientePJ;
-- drop table ClienteContaBancaria;

-- CREATE DATABASE financo;
use financo;

CREATE TABLE ClientePJ (
	cnpjID varchar(14) PRIMARY KEY,
	RazaoSocial varchar(60),
	NomeFantasia varchar(60),
	EnderecoPJ varchar(100),
	InscrEstadual varchar(11),
	Telefone varchar(14),
	NomeResponsavel varchar(50),
    statusCliente smallint
	);

CREATE TABLE ClienteContaBancaria (
	contaID int auto_increment primary KEY,
	cnpjID varchar(14),
	codBanco int,
	codAgencia varchar(10),
	codConta varchar(10),
	descrConta varchar(50),
    statusConta smallint
	);

USE financo;

INSERT INTO ClientePJ VALUES
('21232789000100','Cafe Express     ','Cafe Express     ','Rua Cem, 200   ','12345678901','+5511912345678','Joao da Silva ', 1),
('12345678000100','Escolar Uniformes','Escolar Uniformes','Rua Vinte, 100 ','98765432101','+5511987654321','Jose da Silva ', 1),
('23456789000100','Sapatos & Cia    ','Sapatos & Cia    ','Rua Trinta, 300','65432198701','+5511912345678','Jorge da Silva', 1),
('34567890000100','Ali Express      ','Ali Express      ','Rua Quinze, 10 ','78945612301','+5511912345678','Luiz da Silva ', 1)
;

INSERT INTO ClienteContaBancaria 
(cnpjID, codBanco, codAgencia, CodConta, descrConta, statusConta)
VALUES 
('21232789000100','341','5555','555555-0','observacao1', 1),
('12345678000100','341','4444','456780-0','observacao2', 1),
('23456789000100','341','2222','321654-0','observacao3', 1),
('34567890000100','341','3333','789456-0','observacao4', 1);


select * from ClientePJ;
select * from ClienteContaBancaria;

DELETE FROM ClientePJ WHERE cnpjID = 123456;
