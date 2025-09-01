// controllers/userController.js
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Create new user
export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  console.log("A new request:", req.method, req.url);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

//login

export const loginUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resp = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (resp.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = resp.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    return res.status(404).json({ token: token });
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
