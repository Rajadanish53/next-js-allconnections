import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";

import React, { useEffect, useState } from "react";

function Home() {
  const [socketMessage, setsocketMessage] = useState("");
  let socket = io();
  useEffect(() => {
    socket.on("now", (data) => {
      setsocketMessage(data.message);
    });
    socket.on("message", (data) => {
      fetch("/api/hello", {
        method: "GET",
      }).then((res) => {
        console.log(res);
      });
    });
  });
  return (
    <div>
      {socketMessage},message
      <button
        onClick={() =>
          fetch("/api/express", {
            method: "GET",
          }).then((res) => {
            console.log(res);
          })
        }
      >
        /api/express
      </button>
      <button
        onClick={() =>
          fetch("/api/Test", {
            method: "GET",
          }).then((res) => {
            console.log(res);
          })
        }
      >
        /api/Test
      </button>
      <button
        onClick={() =>
          fetch("/api/newTest", {
            method: "GET",
          }).then((res) => {
            console.log(res);
          })
        }
      >
        /api/newTest
      </button>
    </div>
  );
}

export default Home;
