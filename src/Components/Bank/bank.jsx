import { useEffect, useState } from "react";
import "./bank.css";

function Bank() {

  const [banks, setBanks] = useState([]);
  const [image, setImage] = useState([]);
  const [bankId, setBankId ] = useState() 

  const changeHandler = (e) => {
    setImage(e.target.files[0].name);
  }

  // GET BANK
  useEffect(() => {
    fetch('https://exam-8-backend.herokuapp.com/bank')
      .then(res => res.json())
      .then(data => setBanks(data))
      .catch(err => console.log(err))
  }, []);

  // POST BANK
  const hanlSubmit = e => {
    // e.preventDefault();
    const { bank_name, bank_creadit, moratge_duration, starting_paymant, bank_service } = e.target.elements;
    fetch('https://exam-8-backend.herokuapp.com/bank', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bank_name: bank_name.value,
        bank_creadit: bank_creadit.value,
        moratge_duration: moratge_duration.value,
        starting_paymant: starting_paymant.value,
        bank_service: bank_service.value,
        bank_img: `../../images/${image}`
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  // DELETE BANK
  const hanlBankDelete = e => {
    fetch('https://exam-8-backend.herokuapp.com/bank', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bank_id: e.target.id
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const hanlClickEditd = (e) => {
    const bankId = e.target.id;
    setBankId(bankId);
    const foundBank = banks.find(e => e.bank_id == bankId);
    const bankName = document.querySelector('.bank');
    const bankCredit = document.getElementById('bank-credit');
    const bankDuration = document.getElementById('mortgage-duration');
    const bankPaymant = document.getElementById('starting-paymant');
    const bankService = document.getElementById('bank-service');

    bankName.value = foundBank.bank_name;
    bankCredit.value = foundBank.bank_creadit;
    bankDuration.value = foundBank.moratge_duration;
    bankPaymant.value = foundBank.starting_paymant;
    bankService.value = foundBank.bank_service;
  }

  const hanlEdit = (e) => {
    // e.preventDefault();
    const { bank_name, bank_creadit, moratge_duration, starting_paymant, bank_service } = e.target.elements;

    fetch('https://exam-8-backend.herokuapp.com/bank', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bank_id: bankId,
        bank_name: bank_name.value,
        bank_creadit: bank_creadit.value,
        moratge_duration: moratge_duration.value,
        starting_paymant: starting_paymant.value,
        bank_service: bank_service.value,
        bank_img: `../../images/${image}`
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }

  return (
    <>
      <div className="wrapper">
          <div className="bank-table-header">
            <h4>Added Bank</h4>
            <button className="btn btn-warning header-offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">New Bank</button>
          </div>
        <div className="bank-table-wrapper">
          <table className="table table-striped table-hover com-table">
            <thead>
              <tr>
                <th scope="col">Banks:</th>
                <th scope="col">Credit:</th>
                <th scope="col">Moratge duration:</th>
                <th scope="col">Sarting paymant:</th>
                <th scope="col">Bank service:</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {banks && banks.map((e, i) => (
                <tr className="t-row" key={i}>
                  <td>{e.bank_name}</td>
                  <td>{e.bank_creadit} so'm</td>
                  <td>{e.moratge_duration} year</td>
                  <td>{e.starting_paymant}%</td>
                  <td>{e.bank_service} million so'm
                    <button type="button" className="btn btn-success edit-bank-btn" onClick={(e) => { hanlClickEditd(e) }} id={e.bank_id} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
                  </td>
                  <td>
                    <button id={e.bank_id} onClick={(e) => { hanlBankDelete(e) }} className="btn btn-danger bank-delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal fade offcan" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="room-form" onSubmit={hanlEdit}>
                  <h4>Edit Bank</h4>
                  <label htmlFor="bank-name">Edit bank name:</label>
                  <input className="form-control bank" name="bank_name" type="text" id="bank-name" placeholder="Bank name" required />

                  <label htmlFor="bank-credit credit">Edit bank credit:</label>
                  <input className="form-control" name="bank_creadit" type="text" id="bank-credit" placeholder="Bank credit" required />

                  <label htmlFor="mortgage-duration duration">Edit mortgage duration:</label>
                  <input className="form-control" name="moratge_duration" type="text" id="mortgage-duration" placeholder="Mortgage duration" required />

                  <label htmlFor="starting-paymant paymant">Edit starting paymant:</label>
                  <input className="form-control" name="starting_paymant" type="text" id="starting-paymant" placeholder="Starting paymant" required />

                  <label htmlFor="bank-service service">Edit bank service:</label>
                  <input className="form-control" name="bank_service" type="text" id="bank-service" placeholder="Bank service" required />

                  <label htmlFor="">Upload file is not ready to use</label>
                  <input type="file" onChange={changeHandler} name="bank_img" className="form-control" />
                  <button className="btn btn-outline-primary" type="submit">Edit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="offcanvas offcanvas-end offcan" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <form className="room-form" onSubmit={hanlSubmit}>
              <h4>Add new Bank</h4>
              <label htmlFor="bank-name">Bank name:</label>
              <input className="form-control" name="bank_name" type="text" id="bank-name" placeholder="Bank name" required />

              <label htmlFor="bank-credit">Bank credit:</label>
              <input className="form-control" name="bank_creadit" type="text" id="bank-credit" placeholder="Bank credit" required />

              <label htmlFor="mortgage-duration">Mortgage duration:</label>
              <input className="form-control" name="moratge_duration" type="text" id="mortgage-duration" placeholder="Mortgage duration" required />

              <label htmlFor="starting-paymant">Starting paymant:</label>
              <input className="form-control" name="starting_paymant" type="text" id="starting-paymant" placeholder="Starting paymant" required />

              <label htmlFor="bank-service">Bank service:</label>
              <input className="form-control" name="bank_service" type="text" id="bank-service" placeholder="Bank service" required />

              <label htmlFor="">Upload file is not ready to use</label>
              <input type="file" onChange={changeHandler} name="bank_img" className="form-control" />
              <button className="btn btn-outline-primary" type="submit">Add bank</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default Bank;