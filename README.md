# Desarrollo de proyecto


## Uso de proyecto

- Es necesario instalar las dependencias, tan pronto se clone el proyecto.

```shell
$ npm install
```

- Una vez hecho esto, crear un archivo `.env` para generar las variables de entorno. De preferencia, úsalo en el puerto 3005 por gusto del autor.

`.env`
```
PORT=3005
```







## Creación de `package.json`

```shell
$ npm init --yes
```

## Establecimiento de scripts en `package.json`

```json
...
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
...

```

## Construcción del archivo `index.js`

- Aplicamos arquitectura estándar:

```javascript
// 1. IMPORTACIONES


// 2. MIDDLEWARES


// 3. RUTAS


// 4. SERVIDOR
```


## Instalación de librerías

- express
- dotenv
- hbs

```shell
$ npm install express
$ npm install dotenv
$ npm install hbs
```


## Desarrollo de aplicación

- Las importaciones son el código externo e interno del proyecto.

- Recordar activar tus variables de entorno.

- Cuando levantes el servidor, recuerda utilizar `process.env.PORT` para vincularlo con el archivo `.env`

- Crea el archivo `.env` y pasa tu propiedad PORT.




```javascript
// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

require("dotenv").config()


// 2. MIDDLEWARES


// 3. RUTAS


// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})


```

`.env`
```
PORT=3005
```

## Reconocer carpeta `public` y activar `hbs`

- Crear una carpeta `public`, con dos carpetas adicionales:
	- `images`
	- `stylesheets`
		- `index.css`


- Ejecutar este código. Tomando en cuenta la sección de `middlewares`:

```javascript
// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")



// 3. RUTAS


// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})

```


## Activación de primera ruta

- Establecer la ruta con `app.get`
	- Primer parámetro. ¿Hacia dónde se dirige el usuario'
	- Segundo parámetro. La función que se ejecuta tan pronto el usuario toca esa ruta.
		- Dentro de esa función utilizamos `res.render` para establecer cuál vista usar.


```javascript
// index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")



// 3. RUTAS
app.get("/", (req, res) => {

	res.render("index")

})

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})

```


# Creación de dos rutas adicionales

- Vamos a establecer dos rutas más ("/players" y "/teams")


```javascript
// index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")



// 3. RUTAS
app.get("/", (req, res) => {
	res.render("index")
})

app.get("/players", (req, res) => {
	res.render("players")
})

app.get("/teams", (req, res) => {
	res.render("teams")
})





// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})

```

- Observa que dentro de cada ruta nueva, estamos estableciendo nuevas vistas. Vamos a crearlas dentro de nuestra carpeta de `views`. Adicionalmente, haz un archivo llamado `layout.hbs`.

Nos quedarían 4 archivos:

```
	- views
		- `index.hbs`
		- `players.hbs`
		- `teams.hbs`
		- `layout.hbs`
```


## Ajuste de vistas (hbs) e introducción de Layout

Vamos a utilizar `layout.hbs` como el principal archivo que va a contener todo el contenido estático para todas las rutas.

El resto de vistas, solo va a tener **su propio contenido.**

Entonces...

- En `layout.hbs` usamos `{{{ body }}}`para indicar que todo el contenido dinámico será reemplazado por el resto de vistas.

- En `players.hbs, teams.hbs, index.hbs` únicamente colocamos el contenido de esa vista. `layout.hbs` se encargará de rotarlo dependiendo de la ruta.

`layout.hbs`
```hbs
{{!-- views/layout.hbs --}}

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Home</title>
</head>

<body>

	{{!-- AQUÍ VA EL CONTENIDO DINÁMICO --}}
	{{{ body }}}

	<footer>SOY EL FOOTER</footer>

</body>

</html>
```


`index.hbs`
```hbs
{{!-- views/index.hbs --}}
	
<p>Esta es nuestra sección de Home</p>

```


`players.hbs`
```hbs
{{!-- views/players.hbs --}}

<p>Esta es nuestra sección de Players</p>
```


`teams.hbs`
```hbs
{{!-- views/teams.hbs --}}

<p>Esta es nuestra sección de Teams</p>

```

## Integración de Bootstrap

Una vez realizado ese paso, vamos a integrar Bootstrap.

Dentro de `layout.hbs`, integra la etiqueta de `link` situada en la páginad de bootstrap.com

Finalmente, agreguemos un `header` personalizado para darle mayor claridad a nuestra interfaz.

`views/layout.hbs`

```hbs
{{!-- views/layout.hbs --}}

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	{{!-- Integración de bootstrap --}}
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

	<link rel="stylesheet" href="/stylesheets/index.css">

	<title>Home</title>
</head>

<body>


	{{!-- Header de bootstrap --}}
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand" href="#">IronNBA</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<a class="nav-item nav-link active" href="/">Home</a>
				<a class="nav-item nav-link" href="/players">Players</a>
				<a class="nav-item nav-link" href="/">Teams</a>
			</div>
		</div>
	</nav>

	{{!-- AQUÍ VA EL CONTENIDO DINÁMICO --}}
	{{{ body }}}

	<footer>SOY EL FOOTER</footer>

</body>

</html>



```

## Activar `partials` y crear un archivo `playerCard.hbs` como un primer partial.

- Activar nuestra sección de partials en `index.js`
	- Importación de hbs.
	- Utilizando el código de activación en el middleware.

```javascript
// index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

// -> HICIMOS LA IMPORTACIÓN DE HBS
const hbs			= require("hbs")

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

// REGISTRO DE PARTIAL :)
hbs.registerPartials(__dirname + "/views/partials")

// 3. RUTAS
app.get("/", (req, res) => {
	res.render("index")
})

app.get("/players", (req, res) => {
	res.render("players")
})

app.get("/teams", (req, res) => {
	res.render("teams")
})

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})



```

- Creamos una carpeta que se llama `partials` dentro de nuestra carpeta de `views`.

- Finalmente creamos un archivo llamado `playerCard.hbs`


```hbs
<!-- views/partials/playerCard.hbs -->

<div class="col-md-4">
  <div class="card">
    <img
      class="card-img-top"
      src="https://clutchpoints.com/wp-content/uploads/2019/08/THUMBNAIL_027.jpg"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">Lebron James</h5>
      <p class="card-text">CLE</p>
    </div>
  </div>
</div>
```

- Involucramos nuestro partial en la vista de `players.hbs`

```hbs
{{!-- views/players.hbs --}}
	
<p>Esta es nuestra sección de Players</p>

{{> playerCard}}

```

## Uso de datos dinámicos dentro de la vista para arreglos

- Creamos una variable dentro de la ruta, que contiene un arreglo de objetos (puntualmente "basketball players").

- Lo pasamos a través del render en el segundo argumento.

> ⚡️ RECUERDA QUE SIEMPRE ES UN OBJETO EL SEGUNDO ARGUMENTO.

- Insertamos en `players.hbs` la iteración con `{{#each}}`. Recordar que tan pronto abres #each, debe de haber una indicación de cierre.

`index.js`
```javascript
// index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()
const hbs			= require("hbs")

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")


// 3. RUTAS
app.get("/", (req, res) => {
	res.render("index")
})

app.get("/players", (req, res) => {

	const players = [
		{
			name: "Rusell",
			lastName: "Westbrook",
			team: "OKC",
			photo: "https://thunderousintentions.com/wp-content/uploads/getty-images/2017/12/891998404-oklahoma-city-thunder-v-indiana-pacers.jpg.jpg",
			average: [
				{ year: 2013, points: 82 },
				{ year: 2014, points: 82 },
				{ year: 2015, points: 60 },
				{ year: 2016, points: 46 },
				{ year: 2017, points: 67 },
				{ year: 2018, points: 80 }
			]
		},
		{
			name: "Kevin",
			lastName: "Durant",
			team: "GSW",
			photo: "https://img.bleacherreport.net/img/images/photos/003/670/482/hi-res-3c2473cd8600df96c4b94c93808562c8_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top",
			average: [
			  { year: 2013, points: 76 },
			  { year: 2014, points: 80 },
			  { year: 2015, points: 65 },
			  { year: 2016, points: 50 },
			  { year: 2017, points: 67 },
			  { year: 2018, points: 78 }
			]
		},
	]

	res.render("players", {
		data: players
	})
})

app.get("/teams", (req, res) => {
	res.render("teams")
})





// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})

```

`players.hbs`
```hbs
{{!-- views/players.hbs --}}
	
<p>Esta es nuestra sección de Players</p>

{{> playerCard}}


<ul>
	{{!-- El #each itera un arreglo sobre cada elemento. --}}
	{{!-- Es un similar a for || .map --}}
	{{#each data }}
		{{!-- this es el elemento actual en el que se encuentra la iteración --}}
		{{!-- this en este momento es: {name:..., lastname:..., photo:..., avg:...} --}}
		<li>
			<span>Nombre:</span>{{this.name}}
		</li>
		<li>
			<span>Apellido:</span>{{this.lastName}}
		</li>
		<li>
			<span>Equipo:</span>
			{{this.team}}
		</li>
	{{/each}}
</ul>
```

## Gestión de datos dinámicos en partials

- Verificar que los datos de la ruta (la variable players) existan.

- Pasarlos como argumento en el `res.render`

- Ejecutamos una iteración {{#each}} sobre cada elemento del arreglo. Recordar abrir y cerrar el each con {{/each}}

- Dentro del {{#each}} pasamos como un segundo argumento un partial {{> data this }}. La palabra `this` incluye todos los datos del elemento actual.

- Finalmente, invocamos cada elemento con su propiedad dentro de `playerCard.hbs`.

```index.js
// index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()
const hbs			= require("hbs")

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static('public'))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")


// 3. RUTAS
app.get("/", (req, res) => {
	res.render("index")
})

app.get("/players", (req, res) => {

	const players = [
		{
			name: "Rusell",
			lastName: "Westbrook",
			team: "OKC",
			photo: "https://thunderousintentions.com/wp-content/uploads/getty-images/2017/12/891998404-oklahoma-city-thunder-v-indiana-pacers.jpg.jpg",
			average: [
				{ year: 2013, points: 82 },
				{ year: 2014, points: 82 },
				{ year: 2015, points: 60 },
				{ year: 2016, points: 46 },
				{ year: 2017, points: 67 },
				{ year: 2018, points: 80 }
			]
		},
		{
			name: "Kevin",
			lastName: "Durant",
			team: "GSW",
			photo: "https://img.bleacherreport.net/img/images/photos/003/670/482/hi-res-3c2473cd8600df96c4b94c93808562c8_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top",
			average: [
			  { year: 2013, points: 76 },
			  { year: 2014, points: 80 },
			  { year: 2015, points: 65 },
			  { year: 2016, points: 50 },
			  { year: 2017, points: 67 },
			  { year: 2018, points: 78 }
			]
		},
	]

	res.render("players", {
		data: players
	})
})

app.get("/teams", (req, res) => {
	res.render("teams")
})





// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor activo en puerto ${process.env.PORT}`)
})

```

`views/players.hbs`
```hbs
{{!-- views/players.hbs --}}
	
<p>Esta es nuestra sección de Players</p>

<ul>
	{{!-- El #each itera un arreglo sobre cada elemento. --}}
	{{!-- Es un similar a for || .map --}}
	{{#each data }}
		{{> playerCard this }}
	{{/each}}

</ul>
```

`views/partials/playerCard.hbs`
```hbs
<!-- views/partials/playerCard.hbs -->

<div class="col-md-4">
  <div class="card">
    <img
      class="card-img-top"
      src="{{this.photo}}"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">{{this.name}} {{this.lastName}}</h5>
      <p class="card-text">{{this.team}}</p>
    </div>

	<div>
		<span>Promedio de jugador</span>
		{{#each this.average }}
			<p>Año {{this.year}} - Valor: {{this.points}}</p>
		{{/each}}
	</div>

  </div>
</div>


```

