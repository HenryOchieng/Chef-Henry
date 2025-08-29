import React from "react"
import Recipe from './Recipe'
import Ingredients from "./Ingredients"
import { getRecipeFromMistral } from "./ai"

export default function Form() {
    const [ingredients, setMyIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    console.log(recipeSection)

    //Scroll into view when recipe is generated
    React.useEffect(() =>{
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    //Get the recipe from the AI
    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    //Add ingredient to the list
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setMyIngredients(prevIngredient => [...prevIngredient, newIngredient]) 
        //console.log(newIngredient)
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
                    ref={recipeSection}
                    ingredients={ingredients} 
                    getRecipe={getRecipe}
                />
            }

            {recipe && <Recipe recipe={recipe}/>}
        </main>
    ) 
} 