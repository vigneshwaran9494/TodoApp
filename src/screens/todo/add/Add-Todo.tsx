import React, {FC, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../resources/colors/Colors';
import {isEmptyField} from '../../../utills/Validation';

interface Props {
  visible: boolean;
  onAddTodoItemPressed: (todo: any) => void;
  onRequestClose: () => void;
}

const AddToDo: FC<Props> = ({
  visible,
  onAddTodoItemPressed,
  onRequestClose,
}) => {
  const [text, setText] = useState('');

  const onAddItemPressed = () => {
    if (!isEmptyField(text)) {
      var todo = {
        userId: 1,
        title: text,
        completed: false,
      };
      onAddTodoItemPressed(todo);
    }
  };

  return (
    <Modal
      onRequestClose={() => {
        onRequestClose();
      }}
      visible={visible}
      style={styles.container}
      animationType="slide"
      transparent={true}>
      <View style={styles.formContainer}>
        <Text style={styles.addTitleStyle}>Add Todo</Text>
        <TextInput
          onChangeText={text => setText(text)}
          multiline={true}
          placeholder={'Add notes...'}
          style={styles.textInputStyle}
        />
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={() => onAddItemPressed()}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    position: 'absolute',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: '30%',
    width: '100%',
    marginHorizontal: '2%',
    bottom: 0,
    alignSelf: 'center',
  },
  textInputStyle: {
    width: '90%',
    borderColor: Colors.primary,
    borderWidth: 0.5,
    fontFamily: 'Futura',
    fontSize: 14,
    marginTop: 10,
    minHeight: 100,
    maxHeight: 100,
  },
  addButtonStyle: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    width: '20%',
    borderRadius: 20,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    right: '10%',
  },
  addTitleStyle: {
    fontFamily: 'Futura',
    fontSize: 24,
  },
  addText: {
    fontFamily: 'Futura',
    fontSize: 16,
    color: 'white',
  },
});

export default AddToDo;
