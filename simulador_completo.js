
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
  let capacidadCalculada = 0;
  let totalCalculado = 0;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones(){
  //Quitar la clase activa a todas las secciones por su id
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("credito").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
}
//funcion que muestra solo la seccion cuyo id recibe como parametro 
function mostrarSeccion(id){
  //incovamos la funcion 
  ocultarSecciones(); 
  //Agregamos la clase activa solo a la seccion indicada
  document.getElementById(id).classList.add("activa");
}
function guardarTasa(){
  //obtener el valor input y convertirlo a numero
  let tasa = recuperarFloat("tasaInteres");
  //validamos que este entre el 10 y 20
  if(tasa >= 10 && tasa <=20){
    //si es valido, guaradamos la variable y mostramos mensaje exitoso
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");

  }else{
    // si no es valido mostramos mensaje de error 
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}
function guardarCliente(){
  //obtetener datos de formulario utilizando utilitarios
  let cedula = recuperaraTexto("cedula");
  let nombre  = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  //Buscamos si el cliente ya existe
  let clienteExiste = buscarCliente(cedula);

  // si no existe lo creamos
  if(clienteExiste == null){

  //creamos el objeto cliente
  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
   
  };

  //agregamos el objeto al arreglo
  clientes.push(cliente);
  }else{
    //si existe actualizamos sus datos exepto la cedula
    clienteExiste.nombre = nombre;
    clienteExiste.apellido = apellido;
    clienteExiste.ingresos = ingresos;
    clienteExiste.egresos = egresos;
  }

  pintarClientes();
}
function pintarClientes(){
  // limpiar la tabla antes de volver a pintar 
  let tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  // Recorrer el arreglo de clientes
  for(let i = 0; i < clientes.length; i++){
    //Tomamos el cliente de turno
    let cliente = clientes[i];

    //creamos una fila con sus datos y boton actualizar
    tabla.innerHTML += "<tr>"+
      "<td>" + cliente.cedula + "</td>" + 
      "<td>" + cliente.nombre + "</td>" + 
      "<td>" + cliente.apellido + "</td>" + 
      "<td>" + cliente.ingresos + "</td>" + 
      "<td>"+ cliente.egresos + "</td>" + 
      
      "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>" +
    "</tr>"
  }
}
function buscarCliente(cedula){
  //Recorremos el arreglo buscando la cedula
  for(let i = 0; i < clientes.length; i++){
    //Si encontramos la cedula retorna
    if(clientes[i].cedula == cedula){
      return clientes[i];
    }
  }
  //Si no retorna null
  return null;
}

function seleccionarCliente(cedula){
  //buscar al cliente // guardarlo en clientesseleccionado
  clienteSeleccionado = buscarCliente(cedula);

  //Mostar datos de cada input 
  mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
  mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
  mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
  mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
}

function limpiar(){
  //vaiar cada input
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");

}

function buscarClienteCredito(){
  //Tomar el valor ingresado en el campo de cedula 
  let cedula = recuperaraTexto("buscarCedulaCredito");
  //buscar el cliente dentro del arreglo clientes
  let cliente = buscarCliente(cedula);
  if(cliente == null){
    //si el cliente no existe mostramos sus datos 
    mostrarTexto("datosClienteCredito", "Cliente no encontrado");
  }else{
    clienteSeleccionado = cliente;
    //si existe mostrar los datos con backticks y ${}
    datosClienteCredito.innerHTML = `
    <h3>Datos del cliente</h3>
    <p><strong>Cédula:</strong>${cliente.cedula}</p> 
    <p><strong>Nombre:</strong>${cliente.nombre}</p> 
    <p><strong>Apellido:</strong>${cliente.apellido}</p> 
    <p><strong>Ingresos:</strong>${cliente.ingresos}</p>
    <p><strong>Egresos:</strong>${cliente.egresos}</p>
    `;

  }
}
function calcularCredito(){
  //obtenemos el monto y plazo ingresados en los inputs
  montoCalculado = recuperarInt("montoCredito");
  plazoCalculado = recuperarInt("plazoCredito");
  //calculamos la capacidda de pago 
  capacidadCalculada = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
  //calculamos el total a pagar sumando el monto mas los intereses
  totalCalculado = montoCalculado + (montoCalculado * tasaInteres / 100);
  //calculamos la cuota mensual dividiendo el total entre los intereses
  cuotaCalculada = totalCalculado / plazoCalculado;
  //Determinamos si el credito es aporbado o rechazado 
  //Si la cuota es menor o igual a lo que puede pagar ---> aporbado 
  if(cuotaCalculada <= capacidadCalculada){
    creditoAprobado = true; 
  }else{
    //si la cuota es amyor a lo que puede pagar ---->
    creditoAprobado = false;
  }
  resultadoCredito.innerHTML = `
   Capacidad de pago: ${capacidadCalculada.toFixed(2)}<br>
   Total a pagar: ${totalCalculado.toFixed(2)}<br>
   Cuota mensual: ${cuotaCalculada.toFixed(2)}<br>
   RESULTADO: ${creditoAprobado ? "APROBADO" : "RECHAZADO"}
  `;
 //Se aplica el estilo diferente segun el resultado con las dos clases que ya estan definidas en el css
  if(creditoAprobado){
    resultadoCredito.className = "aprobado";
    //si fue aprobado activamos el botón 
    document.getElementById("btnAsignarCredito").disabled = false;

  }else{
    resultadoCredito.className = "rechazado";
    //Si fue reclado activamos el boton 
    document.getElementById("btnAsignarCredito").disabled = true;
  }
}
function asignarCredito(){
  //Creamos el objeto credito con todos los datos necessarios
  let credito ={
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  };
  //agregamos el objeto al arreglo 
  creditos.push(credito);
  //Desactivamos el boton para que no se asigne 2 veces
  document.getElementById("btnAsignarCredito").disabled =  true;
  //avisamos que el credito due registardo 
  alert("Crédito asignado correctamente");
}
function buscarCreditos(cedula){
  //creamos un arreglo vacio donde guardamos los credito encontrados con este numero de cedula 
  let creditosEncontrados = [];
  //Recorremos todos lo credito registrados 
  for(let i =0; i < creditos.length; i++){
    //Si la cedula del credito coincide con la busqueda 
    if(creditos[i].cedula == cedula){
      //agregamos este mensaje al credito
      creditosEncontrados.push(creditos[i]);
    }
  }
  //Retornamos el arreglo con todos lo creditos delcliente 
  return creditosEncontrados;
}
function pintarCreditos(listado){
  //limpiar la tabla antes de pintar
  let tabla = document.getElementById("tablaCreditos");
  tabla.innerHTML  = "";
  //Recorremos el arreglo que nos llego como parametro 
  for(let i=0; i < listado.length; i++){
    //Tomamos el credito de turno
    let credito = listado[i];
    //creamos un afila con los datos de credito 
    tabla.innerHTML += "<tr>" + 
    "<td>" + credito.cedula + "</td>" + 
    "<td>" + credito.nombre + "</td>" +
    "<td>" + credito.apellido + "</td>" +
    "<td>" + credito.monto + "</td>" +
    "<td>" + credito.tasa + "</td>" +
    "<td>" + credito.plazo + "</td>" +
    "<td>" + credito.cuota.toFixed(2) + "</td>"
  "</tr>";
  }
}
function buscarCreditosCliente(){
  //Recuperar la cedula ingresada en el input
  let cedula = recuperaraTexto("buscarCedulaListado");
  //buscar todos los creditos de ese cliente 
  let creditosEncontrados = buscarCreditos(cedula);
  //Pintar la tabla los creditos encontrados 
  pintarCreditos(creditosEncontrados);

}
