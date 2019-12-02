const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost", // adresse du serveur
  user: "root", // le nom d'utilisateur
  password: "chloegimenes33", // le mot de passe
  database: "techno_artists" // le nom de la base de données
});
module.exports = connection;
