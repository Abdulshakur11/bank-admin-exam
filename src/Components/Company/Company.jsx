import { useEffect, useState } from "react";
import "./Company.css"
function Company() {

  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/company')
      .then(res => res.json())
      .then(data => setCompany(data))
      .catch(err => console.log(err))
  }, []);

  const hanlSubmit = (e) => {
    e.preventDefault();
    const { company_name, pic } = e.target.elements;

    fetch('https://exam-8-backend.herokuapp.com/company', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: company_name.value,
        companyImg: `../../images/${pic.value.split(' ')[1]}`
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => alert(err))
  }

  return (
    <>
      <div className="wrapper">
        <div className="company-wrapper">

          <div className="table-wrapper">
            <table className="table table-striped table-hover com-table">
              <thead>
                <tr>
                  <th scope="col">Companys:</th>
                </tr>
              </thead>
              <tbody>
                {
                  company && company.map((e, i) => (
                    <tr key={i}>
                      <td>{e.company_name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <form className="form-wrapper" onSubmit={hanlSubmit}>
            <label htmlFor="company">New company name:</label>
            <input className="form-control" type="text" name="company_name" id="company" placeholder="Company name" required />
            <span>Will be ready to add a picture soon !</span>
            <input type="file" className="form-control" name="pic" />
            <button className="btn btn-outline-light" type="submit">Add company</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Company;