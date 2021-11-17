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

