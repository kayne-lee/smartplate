"use client"
import Image from 'next/image'
import ChatComponent from '../components/chatComponent'
import Welcome from "../components/Welcome"
import Price from "../components/Price"
import Diet from "../components/Diet"
import Nutrition from "../components/Nutiriton"
import Exfood from "../components/Exfood"

export default function Home() {

  // ChatComponent ? Why make a new component?
  // ChatComponent -> client, text inputs -> onChange -> we need to make a client side component

  return (
    <div>
      <Welcome />
      
      <Price />
      <Diet />
      <Nutrition />
      <Exfood />

      
    </div>
      

  )
}
