
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones(){
  //Quitar la clase activa a todas las secciones por su id
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
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