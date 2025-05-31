import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `Your are an assistant that receives a list of ingeredients that a user suggests
a recipe a user can make with some or all tose ingredients. You don't need to use every ingredient they
mention in your recipe. The recipe can include additional ingredients they didnt mention,but try not to 
include too many extra ingredients. Format your response in markdown to make it easier to render a page.`

const hf = new InferenceClient(import.meta.env.VITE_HUGGING_FACE_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}