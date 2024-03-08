import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { Recipe } from "@/src/components/Recipe";
import { Ingredients } from "@/src/components/Ingredients";
import { useEffect, useState } from "react";
import { services } from "@/src/services";

export default function Recipes() {
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
    const [recipes, setRecipes] = useState<RecipeResponse[]>([])

    const params = useLocalSearchParams<{ ingredientsIds: string }>()

    const ingredientesId = params.ingredientsIds.split(",")

    useEffect(() => {
        services.ingredients.findByIds(ingredientesId).then(setIngredients)
    }, [])

    useEffect(() => {
        services.recipes.findByIngredientsIds(ingredientesId).then(setRecipes)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={32} onPress={() => router.back()} />

                <Text style={styles.title}>Ingredientes</Text>
            </View>

            <Ingredients ingredients={ingredients} />

            {recipes.length > 0 ? (
                <FlatList
                    data={recipes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Recipe recipe={item} onPress={() => router.navigate("/recipe/" + item.id)} />}
                    style={styles.recipes}
                    contentContainerStyle={styles.recipesContent}
                    showsHorizontalScrollIndicator={false}
                    columnWrapperStyle={{ gap: 16 }}
                    numColumns={2}
                />
            ) : (
                <Text
                    style={styles.noRecipesText}
                >
                    Ainda não temos receitas com esse(s) ingrediente(s)...
                </Text>
            )}

        </View>
    )
}