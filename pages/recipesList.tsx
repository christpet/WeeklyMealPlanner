import { recipes } from './data.tsx';
import '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { supabase } from "../client.js";

export default function recipesList() {
  const [loading, setLoading] = useState(true);
  const [tasks, setRecipes] = useState([]);

  // state var to store recipe details
  const [recipe, setRecipe] = useState({
      Title: "",
      Ingredients: "",
      Instructions: "",
      Time: "",
    });
  
  const { Title, Ingredients, Instructions, Time } = recipe;

    async function getRecipes() {
    const { data } = await supabase.from("recipes").select(); // Select all the tasks from the recipes Table
    setRecipes(data);
    setLoading(false);
  }
  
  // fn that handles new recipe creation
  async function addRecipe() {
    await supabase
      .from("recipes")
      .insert([
        {
          Title,
          Ingredients,
          Instructions,
          Time,
        },
      ])
      .single();
    setRecipe({
        Title: "",
        Ingredients: "",
        Instructions: "",
        Time: "",
      }); // Reset the recipe details
      getRecipes(); // Refresh the recipes
  }
  
  async function deleteRecipe(id) {
    await supabase.from("recipes").delete().eq("id", id); // the id of row to delete
    getRecipes();
  }

  // Run the getTasks function when the component is mounted
  useEffect(() => {
    getRecipes();
  }, []);

  // Check if loading
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-blue-500 mt-36
    "
        ></div>
      </div>
    );
  
  const listItems = recipes.map(recipe => 
      <li className="card" key={recipe.id}>
        <h3>{recipe.title}</h3>
        <p>{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
      </li>
  );
  return <ul>{listItems}</ul>
}