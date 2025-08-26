import { createClient } from "@supabase/supabase-js"
import dotenv  from "dotenv";

dotenv.config();

const supabaseUrl = process.env.PROJECT_URL
const supabaseKey = process.env.PROJECT_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;