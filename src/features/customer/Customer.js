import { useSelector } from "react-redux";
function Customer() {
  const customerDetails = useSelector(store => store.customer);

  return <h2>👋 Welcome,{customerDetails.fullName} </h2>;
}

export default Customer;
