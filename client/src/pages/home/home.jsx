import Directory from '../../components/directory/directory';
import './home.scss';
function Home(props) {
  console.log(props);
  return (
    <div className="homepage">
      <Directory />
    </div>
  );
}
export default Home;
