import React from "react"
import Recipe from './Recipe'
import Ingredients from "./Ingredients"
import { getRecipeFromMistral } from "./ai"

export default function Form() {
    const [ingredients, setMyIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setMyIngredients(prevIngredient => [...prevIngredient, newIngredient]) 
        console.log(newIngredient)
    }

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }
    
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient" 
                />
                <button>Add Ingredients</button>
            </form>
            { ingredients.length > 0 && 
                <Ingredients 
                    ingredients={ingredients} 
                    getRecipe={getRecipe}
                />
            }

            {recipe && <Recipe recipe={recipe}/>}
        </main>
    ) 
} 