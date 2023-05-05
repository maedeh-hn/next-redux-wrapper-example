import axios from "axios";

import SEO from "../common/SEO";

import Page from "../components/Page";
import { incrementCounter } from "../redux/counter/action";
import { wrapper } from "../redux/store";
import { addUser } from "../redux/users/action";

const Other = (props) => {

  console.log(props.data);

  return (
  <>
  <SEO meta={props}/>
  <Page title="Other Page" linkTo="/" />
  <span>{props.data.email}</span>
  </>)
}

export default Other;



export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(incrementCounter());
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10 + 1)}`
  );
  store.dispatch(addUser(data.name));
 return{
    props:{
      title:"example1",
      desc:"this is decs",
      data:data
    }
  }

});
