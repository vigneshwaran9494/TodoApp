import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../resources/colors/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Props {
  item: any;
  onItemPressed: (item: any) => void;
  onItemDeletePressed: (item: any) => void;
  onItemUpdatePressed: (item: any) => void;
}

const getActiveColor = (completed: boolean) => {
  return completed ? Colors.primaryAccent : Colors.primary;
};

const TodoItem: FC<Props> = ({
  item,
  onItemPressed,
  onItemDeletePressed,
  onItemUpdatePressed,
}) => {
  const swipeRef = React.useRef();
  /**
   *
   * @param completed boolean flag
   * @returns complete item
   */
  const CompleteItem = ({completed}) => (
    <View style={styles.completedIcon}>
      <Icon
        name={completed ? 'checkmark-circle-outline' : 'radio-button-off'}
        size={20}
        color={getActiveColor(completed)}
      />
    </View>
  );

  const renderLeftAction = () => (
    <TouchableOpacity
      onPress={() => {
        swipeRef?.current?.close();
        onItemDeletePressed(item);
      }}
      style={styles.swipeLeftContainer}>
      <Icon name="trash" size={20} color={'white'} />
      <Text style={styles.swipeText}>DELETE</Text>
    </TouchableOpacity>
  );

  const renderRightAction = () => (
    <TouchableOpacity
      onPress={() => {
        swipeRef?.current?.close();
        onItemUpdatePressed(item);
      }}
      style={styles.swipeRightContainer}>
      <Icon name="create" size={20} color={'white'} />
      <Text style={styles.swipeText}>UPDATE</Text>
    </TouchableOpacity>
  );

  /**
   * default renderer
   */
  return (
    <Swipeable
      ref={swipeRef}
      renderLeftActions={renderLeftAction}
      renderRightActions={renderRightAction}>
      <TouchableOpacity
        onPress={() => {
          onItemPressed(item);
        }}
        style={[
          styles.container,
          styles.shadow,
          {borderColor: getActiveColor(item.completed)},
        ]}>
        {CompleteItem(item)}
        <Text
          style={[
            styles.todoItemText,
            item.completed ? styles.strikeText : {},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 0.3,
    paddingVertical: 4,
    borderColor: 'blue',
    borderRadius: 4,
  },
  todoItemText: {
    fontFamily: 'Futura',
    fontSize: 14,
    marginEnd: 20,
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  completedIcon: {
    paddingHorizontal: 4,
  },
  swipeLeftContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    marginStart: 20,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeRightContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    marginEnd: 20,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeText: {
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
});

export default TodoItem;
