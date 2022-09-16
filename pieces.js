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


//récupération du nom des pièces
const noms = pieces.map(piece => piece.nom);

//Boucle for de la fin vers le début
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}

//Création de l'élément ul
const abordablesElement = document.createElement("ul");

//	Création et rattachement des éléments li
for (let i = 0; i < noms.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = nom[i];
	abordablesElement.appendChild(nomElement);
}

//Rattachement de toute la liste à la page
document.querySelector(".abordables").appendChild(abordablesElement);
