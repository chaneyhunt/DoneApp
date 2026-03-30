import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Button } from '@rneui/themed'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Finalize Project Presentation", completed: false },
    { key: "2", description: "Review Professor Feedback", completed: false },
    { key: "3", description: "Make layout for next week", completed: true },
  ]);

  const [inputText, setInputText] = useState('');

  const addTask = () => {
    if (inputText.trim().length > 0) {
      const newTask = {
        key: Math.random().toString(),
        description: inputText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputText(''); 
    }
  };

  const toggleComplete = (key) => {
    setTasks(tasks.map(item => 
      item.key === key ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTask = (key) => {
    setTasks(tasks.filter(item => item.key !== key));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity onPress={() => toggleComplete(item.key)} style={styles.iconButton}>
        <Ionicons 
          name={item.completed ? "checkbox" : "square-outline"} 
          size={26} 
          color={item.completed ? "#000" : "#888"} 
        />
      </TouchableOpacity>

      <Text style={[
        styles.taskText, 
        item.completed && { textDecorationLine: 'line-through', color: 'gray' }
      ]}>
        {item.description}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.iconButton}>
        <Ionicons name="trash-outline" color="#ff4d4d" size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Done.</Text>
        <Text style={styles.subtitle}>THE TASKING APP.</Text>
        <View style={styles.userBadge}>
          <Text style={styles.userLabel}>HELLO, CHANEY HUNT</Text>
        </View>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={inputText}
          onChangeText={(value) => setInputText(value)}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Button 
          title="Add" 
          onPress={addTask} 
          buttonStyle={styles.addButton}
        />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listPadding}
      
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sparkles-outline" size={50} color="#a0b0cc" />
            <Text style={styles.emptyText}>All caught up! ✨</Text>
            <Text style={styles.emptySubtext}>Enjoy your free time.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f0ff' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 48, fontWeight: '900', fontStyle: 'italic', letterSpacing: -2 },
  subtitle: { fontSize: 10, letterSpacing: 4, marginTop: -5, fontWeight: 'bold' },
  userBadge: { backgroundColor: '#d1d1d1', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginTop: 15 },
  userLabel: { fontSize: 11, fontWeight: 'bold', color: '#444' },
  inputArea: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 25 },
  input: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: '#d0d0d0' },
  addButton: { backgroundColor: '#000', borderRadius: 12, paddingHorizontal: 20, height: 50 },
  taskRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 20, marginBottom: 12, borderRadius: 15, padding: 12, elevation: 3 },
  taskText: { fontSize: 16, flex: 1, fontWeight: '500' },
  iconButton: { padding: 5 },
  listPadding: { paddingBottom: 40 },

  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#607088', marginTop: 10 },
  emptySubtext: { fontSize: 14, color: '#90a0b8', marginTop: 5 },
});