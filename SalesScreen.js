import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useInventory } from '../context/InventoryContext';

const SalesScreen = () => {
  const { inventory, updateStock } = useInventory();
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSale = () => {
    try {
      if (!product.trim() || !quantity.trim()) {
        Alert.alert('Error', 'Please enter both product name and quantity.');
        return;
      }

      const quantityNumber = parseInt(quantity, 10);
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        Alert.alert('Error', 'Please enter a valid positive number for quantity.');
        return;
      }

      const productItem = inventory.find(
        item => item.name.toLowerCase() === product.trim().toLowerCase()
      );

      if (!productItem) {
        Alert.alert('Error', `Product "${product}" not found in inventory.`);
        return;
      }

      if (productItem.stock < quantityNumber) {
        Alert.alert(
          'Error',
          `Insufficient stock. Available: ${productItem.stock}, Requested: ${quantityNumber}`
        );
        return;
      }

      updateStock(productItem.name, -quantityNumber);
      Alert.alert(
        'Success',
        `Sale recorded: ${quantityNumber} ${productItem.name}(s) sold!\nRemaining stock: ${productItem.stock - quantityNumber}`
      );

      setProduct('');
      setQuantity('');
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while processing the sale.');
      console.error('Sale processing error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#228B22', '#006400']} // Forest green gradient
        style={styles.header}
      >
        <Text style={styles.title}>Jungle Sales</Text>
        <Text style={styles.subtitle}>Record New Sale</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          placeholderTextColor="#90EE90"
          value={product}
          onChangeText={(text) => setProduct(text.trim())}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          placeholderTextColor="#90EE90"
          value={quantity}
          onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={5}
        />

        <TouchableOpacity
          style={styles.saleButton}
          onPress={handleSale}
          activeOpacity={0.9}
          disabled={!product || !quantity}
        >
          <LinearGradient
            colors={['#32CD32', '#228B22']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Record Sale</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.inventoryTitle}>Available Inventory:</Text>
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.name} - Stock: {item.stock}
                {item.stock <= 5 && item.stock > 0 && ' (Low)'}
                {item.stock === 0 && ' (Out)'}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No inventory items available</Text>}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0e6', // Light forest green background
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#d4ffd4',
    marginTop: 5,
    fontStyle: 'italic',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f0fff0', // Very light green
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
    padding: 20,
    shadowColor: '#006400',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    color: '#333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  saleButton: {
    marginVertical: 15,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  inventoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#32CD32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SalesScreen;