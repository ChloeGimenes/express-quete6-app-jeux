const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");

const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// écoute de l'url "/api/employees"
app.get("/api/techno", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query("SELECT * from techno", (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send("Erreur lors de la récupération de la table techno");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// écoute de l'url "/api/employees"
app.get("/api/techno/:colonne", (req, res) => {
  // connection à la base de données, et sélection des employés
  const colonne = req.params.colonne;

  connection.query(`SELECT ${colonne} from techno`, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// écoute de l'url "/api/employees"
app.get("/api/techno/rate/sup", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query("SELECT rate from techno WHERE rate > 8", (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// listen to the url "/api/employees" with the verb POST
app.post("/api/techno", (req, res) => {
  // Get the data sent
  const formData = req.body;

  // connection to the database, and insertion of the employee
  connection.query("INSERT INTO techno SET ?", [formData], (err, results) => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send("Error saving an artist");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

// listen to the url "/api/employees" with the verb POST
app.put("/api/techno/:id", (req, res) => {
  // Get the data sent
  const idTechno = req.params.id;
  const formData = req.body;

  // connection to the database, and insertion of the employee
  connection.query(
    "UPDATE techno SET ? WHERE id = ?",
    [formData, idTechno],
    err => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send("Error editing a movie");
      } else {
        // If everything was successful, we send an "ok" status.
        res.sendStatus(200);
      }
    }
  );
});

app.put("/api/techno/changelebol/:id", (req, res) => {
  // Get the data sent
  const idTechno = req.params.id;

  // connection to the database, and insertion of the employee
  connection.query(
    "UPDATE techno set is_successful = !is_successful WHERE id = ?",
    [idTechno],
    err => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send("Error editing a movie");
      } else {
        // If everything was successful, we send an "ok" status.
        res.sendStatus(200);
      }
    }
  );
});

// listen to the url "/api/employees" with the verb DELETE
app.delete("/api/techno/:id", (req, res) => {
  //Get the data sent
  const idTechno = req.params.id;

  //connection to the database, and insert the employee
  connection.query("DELETE FROM techno WHERE id = ?", [idTechno], err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send("Error deleting an employee");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

app.delete("/api/techno/deletesuccessful/:is_successful", (req, res) => {
  // Get the data sent
  const idTechno = req.params.is_successful;

  // connection to the database, and insert the employee
  connection.query(
    "DELETE FROM techno WHERE is_successful = ?",
    [idTechno],
    err => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send("Error deleting an artist");
      } else {
        // If everything went well, we send a status "ok".
        res.sendStatus(200);
      }
    }
  );
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
