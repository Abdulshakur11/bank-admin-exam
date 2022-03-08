import { useEffect, useState } from "react";
import "./Requests.css";

function Requests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.log(err))
  }, []);

  const handleDeleteReq = (e) => {
    fetch('https://exam-8-backend.herokuapp.com/requests', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: e.target.id
      })
    })
  }

  return (
    <>
      <div className="wrapper">
        <div className="rooms-table-wrapper">
          <table className="table table-striped table-hover com-table room-table">
            <thead>
              <tr>
                <th scope="col">User name:</th>
                <th scope="col">User surname:</th>
                <th scope="col">Phone number:</th>
                <th scope="col">Request sent time:</th>
              </tr>
            </thead>
            <tbody>
              {
                requests && requests.map((e, i) => (
                  <tr className="t-row" key={i}>
                    <th>{e.user_name}</th>
                    <td>{e.user_surname}</td>
                    <td>{e.phone_number}</td>
                    <td>{e.request_sent_time}
                      <button id={e.user_id} onClick={(e) => { handleDeleteReq(e) }} className="btn btn-danger house-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Requests;