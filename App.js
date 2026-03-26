import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function App() {
  const [notis, setNotis] = useState([]);
  const [unread, setUnread] = useState(0);
  const [cnt, setCnt] = useState(0);

  
  const handleAllRead = () => {
    setNotis([]);
    setUnread(0);
  };

  
  const handleRead = (id) => {
    setNotis(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );

    setUnread(prev => Math.max(prev - 1, 0));
  };

  
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.item,
        {
          borderLeftColor: item.read ? '#455465' : '#007AFF',
          backgroundColor: item.read ? '#f0f0f0' : '#fff'
        }
      ]}
    >
      <TouchableOpacity onPress={() => handleRead(item.id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCnt(prev => {
        const newCnt = prev + 1;

        const newNoti = {
          id: newCnt.toString(),
          title: `notificacion #${newCnt}`,
          desc: `mensajito #${newCnt}`,
          read: false
        };

        setNotis(prevNotis => [...prevNotis, newNoti]);
        setUnread(prev => prev + 1);

        return newCnt;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>NotiApp</Text>

        <View style={styles.icon}>
          <MaterialCommunityIcons name="bell" size={24} color="#fff" />
          <Text style={styles.iconText}>{unread}</Text>
        </View>
      </View>

      {/* la lista de notificaciones */}
      <FlatList
        data={notis}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleAllRead}>
          <Text style={styles.btnText}>Borrar todo</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '10%',
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
  },

  list: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  item: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});