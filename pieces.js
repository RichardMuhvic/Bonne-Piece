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