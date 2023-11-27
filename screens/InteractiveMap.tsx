import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { withTheme } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';

export default function Map() {
  const [dep, setDep] = useState([
    {
      id: '1',
      name: 'Departamenul IT',
      icon: <MaterialIcons name="computer" size={28} />,
    }, {
      id: '2',
      name: 'Dezvoltare',
      icon: <MaterialIcons name="android" size={28} />,
    }, {
      id: '3',
      name: 'Curatenie',
      icon: <MaterialIcons name="cleaning-services" size={28} />,
    }, {
      id: '4',
      name: 'Resurse Umane',
      icon: <MaterialIcons name="file-copy" size={28} />,
    }, {
      id: '5',
      name: 'Birouri',
      icon: <MaterialIcons name="event-seat" size={28} />,
    },

  ]);

  return (
    <View style={styles.container}>

      <ScrollView>
        {
          dep.map(item => (
            <View key={item.id}>
              <Text style={styles.doc}>
                <Text style={styles.icon}>{item.icon}   </Text>
                <Text style={styles.item}>   {item.name}</Text>
              </Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  doc: {
    padding: 30,
    backgroundColor: '#01a552',
    marginTop: 24,
  },
  item: {
    color: 'white',
    fontSize: 24,
    textAlign: 'right',
    marginLeft: 20,
  },
  icon: {
    color: 'white',
    textAlign: 'left',
  }
})