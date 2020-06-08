import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      id: 0,
      taskname: '',
      when: '',
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001')
    .then((res)=>{
      this.setState({
        tasks: res.data,
        id: 0,
        taskname: '',
        when: '',
      })
    });
  }
  nameChange = event =>{
    this.setState({
      taskname: event.target.value
    });
  }
  whenChange = event =>{
    this.setState({
      when: event.target.value
    });
  }
  // passwordChange = event =>{
  //   this.setState({
  //     password: event.target.value
  //   });
  // }
  submit(event, id){
    event.preventDefault();
    if(id === 0){
      axios.post('http://localhost:3001/tasks/create', {taskname:this.state.taskname, when:this.state.when})
      .then(()=>{
        this.componentDidMount();
      });
      
    }else{
      axios.put(`http://localhost:3001/tasks/profile/${id}`, {taskname:this.state.taskname, when:this.state.when})
      .then(()=>{
        this.componentDidMount();
      })
    }
    

  }
  delete(id){
    axios.delete(`http://localhost:3001/tasks/destroy/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get(`http://localhost:3001/tasks/profile/${id}`)
    .then((res)=>{
      this.setState({
        id: res.data._id,
        taskname: res.data.taskname,
        when: res.data.when,
        });
    });
  }

  render(){
  return (
    <div className="row">
      <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.id)}>
          <div className="input-field col s12">
            <i className="material-icons prefix">playlist_add</i>
            <input value={this.state.taskname} onChange={(e)=>this.nameChange(e)} type="text" id="taskname" className="autocomplete" required />
            <label htmlFor="taskname">What is the task?</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">hourglass_full</i>
            <input value={this.state.when} onChange={(e)=>this.whenChange(e)} type="date" id="deadline" className="autocomplete" required  />
            <label htmlFor="deadline">Deadline</label>
          </div>
          {/* <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input value={this.state.password} onChange={(e)=>this.passwordChange(e)} type="password" id="autocomplete-password" className="autocomplete" required />
            <label htmlFor="autocomplete-password">Password</label>
          </div> */}
          <button className="btn waves-effect waves-light right" type="submit" name="action">Add to List
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Task Name</th>
              <th>Deadline</th>
              {/* <th>Password</th> */}
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.state.tasks.map(task=>
              <tr key={task._id}>
              <td>{task.taskname}</td>
              <td>{task.when}</td>
              {/* <td>{user.password}</td> */}
              <td>
                <button onClick={(e)=>this.edit(task._id)} className="btn waves-effect waves-light" type="submit" name="action">
                  <i className="material-icons">edit</i>
                </button>
              </td>
              <td>
                <button onClick={(e)=>this.delete(task._id)} className="btn waves-effect waves-light" type="submit" name="action">
                  <i className="material-icons">delete</i>
                </button>
              </td>
            </tr>
            )}

        </tbody>
      </table>
            
      </div>
    </div>
  );
 }
}

export default App;
