const apiUrl = 'http://localhost:3000/recipes';  // API URL for fetching and posting recipes
const recipesList = document.getElementById('recipes');  // The div where recipes will be listed
const formContainer = document.getElementById('form-container');  // Container for the form
const recipeForm = document.getElementById('recipe-form');  // The form element

// Function to toggle the visibility of the recipe form
function showForm() {
  formContainer.classList.toggle('hidden');
}

// Fetching recipes from the backend and displaying them
async function fetchRecipes() {
    const response = await fetch(apiUrl);
    const recipes = await response.json();
  
    // Check what is received in the response
    console.log(recipes);
  
    // Check if recipes exist and then render
    if (recipes.length === 0) {
      recipesList.innerHTML = '<p>No recipes found.</p>';
    } else {
      recipesList.innerHTML = recipes.map(recipe => `
        <div>
          <h3>${recipe.name}</h3>
          <p>${recipe.instructions}</p>
          <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
        </div>
      `).join('');
    }
}

// Event listener for the recipe form submission
recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();  // Preventing the default form submission
  const formData = new FormData(recipeForm);  // Getting form data

  // Converting the form data into an object
  const newRecipe = {
    name: formData.get('name'),
    ingredients: formData.get('ingredients').split(','),
    instructions: formData.get('instructions'),
  };

  // Sending the POST request to the API with the recipe data
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Setting the correct header for JSON
      },
      body: JSON.stringify(newRecipe),  // Sending the recipe data as JSON
    });

    // After adding a new recipe, fetch the updated list of recipes
    fetchRecipes();
    recipeForm.reset();  // Reset the form after submission
  } catch (error) {
    console.error("Error adding recipe:", error);  // Error handling for POST request
  }
});

// Function to delete a recipe
async function deleteRecipe(id) {
  try {
    // Sending DELETE request to remove the recipe
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    // After deleting, fetch the updated list of recipes
    fetchRecipes();
  } catch (error) {
    console.error("Error deleting recipe:", error);  // Error handling for DELETE request
  }
}

// Initial fetch to load the recipes when the page loads
fetchRecipes();
