

export default (props)=>{
    return (
        <div>
          <div className="allslider">
            <div
              className="arrows "
              style={{ marginTop: "100px", marginBottom: "-120px" }}
            >
              <img
                onClick={props.slideright}
                className="arrow_element "
                src="https://i.ibb.co/6nfQQH7/arrowleft.jpg"
              />
  
              <img
                onClick={props.slideleft}
                className="arrow_element"
                src="https://i.ibb.co/m0Jm3VC/arrowright.jpg"
              />
            </div>
            <div
              className="body_videos_all"
              style={{ marginLeft: String(props.leftMargin) + "px" }}
            >
              {props.imgurls.map((url) => (
                <div>
                  <a href={`/info/${url.id}`}>
                    <img
                      className="body_videos"
                      src={"https://image.tmdb.org/t/p/w500" + url.poster_path}
                    ></img>
                  </a>
                </div>
              ))}
            </div>
          </div>
          </div>
      );
}