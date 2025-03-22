import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useInventory } from '../context/InventoryContext';

const ReportsScreen = () => {
  const { inventory, updateStock } = useInventory();
  const [threshold] = useState(5); // Low stock threshold as constant state

  const lowStockItems = inventory.filter(item => item.stock <= threshold && item.stock >= 0);

  const handleRestock = (itemName, currentStock) => {
    const restockAmount = 10 - currentStock; // Restock to 10 units
    if (restockAmount <= 0) {
      Alert.alert('Info', `${itemName} already has sufficient stock (${currentStock} units)`);
      return;
    }
    
    updateStock(itemName, restockAmount);
    Alert.alert(
      'Success',
      `${itemName} restocked successfully!\nNew stock: 10 units`
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#006400']} // Forest green gradient
        style={styles.header}
      >
        <Text style={styles.title}>Jungle Stock Report</Text>
        <Text style={styles.subtitle}>Items with stock ≤ {threshold}</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {lowStockItems.length === 0 ? (
          <Text style={styles.noAlert}>All items are sufficiently stocked!</Text>
        ) : (
          <FlatList
            data={lowStockItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.name} - Stock: {item.stock}
                  {item.stock === 0 && ' (Out of Stock)'}
                  {item.stock > 0 && item.stock <= threshold && ' (Low)'}
                </Text>
                <TouchableOpacity
                  style={styles.restockButton}
                  onPress={() => handleRestock(item.name, item.stock)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#32CD32', '#228B22']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Restock to 10</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No low stock items to display</Text>}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </View>
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
  flatListContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
    marginRight: 10,
  },
  restockButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noAlert: {
    fontSize: 18,
    color: '#228B22',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReportsScreen;