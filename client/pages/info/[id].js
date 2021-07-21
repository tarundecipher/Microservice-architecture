import { useState,useEffect } from "react";
import axios from 'axios';
import {useRouter} from 'next/router';
import Navbar from "../../components/Navbar";

export default (props)=>{
    const router = useRouter();
    const [id,set_id] = useState('');
    const [project_title,set_project_title] = useState('');
    const [project_info,set_project_info] = useState('');
    const [coverimg,set_coverimg] = useState('');
    const [imdb,set_imdb] = useState('');
    const [video,set_video] = useState('');
    const [movie_id,set_movie_id] = useState("12");
    const [comment,set_comment] = useState('');
    const [payload,set_payload] = useState('');
    const [comments,set_comments]= useState([]);

    const getinfo = async () => {
    if(id=='' || id==undefined){
        return;
    }
    let temp = id;
        let search =
          "https://api.themoviedb.org/3/movie/" +
          temp +
          "?api_key=35361fe30128f961c910034da9008f70";
    
        await axios.get(search).then((res) => {
          
            set_project_info(res.data.overview);
            set_project_title(res.data.original_title);
            set_coverimg("https://image.tmdb.org/t/p/w500" + res.data.backdrop_path);
            set_imdb(res.data.vote_average);
            set_movie_id(temp);
        });
        search =
          "https://api.themoviedb.org/3/movie/" +
          temp +
          "/videos?api_key=35361fe30128f961c910034da9008f70";
        axios.get(search).then((res) => {
            set_video(res.data.results[0].key)
        });
      };

    useEffect(getinfo,[id]);


    const getid= ()=>{
        set_id(router.query.id);
    }
    useEffect(getid);

    return (
        <div>
        <Navbar/>
          <img className="backgroundimg" src={coverimg}></img>
          <div className="container" style={{ float: "left" }}>
            <h1 className="description" style={{ color: "white" }}>
              {project_title}
            </h1>
            <p style={{ color: "white" }}>Vote Average: {imdb}</p>
            <p className="description" style={{ color: "white" }}>
              {project_info}
            </p>

            <div>
              <p style={{ color: "white", marginRight: "10px" }}>Trailer :</p>
            </div>
          </div>
          <div className="container-fluid" style={{ float: "right" }}>
            <iframe
              width="100%"
              height="315"
              style={{ border: "none" }}
              src={"https://www.youtube.com/embed/" + video}
            ></iframe>
          </div>
          {/* need to add comments here---------------------*/}
          </div>
      );
}