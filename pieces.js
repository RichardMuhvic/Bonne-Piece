// Récupération des pièces depuis le fichier JSON :
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();


for (let i = 0; i < pieces.length; i++) {
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionFiches = document.querySelector(".fiches");

	// Création d’une balise dédiée à une pièce automobile
	const pieceElement = document.createElement("article");

	// On crée l’élément img.
	const imageElement = document.createElement("img");
	// On accède à l’indice i de la liste pieces pour configurer la source de l’image.
	imageElement.src = pieces[i].image;
	// On rattache l’image à pieceElement (la balise article)
	pieceElement.appendChild(imageElement);

	// Idem pour le nom, le prix et la catégorie...

	const nomElement = document.createElement("h2");
	nomElement.innerText = pieces[i].nom;
	pieceElement.appendChild(nomElement);

	const prixElement = document.createElement("p");
	prixElement.innerText = "Prix " + pieces[i].prix + " €"
		+ " ("
		+ (pieces[i].prix < 35 ? "€" : "€€€")
		+ ")";

	const categorieElement = document.createElement("p");
	categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

	const descriptionElement = document.createElement("p");
	descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";

	const disponibiliteElement = document.createElement("p");
	disponibiliteElement.innerText = pieces[i].disponibilite ? "en stock" : "rupture de stock";

	// Ajout des éléments créés dans le DOM
	sectionFiches.appendChild(imageElement);
	sectionFiches.appendChild(nomElement);
	sectionFiches.appendChild(prixElement);
	sectionFiches.appendChild(categorieElement);
	sectionFiches.appendChild(disponibiliteElement);
	sectionFiches.appendChild(descriptionElement);
	
	// On rattache la balise article au body
	document.body.appendChild(pieceElement);
}

//Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
	const piecesReordonnees = Array.from(pieces);
	piecesReordonnees.sort(function (a, b) {
		return a.prix - b.prix;
	});
	console.log(piecesReordonnees);
});

//Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter( function (pieces) {
		return pieces.prix <= 35;
	});
	console.log(piecesFiltrees);
});

//Ajout du listener pour filtrer les pièces qui ont une desxription
const boutonDescriptif = document.querySelector("btn-descriptif");
boutonDescriptif.addEventListener("click", function () {
	const piecesDescriptif = pieces.filter( function (pieces) {
		// Booléen (undefined) -> false
		// booléen ("bla bla") -> true
		return Boolean(pieces.description)
	});
	console.log(piecesDescriptif);
})

//Ajout du listener pour trier les pièces par ordre de prix décroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort(function (a, b) {
		// B - A (et pas A - B)
		return b.prix - a.prix;
	});
	console.log(piecesOrdonnees);
});