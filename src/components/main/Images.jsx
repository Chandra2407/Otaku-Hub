import React from 'react'
import './images.scss'
import img1 from '../../assets/Natsu.png'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'


const Images = () => {
    return (
        <div className='container img-container'>
            <div className="img-cont">
                <div className="user-name">
                    <p><i>@Natsu</i></p>
                </div>
                <div className="img">
                    <img src={img1} alt="" />
                </div>
                <div className="quote">
                    <p>"I am all fired up" <br />-Natsu</p>
                </div>
            </div>
            <div className="img-cont">
                <div className="user-name">
                    <p><i>@Naruto</i></p>
                </div>
                <div className="img">
                    <img src={img2} alt="" />
                </div>
                <div className="quote">
                    <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut praesentium autem voluptate ullam quos nisi voluptatem" <br />-Naruto</p>
                </div>
            </div>
            <div className="img-cont">
                <div className="img">
                    <img src={img3} alt="" />
                </div>
                <div className="quote">
                    <p>dattebayo Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi maxime ipsa quidem odit expedita rem? Consequuntur quam, quaerat officia illo aliquam voluptatum cumque obcaecati fuga distinctio blanditiis voluptates corrupti dolorum autem</p>
                </div>
            </div>
        </div>
    )
}

export default Images