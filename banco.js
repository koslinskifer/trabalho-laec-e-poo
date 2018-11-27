class Banco{
	constructor(nome)
	{
		this.nome_banco = nome;
		this.dados = JSON.parse(localStorage.getItem(this.nome_banco)) || [];
	}
	tamanho()//Retorna a quantidade de keys do banco
	{
		return localStorage.length;
	}
	inserir(obj)//Método responsável por inserir um elemento no banco
	{
		this.dados.push(obj);
		localStorage.setItem(this.nome_banco,  JSON.stringify(this.dados));
	}
	buscar(nome	, atrib)//Método responsável por buscar um determinado valor no banco
	//Parametros: nome: Elemento que esta sendo pesquisado; Atrib: atributo que onde o nome esta armazenado na classe
	{
		if(localStorage.length == 0 || !localStorage.getItem(this.nome_banco) )
		{
			return undefined;
		}
		else{
			this.dados = JSON.parse(localStorage.getItem(this.nome_banco));
			return this.dados.find(function(item) {
				return item[atrib].localeCompare(nome) == 0;
			});
		}
	}
	pegar_posicao(nome, atrib)
	{
		if(localStorage.length == 0 || !localStorage.getItem(this.nome_banco))
		{
			return undefined;
		}
		else{
			this.dados = JSON.parse(localStorage.getItem(this.nome_banco));
			for(var i =0; i< this.dados.length;i++)
			{
				if(this.dados[i][atrib].localeCompare(nome) == 0)
				{
					return i;
				}
			}
		}
	}
	atualizar(posicao, obj)
	{
		this.dados[posicao] = obj;
		localStorage.setItem(this.nome_banco,  JSON.stringify(this.dados));
	}
	remover(nome, atrib)
	{
		this.dados = JSON.parse(localStorage.getItem(this.nome_banco));
		for(var i =0; i< this.dados.length;i++)
		{
			if(this.dados[i][atrib].localeCompare(nome) == 0)
			{
				this.dados.splice(i,1);
				localStorage.setItem(this.nome_banco,  JSON.stringify(this.dados));
			}
		}
	}
	listar()
	{
		this.dados = JSON.parse(localStorage.getItem(this.nome_banco));
		return this.dados;
	}
}