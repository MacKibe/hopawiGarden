import supabase from "../supabaseClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert into user table
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }])
      .select("id, email, created_at")
      .single();

    if (error) {
      if (error.code === "23505") { // duplicate email (unique constraint)
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: data,
    });
  } catch (err) {
    res.status(500).json({ error: `Server error ${err}` });
  }
};

export const loginUser = async (req, res) => {

  const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // fetch user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT 
    const token = jwt.sign(
      { id: user.id, email: user.email}, 
      JWT_SECRET, 
      { expiresIn: '1h'}
    )

    // don’t send password back
    res.json({message: "Login successful", token});
  } catch (err) {
    res.status(500).json({ error: `Server error ${err}` });
  }
};
