import './App.css';

function App() {
  const buttons = [
    {label: "To Do"},
    {label: "Done"},
    {label: "Trash"}
  ]

  const list = [
    {task: "Write Essay"},
    {task: "One Hour CSS Course Online"},
    {task: "Buy One Way Ticket to LA"},
    {task: "Go to Gym"},
    {task: "Buy Groceries"}
  ]

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
                <button className='me-4'>{button.label}</button>
              ))}
            </div>
          </div>
          {/* right */}
          <div className='my-5 d-flex align-items-end'>
            {/* Modal window */}
            <div className='modal_window'>
                <label className='m-3' for="new_task">Add New To Do</label>
                <input className='input_text' type="text" class="form-control" id="new_task"></input>
                <button>Add</button>
            </div>
            {/* Add Button */}
            <button className='add-button ms-4'>
              <img src={require('./assets/Plus.png')}/>
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
          {list.map((list_item, index) => (
            <div className='my-2 d-flex align-items-center'>
              <div className = "me-2">
                <img src = {require('./assets/Vector.png')}/>
              </div>
              <input className = "me-2" type="checkbox"></input>
              <p className = 'm-0'>{list_item.task}</p>
            </div>
          ))}
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
