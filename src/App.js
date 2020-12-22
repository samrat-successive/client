import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Createemployee from './CRUD/Createemployee'  
import EmployeList from './CRUD/EmployeList'  
import Editemployee from "./CRUD/Editemployee"; 
import Listuser from "./USER/Listuser";
import Createuser from "./USER/Createuser";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <nav className="btn btn-warning navbar navbar-expand-lg navheader">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/Createemployee"} className="nav-link">
                    Add Book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/EmployeList"} className="nav-link">
                    Book List
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"/Listuser"} className="nav-link">
                    User List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Createuser"} className="nav-link">
                    Add User
                  </Link>
                </li> */}
              </ul>
            </div>
          </nav>{" "}
          <br />
          <Switch>
            <Route exact path="/Createemployee" component={Createemployee} />
            <Route path="/edit/:id" component={Editemployee} />
            <Route path="/EmployeList" component={EmployeList} />
            {/* <Route path="/Listuser" component={Listuser} /> */}
            {/* <Route path="/Createuser" component={Createuser} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
