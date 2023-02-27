import './App.css';
import { v4 as uuid } from "uuid";  //npm i uuid
import {useState} from "react";

function App() {
  const buttons = [
    {
      label: "To Do",
      type: "todo",
    },
    {
      label: "Done",
      type: "done",
    },
    {
      label: "Trash",
      type: "trash",
    }
  ]

  const list = [
    {
      key: uuid(),
      task: "Write Essay",
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false

    },
    {
      key: uuid(),
      task: "One Hour CSS Course Online",
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false
    },
    {
      key: uuid(),
      task: "Buy One Way Ticket to LA",
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false
    },
    {
      key: uuid(),
      task: "Go to Gym",
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false
    },
    {
      key: uuid(),
      task: "Buy Groceries",
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false
    }
  ]

  const [value, setValue] = useState("");
  const [tasksList, setTasksList] = useState(list);
  const [buttonType, setButtonType] = useState('todo');
  const [modal, setModal] = useState(false);

  const handleAddButton = () => {
    setModal(!modal);
  }

  const handleTaskAdd = (e) => {
    setValue(e.target.value);
  }

  const handleTaskSubmit = () => {
    const newTask = {
      key: uuid(),
      task: value,
      isDone: false,
      trash : false,
      deleteModal: false,
      deleteForeverModal: false
    }
    setValue("");
    setTasksList([newTask, ...tasksList]);
  }

  const handleDone = (clickedItemKey) => {
    let newTasksList = tasksList.map((task) => {
      let item = {};
      if (task.key === clickedItemKey) {
        item = { ...task, isDone: !task.isDone };
      } else item = { ...task };
      return item;
    });
    newTasksList.sort((firstItem, secondItem) => firstItem.isDone - secondItem.isDone);
    setTasksList(newTasksList);
  }

  const handleButtonType = (button_type) => {
    setButtonType(button_type);
  }

  const handleOpenDeleteModal = (deletedTaskKey, typeButton)=> {
    let newTasksList = tasksList.map((task) => {
      let item = {};
      if (task.key === deletedTaskKey && typeButton !== "trash") {
        item = { ...task, deleteModal: true };
      }
      else if (task.key === deletedTaskKey && typeButton === "trash"){
        item = { ...task, deleteForeverModal: true };
      }
      else item = { ...task };
      return item;
    });
    setTasksList(newTasksList);
  }
  const handleDelete = (deletedTaskKey)=> {
    let newTasksList = tasksList.map((task) => {
      let item = {};
      if (task.key === deletedTaskKey) {
        item = { ...task, trash: !task.trash, deleteModal: false, deleteForeverModal: false };
      } else item = { ...task };
      return item;
    });
    setTasksList(newTasksList);
  }

  const handleDeleteForever = (deletedTaskKey)=> {
    let newTasksList = tasksList.filter((task) => task.key !== deletedTaskKey);
    setTasksList(newTasksList);
  }

  const handleMoveBack = (moveBackTaskKey)=> {
    let newTasksList = tasksList.map((task) => {
      let item = {};
      if (task.key === moveBackTaskKey) {
        item = { ...task, trash: !task.trash, deleteModal: false, deleteForeverModal: false };
      } else item = { ...task };
      return item;
    });
    setTasksList(newTasksList);
  }

  const filteredList = tasksList.filter(item => buttonType === 'todo' ? !item.trash : buttonType === 'done' ? item.isDone && !item.trash  : item.trash);

  return (
    <div className="mt-5 mx-5 mb-3 d-flex flex-column justify-content-between App">
      <div className='main'>
        <div className='d-flex justify-content-between'>
          {/* left */}
          <div className='left'> 
            <h4 className = 'pt-5'>Simple To Do List</h4>
            <p className='mt-3 mb-5 pb-5'>Today is an awesome day. The weather is awesome, you are awesome too!</p>
            <div className='my-5 pt-5 d-flex'>
              {/* three buttons To Do, Done, Trash */}
              {buttons.map((button, index)=>(
                <button className='me-4' key = {button.type} onClick={() => handleButtonType(button.type)} style = {{backgroundColor: `${button.type === buttonType ? "#5C625D" : "#081E346B"}`}}>{button.label}</button>
              ))}
            </div>
          </div>
          {/* right */}
          <div className='my-5 d-flex align-items-end'>
            {/* Modal window */}
            {modal &&
              <div className='p-3 modal_window'>
                <label for="new_task">Add New To Do</label>
                <input type="text" value={value} className="my-2 input_text" id="new_task" placeholder=" new task" onChange={handleTaskAdd}/>
                <button onClick={handleTaskSubmit}>Add</button>
            </div>
            }
            {/* Add Button */}
            <button className='add-button ms-4' onClick={handleAddButton}>
              <img src={require("./assets/Plus.png")} alt = 'plus'/>
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <h5>
          {buttons[0].label}
        </h5>
        <div className='horizontal-devider my-3'></div>
        {/* Section List of tasks */}
        <div>
          {filteredList.map((list_item) => (
            <div>
            <div className='my-2 d-flex align-items-center' key = {list_item.key}>
              <div className = "me-2" onClick={() => handleOpenDeleteModal(list_item.key, buttonType)}>
                <img src = {require('./assets/threeDots.png')} alt = 'three_dots'/>
              </div>
              <input className = "me-2" type="checkbox" checked = {list_item.isDone} onChange={() => handleDone(list_item.key)} style = {{accentColor: '#6313AA'}}/>
              <p className = 'm-0' onClick={() => handleDone(list_item.key)}>{list_item.isDone ? <del style = {{color: 'gray'}}>{list_item.task}</del> : <span>{list_item.task}</span>}</p>
            </div>
            {
              list_item.deleteModal && buttonType !== "trash" &&
              <div className='p-3 d-flex justify-content-around align-items-center delete_modal_window' onClick={() => handleDelete(list_item.key)}>
                <img src = {require('./assets/trash.png')} alt = 'trash'/>
                <span>Move To Trash</span>
              </div>
            }
            {
              buttonType === "trash" && list_item.deleteForeverModal &&
              <div className='p-2 d-flex-column delete_modal_window' style ={{height: "90px"}} onClick={() => handleDelete(list_item.key)}>
                    <div className = "p-1 d-flex justify-content-start" onClick={() => handleDeleteForever(list_item.key)}>
                      <img src = {require('./assets/trash.png')} alt = 'trash'/>
                      <span className = "px-1">Delete Forever</span>
                    </div>
                    <div className = "my-2 p-1 d-flex justify-content-start" onClick={() => handleMoveBack(list_item.key)}>
                      <img src = {require('./assets/moveBack.png')} alt = 'trash'/>
                      <span className = "px-1">Move Back To Do</span>
                    </div>
              </div>
            }
            </div>  
          ))
          }
        </div>
    </div>
      
    <div className='d-flex justify-content-between'>
      <p className='companyName'>Made with ❤️ at nFactorial in 2022.</p>
      <p className='credits'>Credits: icons from Icons8.</p>
    </div>
    </div>
  );
}

export default App;
