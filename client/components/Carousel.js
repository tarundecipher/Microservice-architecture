import { useState } from "react";


export default ()=>{
    let imgurls = [
        "https://www.mediamonks.com/img/Project/172_header_928c7be98f1dd1173ac27f4a1f4c9623_1920x480.jpg"
    ]

    return (
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={imgurls[0]}
                  alt="First slide"
                />
              </div>
              {imgurls.map((url, index) =>
                index != 0 ? (
                  <div className="carousel-item">
                    <img className="d-block w-100" src={url} alt="Second slide" />
                  </div>
                ) : (
                  <div></div>
                )
              )}
              ;
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
      );
}