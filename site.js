var tela_atual = 0;
var tela_anterior = 0;
/*Variáveis utilizadas para permitir o empréstimo*/
var logico_cpf = false;
var logico_cod = false;
function tela(op)
{
  op = op.replace('#', ''); //tirando o # da pagina
  if(tela_anterior == 0)
  {
    tela_anterior = "home";
    tela_atual = op;
  }
  else
  {
    tela_anterior = tela_atual;
    tela_atual = op;
  }
  switch (op)
  {
    case "home":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      break;
    case "aluno":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      document.getElementById('nome_estudante').focus();
      document.getElementById('myModal').style.display = "none";
      break;
    case "livro":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      document.getElementById('nome_livro').focus();
      document.getElementById('myModal').style.display = "none";
      break;
    case "emprestimo":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      document.getElementById('emp_cpf').focus();
      break;
    case "atualizar":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      break;
    case "devolucao":
      document.getElementById(tela_anterior).className = "invisivel";
      document.getElementById(op).className="";
      break;
  }
}
function abrirMenu(){
  document.querySelector('header').className = 'opened';
  document.querySelector('#menu').className = 'opened';
}

function fecharMenu(){
  document.querySelector('header').className = '';
  document.querySelector('#menu').className = '';
}

document.querySelector('#menu').onclick = function(){
  if(document.querySelector('header').className != 'opened'){
    abrirMenu();  

  }else{
    fecharMenu();

  }
};

document.querySelectorAll('nav a').forEach(function(item){
  item.onclick = function(){
    fecharMenu();
    tela(item.hash)
  }  
});

function salvar(op)
{
  switch(op)
  {
    case 1:
      var nome = document.getElementById('nome_livro').value;
      var autor = document.getElementById('autor').value;
      var ano = document.getElementById('ano').value;
      var codigo = document.getElementById('cod_livro').value;
      var area = document.getElementById('area').value;
      var editora = document.getElementById('editora').value;
      var edicao = document.getElementById('edicao').value;
      var paginas = document.getElementById('paginas').value;
      var estado = document.getElementById('estado').value;
      var quantidade = document.getElementById('quantidade').value;
      var q_empre = document.getElementById('quant_empr').value;
      var book = new Livro(nome, autor, codigo, ano, editora, edicao, area, paginas, estado, quantidade, q_empre);
      var bd = new Banco("livros");
      bd.inserir(book);
    break;
    case 2:
      var nome = document.getElementById("nome_estudante").value;
      var cpf = document.getElementById("cpf").value;
      var data_nasc = document.getElementById("dt_nasc").value;
      var curso = document.getElementById('curso').value;
      var matricula = document.getElementById("matricula").value;
      var telefone = document.getElementById("telefone").value;
      var email = document.getElementById("email").value;
      var aluno = new Estudante(nome, cpf, data_nasc, curso, matricula, telefone, email);
      var bd = new Banco("alunos");
      bd.inserir(aluno);
      break;
    case 3:
      emprestar_aluno = false;
      emprestar_livro = false;
      var nome, data_e, data_d, cpf, nome, cod, livro;
      nome = document.getElementById('nome_estudante_e').value;
      cpf = document.getElementById('emp_cpf').value;
      data_e = document.getElementById('emp_data').value;
      data_d = document.getElementById('emp_dataDev').value;
      cod = document.getElementById('emp_cod_livro').value;
      livro = document.getElementById('nome_livro_e').value;
      var emprestar = new Emprestimo(data_e, data_d, cpf, nome, cod, livro);
      var bd = new Banco("emprestimos");
      bd.inserir(emprestar);
      var bd1 = new Banco("livros");
      var procurando = bd1.buscar(cod, "codigo");
      var posicao = bd1.pegar_posicao(cod,"codigo");
      alert("agora vai "+procurando.disponivel--); //atualizando a quantidade do livro para emprestimo
      bd1.atualizar(posicao, procurando);
      //Mudança no número de livros para emprestimo
      //fazer depois
    break;
    case 4:


  }
}

function pegarDataAtual(){
   data = new Date;
   var dia = +data.getDate();
   if(dia<10)
   {
    dia = "0"+dia;
   }
   var mes = +data.getMonth();
   mes++;
   var data_emp = dia+'/'+mes+'/'+data.getFullYear();
   document.getElementById('emp_data').value = data_emp;
   document.getElementById('data_devD').value = data_emp;
   adicionarDiasData(7);//Quantidade de dias que será somada na data atual;
}

function adicionarDiasData(dias){
  var hoje        = new Date();
  var dataVenc    = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
  var teste = dataVenc.getDate() + "/" + (dataVenc.getMonth() + 1) + "/" + dataVenc.getFullYear();
  document.getElementById('emp_dataDev').value = teste;
}

//d1 é a data prevista(limite) para a devolução. D2 é a data atual que esta sendo devolvido
function comparar_datas(d1,d2)
{
  var partes1 = d1.split("/");
  var partes2 = d2.split("/")
  var data1 = new Date(partes1[2], partes1[1] - 1, partes1[0]);
  var data2 = new Date(partes2[2], partes2[1] - 1, partes2[0]);
  if(data1 > data2)
  {
   salvar(4);
  }
  else
  {
    var multa_dias = parseInt((data2-data1)/(24*3600*1000))//Calculo para saber a diferença dos dias
    agoravai(4, multa_dias);
  }
}

var emprestar_aluno = false;
var emprestar_livro = false;
function buscar_emp(op)
{
  switch (op)
  {
    case 1:
      var cpf_alt = document.getElementById('emp_cpf').value;
      var atributo = 'cpf';
      var bd = new Banco("alunos");
      var procurando = bd.buscar(cpf_alt, atributo);
      if(procurando == undefined)
        {
          agoravai(1);
          document.getElementById('emp_cpf').focus();
        }
        else
        {
          document.getElementById('nome_estudante_e').value = procurando.nome_completo;
          emprestar_aluno = true;
          logico_cpf = true;
          if(procurando.multa)
          {
            logico_cpf = false;
            alert("Aluno esta com multa até dia: "+procurando.data_multa);
            document.getElementById('emp_cpf').focus();
          }
          else
          {
            document.getElementById('emp_cod_livro').focus();
          }
        }
      break;
    case 2:
      var cod_liv = document.getElementById('emp_cod_livro').value;
      var atributo = 'codigo';
      var bd = new Banco("livros");
      var procurando = bd.buscar(cod_liv, atributo);
      if(procurando == undefined)
        {
          agoravai(2);
          document.getElementById('emp_cpf').focus();
        }
        else
        {
          emprestar_livro = true;
          logico_cod = true;
          document.getElementById('nome_livro_e').value =procurando.nome;
          if(emprestar_aluno)
          {
            if(procurando.disponivel == 0 )
            {//Arrumar o model
              logico_cod = false;
              alert("O livro não esta mais disponivel para empréstimo")
            }
          //  document.getElementById("btn_emp_s").disabled = false;
          }
        }
      break;
    case 3:
      var cpf_alt = document.getElementById('cpfD').value;
      var atributo = 'cpf_aluno';
      var bd = new Banco("emprestimos");
      var procurando = bd.buscar(cpf_alt, atributo);
      if(procurando == undefined)
        {
          agoravai(1);
          document.getElementById('cpfD').focus();
        }
        else
        {
          document.getElementById('nome_estudanteD').value = procurando.nome_aluno;
          document.getElementById('cod_livroD').value = procurando.cod_livro;
          document.getElementById('nome_livroD').value = procurando.nome_livro;
          document.getElementById('data_empD').value = procurando.data_empr;
          document.getElementById('data_limiteD').value = procurando.data_dev;
          comparar_datas(procurando.data_dev, document.getElementById('data_devD').value);
        }
      break;
  }
}