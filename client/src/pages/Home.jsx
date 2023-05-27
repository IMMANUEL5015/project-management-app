import Clients from '../components/Clients';
import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import AddProjectModal from '../components/AddProjectModal';

const Home = function(){
    return <div>
        <AddClientModal/>
        <AddProjectModal/>
        <Projects/>
        <hr/>
        <Clients/>
    </div>
}

export default Home;