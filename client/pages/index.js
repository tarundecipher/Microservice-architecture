
import VideoWrapper from '../components/VideoWrapper';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';


const LandingPage =  ()=>{
    return (
       <div>
       <Navbar/>
       <Carousel/>
       <VideoWrapper genreprop='upcoming'/>
       <VideoWrapper genreprop='top_rated'/>
       <VideoWrapper genreprop='popular'/>
       </div>
    );
}



export default LandingPage;