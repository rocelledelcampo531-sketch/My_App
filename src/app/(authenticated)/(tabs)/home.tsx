import Card from "@/components/card";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductProps = {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://6af3f9fe55a1de7dcf03745a.mockapi.io/api/products/items');
      let getfirst = data.sort(
        (a: ProductProps, b: ProductProps) => Number(b.id) - Number(a.id)
      );
      setProducts(getfirst);
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProduct();
    }, [])
  );

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Delete Post",
      "Sigurado ka ba nga gusto nimo i-delete kini nga post?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`https://6af3f9fe55a1de7dcf03745a.mockapi.io/api/products/items/${id}`);
              setProducts(products.filter(item => item.id !== id));
              Alert.alert("Success", "Na-delete na ang post!");
            } catch (error) {
              Alert.alert("Error", "Wala madayon ang pag-delete.");
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header nga naay + Add Button sa Babaw */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/posts/create' as any)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Card 
              name={item.name} 
              description={item.description} 
              image={item.image} 
              onEdit={() => router.push(`/posts/edit?id=${item.id}` as any)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F9FAFB'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loaderContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  listContainer: {
    padding: 16, 
    paddingBottom: 40
  },
});