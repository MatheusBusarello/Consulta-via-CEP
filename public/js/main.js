'use strict';

const limparformulario = (endereco) => {
  document.getElementById("endereco").value = '';
  document.getElementById("bairro").value = '';
  document.getElementById("cidade").value = '';
  document.getElementById("estado").value = '';
  document.getElementById("numero").value = '';
  document.getElementById("complemento").value = '';
}


const validarFormulario = (data) => {
  alert('Testando')
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}

// TODO - Atualizar nome da função | camel case
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep)

const pesquisarCep = async() => {
  limparformulario();
  
  const cep = document.getElementById('cep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();

    if (endereco.hasOwnProperty('erro')) {
      document.getElementById('endereco').value = 'CEP não encontrado!';
    } else {
      preencherFormulario(endereco);
    }

  }  else{
      document.getElementById('endereco').value = 'CEP incorreto';
  }
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);



