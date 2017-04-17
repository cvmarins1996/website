$(function () {
  var operation = "C"; //"C"=Criar
  var selected_index = -1; // Indice de um elemento da lista
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar os dados  para armazenar
  tblPersons = JSON.parse(tblPersons); //Converter String p/ Objeto
  if (tblPersons === null) // Se há dados vazios, começar com array vazio
      tblPersons = [];

  function Create() {
    //Obter os valores em HTML e transformar em String.
    var person = JSON.stringify({
      CodigoMercadoria: $("#txtID").val(),
      TipoMercadoria:   $("#txtTipoMercadoria").val(),
      NomeMercadoria:   $("#txtNomeMercadoria").val(),
      Quantidade:       $("#txtQuantidade").val(),
      Preco:            $("#txtPreco").val(),
      VendaCompra:      $("#txtCoVe").val()
    }); 
    //Adicionar a tabela
    tblPersons.push(person);
    //Armazenar in loco
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram salvos"); //Mensagem de confirmação
    return true;
  }

  function Edit() {
    // Editar o item selecionado
    tblPersons[selected_index] = JSON.stringify({
        CodigoMercadoria: $("#txtID").val(),
        TipoMercadoria:   $("#txtTipoMercadoria").val(),
        NomeMercadoria:   $("#txtNomeMercadoria").val(),
        Quantidade:       $("#txtQuantidade").val(),
        Preco:            $("#txtPreco").val(),
        VendaCompra:      $("#txtCoVe").val()
    });
    //Armazenar in loco
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Dados editados"); //Mensagem de confirmação
    return true;
  }

  function Delete() {
    //Eliminar os elementos da tela
    tblPersons.splice(selected_index, 1); 
    //Atualizar os dados
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Mercadoria eliminada"); //Mensagem de confirmação
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Código da Mercadoria</th>" +
            "<th>Tipo da Mercadoria</th>" +
            "<th>Nome da Mercadoria</th>" +
            "<th>Quantidade</th>" +
            "<th>Preço </th>" +
            "<th>Comprar ou Vender</th>"+
            "<th>Ações</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Colocar no HTML
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.CodigoMercadoria + "</td>" +
                "<td>" + per.TipoMercadoria + "</td>" +
                "<td>" + per.NomeMercadoria + "</td>" +
                "<td>" + per.Quantidade + "</td>" +
                "<td>" + per.Preco + "</td>" +
                "<td>" + per.VendaCompra + "</td>" +                    
                "<td><img src='images/edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='images/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } //Salvar e colocar no HTML
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); //Funcão para editar or criar
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obter a flag da var que sera editada
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Converter de JSON para o formato certo
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtID").val(per.ID);
    $("#txtTipoMercadoria").val(per.TipoMercadoria);
    $("#txtNomeMercadoria").val(per.NomeMercadoria);
    $("#txtQuantidade").val(per.Quantidade);
    $("txtPreco").val(per.Preco);
    $("txtCoVe").val(per.VendaCompra);
    $("#txtID").attr("readonly", "readonly");
    $("#txtTipoMercadoria").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obter a flag que sera eliminda
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //Eliminar o item
    List(); //Voltar aos itens da tabela
  });
});

