import '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { supabase } from "../client.js";

export default function recipesList() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Array<string>>([]);

  // state var to store recipe details
  const [recipe, setRecipe] = useState({
      Title: "",
      Ingredients: "",
      Instructions: "",
      Time: "",
    });
  
  const { Title, Ingredients, Instructions, Time } = recipe;

  async function getRecipes() {
    const { data } = await supabase.from("recipes").select(); // Select all the recipes from the recipes Table
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
  
  async function deleteRecipe(id: string) {
    await supabase.from("recipes").delete().eq("id", id); // the id of row to delete
    getRecipes();
  }

  // Run the getRecipes function when the component is mounted
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
  
  return (
    <div>
      <div>
        <form>
          <div>
            <label
              htmlFor="recipeTitle"
            >
              Recipe Title
            </label>
            <input
              id="recipeName" 
              type="text" 
              value={Title.toString()}
              onChange={(e) =>
                setRecipe({ ...recipe, Title: e.target.value})
              }
            />
          </div>
          <div>
            <label
              htmlFor="ingredients"
            >
              Ingredients
            </label>
            <input
              id="ingredients"
              type="text" 
              value={Ingredients.toString()}
              onChange={(e) =>
                setRecipe({ ...recipe, Ingredients: e.target.value})
              }
            />
          </div>
          <div>
            <label
              htmlFor="instructions"
            >
              Instructions
            </label>
            <input
              id="instructions"
              type="text" 
              value={Instructions.toString()}
              onChange={(e) =>
                setRecipe({ ...recipe, Instructions: e.target.value})
              }
            />
          </div>
          <div>
            <label
              htmlFor="recipeTime"
            >
              Time
            </label>
            <input
              id="recipeTime"
              type="text" 
              value={Time.toString()}
              onChange={(e) =>
                setRecipe({ ...recipe, Time: e.target.value})
              }
            />
          </div>
          <div>
            <button
              type="button"
              onClick={addRecipe}
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
      <div>
        {recipe &&
          recipes?.map((recipe, index) => (
              <div key={recipe.id}>
                <h6>{index + 1}</h6>
                <h3>{recipe.title}</h3>
                <p>{recipe.time}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
              </div>
            )  
          )
        }
      </div>
    </div>
  )
}