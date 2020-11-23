import { json } from 'body-parser';
import React from 'react'
import { render } from 'react-dom'



class App extends React.Component {


    constructor () {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id:'',
            showTheModel: false
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addTask(e) {
       if(this.state._id) {
           fetch('/api/tasks/' + this.state._id, {
               method: 'PUT',
               body: JSON.stringify(this.state),
               headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
           }).then(res => res.json())
           .then (data => {
               M.toast({html:'Task updated'});
               this.setState({
                   title: '',
                   description:'',
                   _id:''
               });
               this.fetchTasks()
           })
       } else {
        console.log(this.state)
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            M.toast({html: 'Your task has been saved. :)'}),
            this.setState({
                title: '',
                description: ''
            })
            this.fetchTasks();
        })
        .catch(err => console.log('Algo ha pasado' + err))
       }
        e.preventDefault();
    }

    componentDidMount () {
        this.fetchTasks()
    }


    fetchTasks (e) {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data =>{this.setState({
            tasks: data})
             console.log(this.state.tasks)
        } 
        );
      
    }

    handleChange (e) {
       const { name, value} = e.target;
       this.setState({
           [name]: value
       })
    }

    deleteTask (id) {
        if(confirm('Are you sure you want to delete this task?')) {
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .then(data => M.toast({html: 'The task has been deleted. :)'}),
              this.fetchTasks())

        }
    }

    editTask (id) {
        fetch('/api/tasks/' + id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }


    render () {
        return (<div>    

            {/* NAVIGATION*/}   
  <nav style={{width:"100%"}}>
     < div className="container">
      <a href="/" className="brand-logo">MERN: Little notes.</a>   
      </div>
      <ul style={{display:"flex", justifyContent:"end", maxWidth: "979px"}} id="nav-mobile" className="right hide-on-med-and-down">
        <li><a target="_blank" href="https://github.com/AndreaAldana">Github</a></li>
        <li><a target="_blank" href="https://www.linkedin.com/in/andrealdana/">Linkedin</a></li>
        <li><a target="_blank" href="https://www.instagram.com/andrealdanapaz/">Instagram</a></li>
      </ul>
  </nav>

<br/>
<br/>
<br/>

           {/*FORM*/}  

  <div className="container">
      <div className="row">
<div className="col s5">
    <div className="card" style={{position:"relative"}}>
        <div className="card-content">
            <h5 className="center">Add your Task</h5>
            <form onSubmit={this.addTask}>
                <div className="row">
                    <div className="input-field col s12">
                        <input required name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task Title"/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea required name="description" value={this.state.description} onChange={this.handleChange} className="materialize-textarea" type="text" placeholder="Task Descript"></textarea>
                    </div>
                </div>
              
                <button style={{width:"100%"}} className="btn waves-effect waves-light" type="submit" name="action">Submit
    <i style={{verticalAlign:"middle", marginLeft:"8px"}} className="material-icons center">send</i>
  </button>
   
            </form>
        </div>
    </div>
</div>

           {/*TABLE*/}  
<div className="col s7" style={{overflowX:"auto"}}>
    <table>
        <thead>
            <tr>
                <th className="center">Title</th>
                <th className="center">Description</th>
                <th className="center">Actions</th>
            </tr>
        </thead>
        <tbody>
{
    this.state.tasks.map(task => {
        return ( <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                <div style={{display: "flex", justifyContent:"space-around"}}>
                <button onClick={() => this.editTask(task._id)} className="btn waves-effect waves-light">
                    <i className="material-icons">edit</i>
                    </button>
                <button onClick={() => this.deleteTask(task._id)} className="btn waves-effect waves-light">
                <i className="material-icons">delete</i></button>
                </div>
            </td>
        </tr>)
    })
} 
        </tbody>
    </table>
</div>
      </div>
  </div>

  
  <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6">
                <h5 className="white-text">Little Notes.</h5>
                <p className="grey-text text-lighten-4">MERN Stack</p>
              </div>
              <div className="col l4 offset-l2">
                <h5 className="white-text center">Developed by Andrea Aldana</h5>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2020 Copyright
            </div>
          </div>
        </footer>
            
  
             </div>)
    }
}

export default App;