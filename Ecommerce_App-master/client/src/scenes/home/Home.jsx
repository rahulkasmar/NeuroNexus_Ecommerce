import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import React, { useEffect, useState } from "react";
function Home() {

  const [pro ,Spro]=useState(null);

  const products = ()=>{
    const product=fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>Spro(json));
     
 }
 
 useEffect(() => {
   products();
  
 }, []); 

  return (
    <div className="home">
      <MainCarousel pro={pro} />
      <ShoppingList pro={pro} />
      <Subscribe />
    </div>
  );
}

export default Home;