import { Alert, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { router } from "expo-router";
import { services } from "@/src/services";
import { Ingredient } from "@/src/components/Ingredient";
import { Selected } from "@/src/components/Selected";

export default function Index() {
    const [selected, setSelected] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

    function handleToggleSelected(value: string) {
        if(selected.includes(value)) {
            return setSelected((state) => state.filter((item) => item !== value))
        }

        setSelected((state) => [...state, value])
        
    }

    function handleClearSelected() {
        Alert.alert("Limpar", "Deseja limpar lista?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Confirmar", onPress: () => setSelected([]) },
        ])
    }

    function handleSearch() {
        router.navigate("/recipes/" + selected)
    }

    useEffect(() => {
        services.ingredients.findAll().then(setIngredients)
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text>
            </Text>
            <Text style={styles.message}>Descubra receitas baseadas nos produtos que você escolheu.</Text>

            <ScrollView 
                contentContainerStyle={styles.ingredients}
                showsHorizontalScrollIndicator={false}
            >
                {
                    ingredients.map((item) => (
                        <Ingredient 
                        key={item.id} 
                        name={item.name}
                        image={`${services.storage.imagePath}/${item.image}`} 
                        selected={selected.includes(item.id)}
                        onPress={() => handleToggleSelected(item.id)} />
                    ))
                }
            </ScrollView>

            {
                selected.length > 0 && (
                    <Selected 
                        quantity={selected.length} 
                        onClear={handleClearSelected} 
                        onSearch={handleSearch}
                    />
                )
            }

        </View>
    )
}