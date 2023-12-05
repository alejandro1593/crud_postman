//LA API QUE UTILIZO PARA CONSUMIR CON FETCH ES LA QUE ESTA EN LA CARPETA project1/back-end/crud_postman

let baseUrl = "http://localhost:3000";
let productos = [];
//fetch tipo  GET para traernos los datos de la base de datos
//para traerme todo de una tabla de la database
function ObtenerProductos() {
  fetch(baseUrl + '/api/read').then(res => {
    res.json().then(json => {
      productos = json;
      ImprimirProductos();
    });
  });
}
//funtion para imprimir todo lo que tengo en la tabla
function ImprimirProductos() {
  let contenedor = document.getElementById("cuerpoTabla");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    contenedor.innerHTML += MapearProducto(producto);
  });
}
//en la funtion de mapear producto , tomamos los productos y lo pintamos en el html la pagina
function MapearProducto(producto) {
  return `<tr>
  <td>
    <button class='btn btn-danger btn-sm' onclick="EliminarProducto(${producto.id})">Eliminar</button>
    <button class='btn btn-warning btn-sm' onclick="PopularDatosCampos(${producto.id})">Actualizar</button>
    </td>
  <td>${producto.id}</td>
  <td>${producto.name}</td>
  <td>${producto.last_name}</td>
  <td>${producto.email}</td>
  <td>${producto.phone}</td>
  <td>${producto.subject}</td>
  
</tr>`;
}

//funtion para eliminar un registro mediante un id
function EliminarProducto(pid) {
  fetch(baseUrl + '/api/delete/' + pid, { method: "get" }).then(res => {
    console.log(res);
    ObtenerProductos();
  });
}
//funtion guardar registro que introducimos en el formulario
function GuardarProducto() {
  let data = {
    id: document.getElementById("id").value,
    name: document.getElementById("nombre").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
   
  };
//
  fetch(baseUrl + "/api/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'application/json; charset=UTF-8'
    }
  }).then(res => {
    ObtenerProductos();
   // window.location.href = 'index.html';
  });
}
//funtion obtenemos los datos que queremos modificar mediante un id en especifico
function PopularDatosCampos(pid) {
  let producto = productos.filter(p => { return p.id == pid })[0];

  document.getElementById('id').value = producto.id;
  document.getElementById('nombre').value = producto.name;
  document.getElementById('last_name').value = producto.last_name;
  document.getElementById('email').value = producto.email;
  document.getElementById('phone').value = producto.phone;
  document.getElementById('subject').value = producto.subject;
 
}

function ActualizarProducto() {
  let data = {
    //los valores NAME: tiene que se igual a la de la base de datos
    id: document.getElementById("id").value,
    name: document.getElementById("nombre").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
  };

  fetch(baseUrl + "/api/update/:id", {
    method: "Post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'application/json; charset=UTF-8'
    }
  }).then(res => {
    ObtenerProductos();
    window.location.href = 'index.html';
  });
}

//peticion para filtrado para buscar por determinado name u last_name

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const searchTerm = document.getElementById('searchInput').value;

  if (!searchTerm) {
      alert('Por favor, ingrese un término de búsqueda válido.');
      return;
  }

  // Realiza la solicitud fetch para buscar  por nombre u last_name en la base de datos
  fetch(`http://localhost:3000/api/read/search?search=${encodeURIComponent(searchTerm)}`)
  .then(res => {
    res.json().then(json => {
      productos = json;
      ImprimirProductos();
     
    });
  });
     
});