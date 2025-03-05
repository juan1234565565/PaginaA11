// Código común para todas las páginas (por ejemplo, mostrar la fecha)
document.addEventListener("DOMContentLoaded", function () {
    // Mostrar la fecha en el elemento con ID "fecha" (si existe)
    if (document.getElementById("fecha")) {
        document.getElementById("fecha").innerText = new Date().toLocaleDateString();
    }


    // Código específico para ejemplo1.html (arrastrar y soltar)
    if (document.querySelector(".contenedor-origen")) {
        // Cuando se empieza a arrastrar
        function drag(event) {
            event.dataTransfer.setData("id", event.target.id);
            event.dataTransfer.setData("valor", event.target.dataset.valor);
        }

        // Cuando se está arrastrando sobre el contenedor de destino
        function allowDrop(event) {
            event.preventDefault();
        }

        // Cuando se suelta el elemento en el contenedor de destino
        function drop(event) {
            event.preventDefault();
            var elementValor = event.dataTransfer.getData("valor");
            if (event.target.dataset.valor == elementValor) {
                var elementId = event.dataTransfer.getData("id");
                event.target.appendChild(document.getElementById(elementId));
            }
        }

        // Asignar eventos a los elementos arrastrables (solo en ejemplo1.html)
        document.querySelectorAll(".contenedor-origen div[draggable]").forEach(function (element) {
            element.addEventListener("dragstart", drag);
        });

        // Asignar eventos a los contenedores de destino (solo en ejemplo1.html)
        document.querySelectorAll(".contenedor-destino .celda").forEach(function (element) {
            element.addEventListener("drop", drop);
            element.addEventListener("dragover", allowDrop);
        });
    }

    // Código específico para ejemplo2.html (contador con localStorage)
    if (document.getElementById("boton-incrementar")) {
        // Función para mostrar el valor del contador
        function visualizarContador() {
            document.getElementById('contador').value = localStorage.contador;
        }

        // Función para incrementar el contador
        function incrementarContador() {
            localStorage.contador = Number(localStorage.contador) + 1;
            visualizarContador();
        }

        // Función para reiniciar el contador
        function reiniciarContador() {
            localStorage.contador = 0;
            visualizarContador();
        }

        // Función para inicializar el programa
        function inicializar() {
            // Valida si el navegador soporta el almacenamiento de datos
            if (typeof(Storage) === "undefined") {
                document.getElementById('boton-incrementar').disabled = true;
                document.getElementById('boton-reiniciar').disabled = true;
                alert("El navegador no soporta almacenamiento de datos :(");
                return;
            }

            // Si no existe la variable contador, se asigna 0
            if (!localStorage.contador) {
                localStorage.contador = 0;
            }

            // Muestra el valor del contador
            visualizarContador();

            // Asociar eventos a los botones
            document.getElementById('boton-incrementar').addEventListener('click', incrementarContador);
            document.getElementById('boton-reiniciar').addEventListener('click', reiniciarContador);
        }

        // Inicializar el programa cuando la página cargue
        inicializar();
    }

    // Código específico para ejemplo3.html (Canvas - Carita Feliz)
    if (document.getElementById("miCanvas")) {
        const canvas = document.getElementById("miCanvas");
        const ctx = canvas.getContext("2d");

        // Dibujar la cara (círculo amarillo)
        ctx.beginPath();
        ctx.arc(200, 200, 150, 0, Math.PI * 2); // Círculo de radio 150 en el centro
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Dibujar los ojos (círculos negros)
        ctx.beginPath();
        ctx.arc(150, 150, 20, 0, Math.PI * 2); // Ojo izquierdo
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(250, 150, 20, 0, Math.PI * 2); // Ojo derecho
        ctx.fillStyle = "black";
        ctx.fill();

        // Dibujar la sonrisa (arco)
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI); // Arco de 180 grados (sonrisa)
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    // Código específico para ejemplo4.html (Formulario de Registro)
    if (document.getElementById("formulario-registro")) {
        const formulario = document.getElementById("formulario-registro");
        const listaRegistros = document.getElementById("lista-registros");

        // Función para agregar un registro a la lista
        function agregarRegistro(nombre, apellido, email, telefono) {
            const nuevoRegistro = document.createElement("li");
            nuevoRegistro.textContent = `${nombre} ${apellido}, ${email}, ${telefono}`;
            listaRegistros.appendChild(nuevoRegistro);
        }

        // Manejar el envío del formulario
        formulario.addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe

            // Obtener los valores del formulario
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const email = document.getElementById("email").value;
            const telefono = document.getElementById("telefono").value;

            // Agregar el registro a la lista
            agregarRegistro(nombre, apellido, email, telefono);

            // Limpiar el formulario
            formulario.reset();
        });
    }

 // Código específico para ejemplo5.html (Carrito de Compras)
if (document.getElementById("tabla-productos")) {
    // Array para almacenar los productos en el carrito
    let carrito = [];

    // Función para agregar un producto al carrito
    function agregarAlCarrito(codigo, nombre, precio, imagen) {
        const producto = { codigo, nombre, precio, imagen };
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${nombre} agregado al carrito`);
    }

    // Asignar la función al ámbito global para que esté disponible en los botones
    window.agregarAlCarrito = agregarAlCarrito;
}

// Código específico para carrito.html (Mostrar productos en el carrito)
if (document.getElementById("lista-carrito")) {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar los productos en el carrito
    let total = 0;
    carrito.forEach(producto => {
        const item = document.createElement("li");

        // Crear una imagen para el producto
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.width = 50;

        // Crear un texto para el producto
        const texto = document.createElement("span");
        texto.textContent = `${producto.nombre} - $${producto.precio}`;

        // Agregar la imagen y el texto al elemento de la lista
        item.appendChild(imagen);
        item.appendChild(texto);

        // Agregar el elemento a la lista
        listaCarrito.appendChild(item);
        total += producto.precio;
    });

    // Mostrar el total
    totalCarrito.textContent = total;
}
// Código específico para ejemplo6.html (Dibujo Libre)
if (document.getElementById("lienzo")) {
    const lienzo = document.getElementById("lienzo");
    const ctx = lienzo.getContext("2d");

    let dibujando = false;
    let colorLinea = "#000000";
    let grosorLinea = 5;

    // Obtener los elementos de control
    const colorLineaInput = document.getElementById("color-linea");
    const grosorLineaInput = document.getElementById("grosor-linea");
    const limpiarLienzoBtn = document.getElementById("limpiar-lienzo");

    // Función para empezar a dibujar
    function empezarDibujo(event) {
        dibujando = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }

    // Función para dibujar
    function dibujar(event) {
        if (!dibujando) return;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = colorLinea;
        ctx.lineWidth = grosorLinea;
        ctx.stroke();
    }

    // Función para terminar de dibujar
    function terminarDibujo() {
        dibujando = false;
    }

    // Función para limpiar el lienzo
    function limpiarLienzo() {
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    }

    // Eventos del lienzo
    lienzo.addEventListener("mousedown", empezarDibujo);
    lienzo.addEventListener("mousemove", dibujar);
    lienzo.addEventListener("mouseup", terminarDibujo);
    lienzo.addEventListener("mouseout", terminarDibujo);

    // Eventos de los controles
    colorLineaInput.addEventListener("input", function () {
        colorLinea = this.value;
    });

    grosorLineaInput.addEventListener("input", function () {
        grosorLinea = this.value;
    });

    limpiarLienzoBtn.addEventListener("click", limpiarLienzo);
}
// Código específico para ejemplo7.html (Gráfico Estadístico)
if (document.getElementById("grafico-navegadores")) {
    const ctx = document.getElementById("grafico-navegadores").getContext("2d");

    const data = {
        labels: ["Chrome", "Firefox", "Edge", "Safari", "Otros"],
        datasets: [{
            label: "Distribución de Navegadores",
            data: [51.08, 10.62, 5.02, 4.07, 0.44], // Porcentajes de uso
            backgroundColor: [
                "rgba(255, 99, 132, 0.8)", // Rojo
                "rgba(54, 162, 235, 0.8)", // Azul
                "rgba(255, 206, 86, 0.8)", // Amarillo
                "rgba(75, 192, 192, 0.8)", // Verde
                "rgba(153, 102, 255, 0.8)", // Morado
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
        }],
    };

    const config = {
        type: "doughnut", // Cambiamos a "doughnut" (anillo) o "pie" (pastel)
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
                tooltip: {
                    enabled: true,
                },
            },
        },
    };

    // Crear el gráfico
    new Chart(ctx, config);
}
// Código específico para ejemplo9.html (Mensaje Emergente)
if (document.getElementById("mostrar-mensaje")) {
    const boton = document.getElementById("mostrar-mensaje");

    boton.addEventListener("click", function () {
        alert("¡Hola! Este es un mensaje emergente.");
    });
}
// Código específico para ejemplo10.html (Cambiar Color de Fondo)
if (document.getElementById("cambiar-color")) {
    const boton = document.getElementById("cambiar-color");

    boton.addEventListener("click", function () {
        // Generar un color aleatorio en formato hexadecimal
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = color;
    });
}
});