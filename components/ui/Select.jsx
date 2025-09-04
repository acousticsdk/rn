import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

export default function Select({ 
  options = [], 
  value, 
  onSelect, 
  placeholder = "Выберите опцию",
  style 
}) {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown size={20} color="#666666" />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: '#131313',
  },
  selectorText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#131313',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444444',
    maxHeight: 300,
    width: '80%',
  },
  option: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
});