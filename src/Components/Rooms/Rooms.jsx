import { useEffect, useState } from "react";
import "./Rooms.css";

function Rooms() {

  const [rooms, setRooms] = useState([]);
  const [complex, setComplex] = useState([]);


  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/number_of_romms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/complex')
      .then(res => res.json())
      .then(data => setComplex(data))
      .catch(err => console.log(err))
  }, []);



  const hanlSubmit = (e) => {
    // e.preventDefault()
    const { number_of_room, price_each_square, all_meter_of_square, address_of_complex, complex_id } = e.target.elements;
    fetch('https://exam-8-backend.herokuapp.com/number_of_romms', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number_of_room: number_of_room.value,
        price_each_square: price_each_square.value,
        all_meter_of_square: all_meter_of_square.value,
        address_of_complex: address_of_complex.value,
        complex_id: complex_id.value
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  const handleDlete = e => {
    fetch('https://exam-8-backend.herokuapp.com/number_of_romms', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_id: e.target.id
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


  return (
    <>
      <div className="wrapper rooms">

          <div className="table-header">
            <h4>Added houses</h4>
            <button className="btn btn-warning header-offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">New House</button>
          </div>
        <div className="rooms-table-wrapper">
          <table className="table table-striped table-hover com-table room-table">
            <thead>
              <tr>
                <th scope="col">Number of rooms:</th>
                <th scope="col">Price each square:</th>
                <th scope="col">All meter of square:</th>
                <th scope="col">Address of complex:</th>
              </tr>
            </thead>
            <tbody>
              {
                rooms && rooms.map((e, i) => (
                  <tr className="t-row" key={i}>
                    <td>{e.number_of_room}</td>
                    <td>{e.price_each_square}</td>
                    <td>{e.all_meter_of_square}</td>
                    <td>{e.address_of_complex}
                      <button id={e.number_of_room_id} onClick={(e) => { handleDlete(e) }} className="btn btn-danger house-delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="offcanvas offcanvas-end offcan" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <form className="room-form" onSubmit={hanlSubmit}>
              <h4>Add new house</h4>
              <label htmlFor="complex">Choose complex:</label>
              <select className="form-select" name="complex_id">
                {
                  complex && complex.map((e, i) => (
                    <option key={i} value={e.complex_id}>{e.complex_name}</option>
                  ))
                }
              </select>
              <label htmlFor="number-room">Number of room:</label>
              <input className="form-control" name="number_of_room" type="number" id="number-room" placeholder="Number of room" required />

              <label htmlFor="price-room">Price per square meter:</label>
              <input className="form-control" name="price_each_square" type="number" id="price-room" placeholder="Price per square meter" required />

              <label htmlFor="all-meter-room">All metters of square:</label>
              <input className="form-control" name="all_meter_of_square" type="number" id="all-meter-room" placeholder="All metters of square" required />

              <label htmlFor="address-room">Address of complex:</label>
              <input className="form-control" name="address_of_complex" type="text" id="address-room" placeholder="Address of complex" required />

              <button className="btn btn-outline-primary" type="submit">Add house</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rooms;