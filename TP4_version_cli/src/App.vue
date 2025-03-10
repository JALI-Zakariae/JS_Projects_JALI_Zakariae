<template>
  <div id="app">
    <header>
      <h1>Les Bonnes Pièces</h1>
    </header>
    <main>
      <section class="filtres">
        <h3>Filtres</h3>
        <input type="text" v-model="recherche" placeholder="Rechercher par nom...">
        <select v-model="cat">
          <option value="">Sélectionner une catégorie</option>
          <option value="Électricité">Électricité</option>
          <option value="Filtration">Filtration</option>
          <option value="Moteur">Moteur</option>
          <option value="Freinage">Freinage</option>
          <option value="Suspension">Suspension</option>
          <option value="Carburant">Carburant</option>
          <option value="Direction">Direction</option>
          <option value="Transmission">Transmission</option>
          <option value="Sécurité">Sécurité</option>
          <option value="Carrosserie">Carrosserie</option>
          <option value="Échappement">Échappement</option>
        </select>
        <label>
          <input type="checkbox" v-model="disponible"> Seulement les pièces disponibles
        </label>
        <select v-model="triPrix">
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </section>

      <section class="fiches">
        <div v-if="filteredPieces.length > 0">
          <div v-for="piece in filteredPieces" :key="piece.id">
            <div class="fiche">
              <img :src="piece.image" :alt="piece.nom">
              <p>{{ piece.nom }}</p>
              <p>{{ piece.prix }} €</p>
              <p v-if="piece.disponible">Disponible</p>
              <p v-else>Non disponible</p>
              <button v-on:click="ajouterAuPanier(piece)" :disabled="!piece.disponible">Ajouter au panier</button>
            </div>
          </div>
        </div>
        <div v-else>
          Aucun résultat trouvé.
        </div>
      </section>

      <section class="panier">
        <h3>Panier</h3>
        <ul>
          <li v-for="(item, index) in panier" :key="item.id">
            {{ item.nom }} - {{ item.prix }} €
            <button @click="supprimerDuPanier(index)">Supprimer</button>
          </li>
        </ul>
        <p v-if="panier.length > 0">Total: {{ totalPanier }} €</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pieces_auto: [],
      recherche: "",
      cat: "",
      disponible: false,
      triPrix: "asc",
      panier: []
    };
  },
  mounted() {
    fetch("pieces-autos.json")
      .then((response) => response.json())
      .then((data) => {
        this.pieces_auto = data;
      })
      .catch((error) =>
        console.log("Erreur lors du chargement de la liste : ", error)
      );
  },
  computed: {
    filteredPieces() {
      let pieces = this.pieces_auto.filter((p) => {
        const matchesNom = p.nom.toLowerCase().includes(this.recherche.toLowerCase());
        const matchesCategorie = this.cat ? p.categorie === this.cat : true;
        const matchesDisponibilite = this.disponible ? p.disponible === true : true;

        return matchesNom && matchesCategorie && matchesDisponibilite;
      });

      if (this.triPrix === "asc") {
        pieces.sort((a, b) => a.prix - b.prix);
      } else {
        pieces.sort((a, b) => b.prix - a.prix);
      }

      return pieces;
    },
    totalPanier() {
      return this.panier.reduce((total, item) => total + item.prix, 0);
    }
  },
  methods: {
    ajouterAuPanier(piece) {
      this.panier.push(piece);
    },
    supprimerDuPanier(index) {
      this.panier.splice(index, 1);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

body {
  max-width: 1200px;
  margin: auto;
  padding: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #7451eb;
  text-align: center;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header img {
  height: 60px;
  margin-left: 1rem;
}

header h1 {
  flex-grow: 1;
  font-size: 24px;
  font-weight: 600;
}

main {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.filtres {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 8px;
  padding: 16px;
  min-width: 300px;
  background-color: white;
}

.filtres h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.filtres input[type="text"],
.filtres select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filtres label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
}

.filtres input[type="checkbox"] {
  margin-right: 8px;
}

.fiches {
  flex: 1;
  margin: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.fiches .fiche {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fiches .fiche:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.fiches img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}

.fiches p {
  margin: 8px 0;
  font-size: 14px;
}

.fiches button {
  background-color: #7451eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.fiches button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.fiches button:hover:not(:disabled) {
  background-color: #5a3ec2;
}

.panier {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 8px;
  padding: 16px;
  min-width: 250px;
  background-color: white;
}

.panier h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.panier ul {
  list-style: none;
  padding: 0;
}

.panier li {
  margin-bottom: 8px;
  font-size: 14px;
}

.panier p {
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  margin-top: 16px;
}
</style>
