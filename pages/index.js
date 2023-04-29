import Page from "../components/Page";
import { incrementCounter } from "../redux/counter/action";
import { wrapper } from "../redux/store";

const Index = (props) => {
  return <Page title="Home Page" linkTo="/other" />;
};

export default Index;
//داخل آرگومان اول به استور دسترسی داریم
//داخل آرگومان دوم میتوانیم به ریکویست و ریسپانس دسترسی داشته باشیم
export const getStaticProps = wrapper.getStaticProps((store) => () => {
  store.dispatch(incrementCounter());
});
