const config = require("../config/db.js");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.log("error");
});

const doQuery = (query) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (error, result) => {
      if (error) throw err;
      return result;
    });
    connection.release();
  });
};
const ambil_data = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM programming_languages`, (error, result) => {
      if (error) throw err;
      res.json({
        data: result,
      });
    });
    connection.release();
  });
};

const ambil_data_by_id = (req, res) => {
  const id = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM programming_languages WHERE ID = ? `, [id], (error, result) => {
      if (error) throw error;
      res.json({
        data: result,
      });
    });
    connection.release();
  });
};

const tambah_data = (req, res) => {
  const data = {
    name: req.body.name,
    released_year: req.body.released_year,
  };
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`INSERT INTO programming_languages SET ?`, [data], (error, result) => {
      if (error) throw error;
      res.json({
        data: result["insertId"],
      });
      //   console.log(result);
    });
    connection.release();
  });
};

const edit_data = (req, res) => {
  const id = req.body.id;
  const data = {
    name: req.body.name,
    released_year: req.body.released_year,
  };
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`UPDATE programming_languages SET ? WHERE ID = ? `, [data, id], (error, result) => {
      //   console.log(error);
      if (error) throw error;
      res.json({
        data: result,
      });
    });
    connection.release();
  });
};

const hapus_data = (req, res) => {
  const id = req.body.id;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`DELETE FROM programming_languages  WHERE ID = ? `, [id], (error, result) => {
      if (error) throw error;
      res.json({
        data: result,
      });
    });
    connection.release();
  });
};
module.exports = { ambil_data, ambil_data_by_id, tambah_data, edit_data, hapus_data };
