import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  useFetchTodoListMutation,
  useEditTodoMutation,
  useAddTodoMutation,
  useDeleteTodoMutation,
} from '../../services/ApiServices';
import TodoItem from '../../components/todo/todoItem';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../resources/colors/Colors';

import AddToDo from '../todo/add/Add-Todo';
import EditToDo from '../todo/edit/Edit-Todo';

import CompletePopUp from '../complete-pop-up/Complete-Pop-Up';
import DeletePopUp from '../todo/delete/Delete-PopUp';

import {useDispatch} from 'react-redux';
import {
  updateTodoList,
  addTodo,
  editTodo,
  deleteTodo,
} from '../../redux/slice/todo-slice';
import {useTodoList} from '../../hooks';

const HomeScreen: FC = () => {
  const [fetchTodoList] = useFetchTodoListMutation();
  const [editTodoItem] = useEditTodoMutation();
  const [addTodoItem] = useAddTodoMutation();
  const [deleteTodoItem] = useDeleteTodoMutation();

  const [refreshing, setRefreshing] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const [selectedItem, setSelectedItem] = useState({});
  const [showCompletePopup, setShowCompletePopUp] = useState(false);

  const [showAddToDo, setShowAddToDo] = useState(false);
  const [showEditToDo, setShowEditToDo] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const todoListItems = useTodoList();
  const dispatch = useDispatch();

  /**
   * Fetch Todo List
   */
  useEffect(() => {
    //load icons
    Icon.loadFont();
    //fetch todo list
    fetchTodoListItems();
  }, []);

  useEffect(() => {
    setTodoList(todoListItems);
  }, [todoListItems]);

  const fetchTodoListItems = () => {
    fetchTodoList().then(response => {
      if (response && response.data) {
        dispatch(updateTodoList(response.data));
      }
    });
  };

  /**
   * Header title
   */
  const HeaderTitle = () => (
    <View style={[styles.headerContainer, styles.shadow]}>
      <Text testID="appTitleTest" style={styles.headerText}>
        Todo List
      </Text>
      <TouchableOpacity>
        <Icon
          name="options"
          style={styles.filterIcon}
          size={20}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  /**
   *  Add New Todo Item
   * @returns void
   */
  const onAddIconPressed = () => {
    setShowAddToDo(true);
  };

  /**
   *  Refresh List
   * @returns void
   */
  const _onRefresh = () => {
    fetchTodoListItems();
  };

  /**
   * Footer view
   *
   */
  const FooterView = () => (
    <View style={[styles.footerContainer, styles.shadow]}>
      <TouchableOpacity testID="addIconTest" onPress={onAddIconPressed}>
        <Icon
          style={styles.addIcon}
          name="add-circle"
          size={55}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  /**
   * on item pressed
   */
  const onTodoItemPressed = (item: any) => {
    setSelectedItem(item);
    setShowCompletePopUp(true);
  };

  /**
   * on delete item pressed
   * @param item
   */
  const onTodoItemDeletePressed = (item: any) => {
    setSelectedItem(item);
    setShowDeletePopUp(true);
  };

  /**
   * on update item pressed
   * @param item;
   */
  const onTodoItemUpdatePressed = (item: any) => {
    setSelectedItem(item);
    setShowEditToDo(true);
  };

  /**
   * mark item as completed
   * @param id todo id
   */
  const markItemAsComplete = (item: any) => {
    editTodoItem({...item, completed: true}).then(response => {
      if (response && response.data) {
        dispatch(editTodo(response.data));
      }
    });
  };

  /**
   * update todo items
   * @param item
   */
  const updateTodoItem = (item: any) => {
    debugger;
    editTodoItem(item).then(response => {
      debugger;
      if (response && response.data) {
        dispatch(editTodo(response.data));
      }
    });
  };

  /**
   * delete todo item
   * @param item
   */
  const deleteSelectedItem = (item: any) => {
    deleteTodoItem(item.id).then(response => {
      if (response && response.data) {
        dispatch(deleteTodo(item));
      }
    });
  };
  /**
   * render confirmation popup
   * @returns void
   */
  const renderCompletePopUp = () => (
    <CompletePopUp
      showAlert={showCompletePopup}
      onConfirmPressed={() => {
        setShowCompletePopUp(false);
        markItemAsComplete(selectedItem);
      }}
      onCancelPressed={() => {
        setShowCompletePopUp(false);
      }}
    />
  );

  /**
   * render Add ToDo
   * @returns
   */
  const renderAddTodo = () => (
    <AddToDo
      visible={showAddToDo}
      onRequestClose={() => {
        setShowAddToDo(false);
      }}
      onAddTodoItemPressed={(todo: any) => {
        onTodoClicked(todo);
      }}
    />
  );

  const onTodoClicked = (todo: any) => {
    setShowAddToDo(false);
    addTodoItem(todo).then(response => {
      if (response && response.data) {
        dispatch(addTodo(response.data));
      }
    });
  };

  /**
   * render edit todo
   */
  const renderEditPopUp = () => (
    <EditToDo
      visible={showEditToDo}
      todo={selectedItem}
      onEditToDoItemPressed={item => {
        setShowEditToDo(false);
        updateTodoItem(item);
      }}
      onRequestClose={() => {
        setShowEditToDo(false);
      }}
    />
  );

  /**
   *
   */
  const renderDeletePopUp = () => (
    <DeletePopUp
      showAlert={showDeletePopUp}
      onConfirmPressed={() => {
        setShowDeletePopUp(false);
        deleteSelectedItem(selectedItem);
      }}
      onCancelPressed={() => {
        setShowDeletePopUp(false);
      }}
    />
  );

  /**
   * return default renderer
   */
  return (
    <SafeAreaView style={styles.container}>
      {HeaderTitle()}

      <FlatList
        data={todoList}
        testID="todoListTest"
        renderItem={({item}) => (
          <TodoItem
            item={item}
            onItemPressed={item => onTodoItemPressed(item)}
            onItemDeletePressed={item => onTodoItemDeletePressed(item)}
            onItemUpdatePressed={item => onTodoItemUpdatePressed(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
            tintColor={Colors.primary}
          />
        }
        keyExtractor={item => item.id}
        style={styles.todoListItem}
      />

      {FooterView()}

      {renderCompletePopUp()}

      {renderAddTodo()}

      {renderEditPopUp()}

      {renderDeletePopUp()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitleStyle: {
    fontFamily: 'Futura',
    fontSize: 24,
  },
  todoListItem: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    marginStart: 10,
    color: Colors.primary,
  },
  footerContainer: {
    width: '100%',
    height: '5%',
    alignItems: 'center',
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
  addIcon: {
    marginTop: -20,
  },
  filterIcon: {
    marginEnd: 10,
  },
});

export default HomeScreen;
