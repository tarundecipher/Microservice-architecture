import Video from './Video';
import {useState,useEffect } from 'react';
import axios from 'axios';
export default (props) =>{
 
    const [imgurls,setimgurls] = useState([]);
    const [genre,setgenre] = useState('');
    const [leftMargin,setleftMargin] = useState(20);


    const getgenre = () => {
        let temp = props.genreprop;
        setgenre(temp.toLowerCase());
       
      };
    useEffect(getgenre,[]);

    const getinfo = async () => {
    if(genre==''){
       return;
      }
        let search =
          "https://api.themoviedb.org/3/movie/" +
          genre +
          "?api_key=35361fe30128f961c910034da9008f70&&page=";
    let results =[];
    for(var i=1;i<=3;i++){
        let pageno = i.toString();
        let search_modified = search+pageno;
        try{
        let res = await axios.get(search_modified);
        if(res!=undefined){
        let result = res.data.results.map((movies) => movies)
        results = results.concat(result);
        }
      }
      catch(err){
        console.log(err);
      }
      };
    console.log(results);
      setimgurls(results);
    }

    const handleLeft = () => {
        setleftMargin(
        
            leftMargin - 800 > -7000 ? leftMargin - 800 : 20,
        )
      };
    
    const handleRight = () => {
        setleftMargin(
            leftMargin + 800 > 20 ? 20 : leftMargin + 800,
        );
      };
    useEffect(getinfo,[genre]);
      
    return  (
        <div>
          <h1
          style={{
            color: "white",
            fontSize: "20px",
            marginBottom: "-30px",
            marginLeft: "20px",
            marginTop: "20px",
          }}
        >
          {genre}
        </h1>
        <Video
          imgurls={imgurls}
          leftMargin={leftMargin}
          slideleft={handleLeft}
          slideright={handleRight}
        />
        </div>
      );
};