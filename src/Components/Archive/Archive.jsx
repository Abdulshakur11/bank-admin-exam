import { useEffect, useState } from "react";
import "./Archive.css";

function Archive() {

  const [archies, setArchives] = useState([]);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/archive')
    .then(res => res.json())
    .then(data => setArchives(data))
    .catch(err => console.log(err))
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {
                archies && archies.map((e, i) => (
                  <tr className="t-row" key={i}>
                    <th>{e.user_name}</th>
                    <td>{e.user_surname}</td>
                    <td>{e.phone_number}</td>
                    <td>{e.request_sent_time}</td>
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

export default Archive;