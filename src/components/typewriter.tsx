"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type TypeWriterProps = {
  txt: string; // Ensure the `txt` prop is a string
};

function TypewriterComponent({ txt }: TypeWriterProps) {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString(txt).pauseFor(200).deleteAll().start();
      }}
      options={{
        loop: true, // Enable looping
      }}
    />
  );
}

export default TypewriterComponent;
