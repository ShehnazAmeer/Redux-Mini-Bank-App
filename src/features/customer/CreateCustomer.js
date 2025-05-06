import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCustomer,updateCustName } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const customerDetails = useSelector(store => store.customer);
  const dispatch = useDispatch();

  console.log(customerDetails);

  function handleClick() {
    dispatch(createCustomer(fullName, nationalId));
    setFullName('');
    setNationalId('');
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
