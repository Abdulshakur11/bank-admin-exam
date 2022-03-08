import { useEffect, useState } from "react"
import "./Complex.css"
function Complex() {

  const [company, setCompany] = useState([]);
  const [complex, setComplex] = useState([]);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/company')
      .then(res => res.json())
      .then(data => setCompany(data));
  }, []);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/complex')
      .then(res => res.json())
      .then(data => setComplex(data));
  }, []);

  const hanlSubmit = (e) => {
    // e.preventDefault()
    const { complex_name, company_id } = e.target.elements;
    fetch('https://exam-8-backend.herokuapp.com/complex', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complexName: complex_name.value,
        companyId: company_id.value
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <>
      <div className="wrapper">
        <div className="complex-wrapper">

          <div className="table-wrapper">
            <table className="table table-striped table-hover com-table">
              <thead>
                <tr>
                  <th scope="col">Complexes:</th>
                </tr>
              </thead>
              <tbody>
                {
                  complex && complex.map((e, i) => (
                    <tr key={i}>
                      <td>{e.complex_name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <form className="form-wrapper complex-form" onSubmit={hanlSubmit}>
            <label htmlFor="complex-select">Choose company:</label>
            <select className="form-select" name="company_id" id="complex-select" required>
              <option disabled hidden value="choose">Choose</option>
              {
                company && company.map((e, i) => (
                  <option key={i} value={e.company_id}>{e.company_name}</option>
                ))
              }
            </select>
            <label htmlFor="complex_name">New complex name:</label>
            <input className="form-control" type="text" name="complex_name" id="complex_name" placeholder="Complex name" required />
            <button className="btn btn-outline-light" type="submit">Add complex</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Complex;