import React, { useState } from 'react';
import "./HomePage.css"
import { Link } from 'react-router-dom';


const Card = ({ title, description, link }) => {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link}>Explore Now</Link>
    </div>
  );
}


const HomePage = () => {

  return (
    <>
      <section className='Main-Hero-section' >
          <h1>OpenSourcerers</h1>
          <p>Discover a place where everyone can show their Open Source magic and become an OpenSourcerer!</p>
          <div className='card-container'>

              <Card 
                title='Explore Projects'
                description='Explore the Projects and Contribute to them'
                link='/projects'
              ></Card>

              <Card
                title='Explore Contributors'
                description='Explore the Contributors and their Contributions'
                link='/contributors'
              ></Card>

              <Card
                title='Semantic Search'
                description='Search for Projects and Contributors'
                link='/semanticsearch'
              ></Card>

          </div>
      </section>


    </>
  );
};

export default HomePage;