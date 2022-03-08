import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {

  return (
    <>
      <h1>Admin</h1>
      <div className="header">
        <div>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/company">
            Companys
          </NavLink>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/complex">
            Complexes
          </NavLink>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/room">
            Houses
          </NavLink>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/bank">
            Banks
          </NavLink>
        </div>

        <div>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/request">
            See requests
          </NavLink>
          <NavLink className="link" activeClassName="nested-link__link-active" to="/archive">
            Achive
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Home;