import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Fireworks } from "@fireworks-js/react";
import { NoEncryption } from "@mui/icons-material";

function FireWorks(props) {
  const ref = useRef(null);
  const [sound, setSound] = useState(false);

  const initOptions = {
    initialStart: true,
    initialOptions: {
      hue: {
        min: 0,
        max: 360,
      },
      brightness: {
        min: 0,
        max: 100,
        decay: {
          min: 0.015,
          max: 0.05,
        },
      },
      delay: {
        min: 0,
        max: 100,
      },
      rocketsPoint: {
        min: 0,
        max: 100,
      },
      autoresize: true,
      boundaries: {
        visible: false,
      },
      sound: {
        enabled: false,
      },
    },
  };

  const startOption = () => {
    ref.current.updateOptions({
      explosion: 3,
      flickering: 50,
      intensity: 25,
      friction: 1,
      gravity: 1.5,
      opacity: 0.5,
      speed: 1,
      acceleration: 1.0,
      particles: 100,
      traceSpeed: 5,
      trace: 10,
      lineWidth: {
        explosion: {
          min: 1,
          max: 10,
        },
        trace: {
          min: 0.1,
          max: 1,
        },
      },
      sound: {
        enabled: sound,
        files: [
          "https://fireworks.js.org/sounds/explosion0.mp3",
          "https://fireworks.js.org/sounds/explosion1.mp3",
          "https://fireworks.js.org/sounds/explosion2.mp3",
        ],
        volume: {
          min: 10,
          max: 25,
        },
      },
      mouse: {
        click: true,
        max: 1,
      },
    });
  };

  const toggleSound = (e) => {
    if (e.key === "s") {
      ref.current.isRunning ? ref.current.stop() : ref.current.start();
    }

    if (e.type === "click" || e.key === "m") {
      setSound((prevState) => {
        return !prevState;
      });

      ref.current.updateOptions({
        sound: {
          enabled: !sound,
        },
      });
    }
  };

  useEffect(() => {
    startOption();

    return () => {};
  }, []);

  const style = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "#000",
    outline: "none"
  };

  return (
    <>
      <Fireworks ref={ref} options={initOptions} style={style} onClick={toggleSound} onKeyDown={toggleSound} autoFocus={true} tabIndex="0"/>
    </>
  );
}

export default FireWorks;
