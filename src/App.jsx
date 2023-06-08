import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Simpsons from "./components/Simpsons";
import Loading from "./components/Loading";
import Search from "./components/Search";

import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState(); //hooks always go at top
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState("");
  const [characterInput, setCharacterInput] = useState("");

  const getData = useCallback(async () => {
    console.log("get data ran");
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=${characterInput}` //Would return up to 15 quotes from Homer and Milhouse
      );
      //fix the api data to have unique id
      data.forEach((element, index) => {
        element.id = index + Math.random();
      });
      setSimpsons(data);
    } catch (error) {
      console.log(error);
    }
  }, [characterInput]);

  // console.log(characterInput);

  useEffect(() => {
    getData();
  }, [getData]); // hook that triggers behaviour - means run once cos square brackets (dependancy array)

  const onLikeToggle = (id) => {
    const _simpsons = [...simpsons];
    const indexOf = _simpsons.findIndex((char) => {
      return char.id === id;
    });
    ///toggle liked property

    console.log(indexOf, id);
    _simpsons[indexOf].liked = !_simpsons[indexOf].liked;
    setSimpsons(_simpsons);
  };

  const onDelete = (id) => {
    const _simpsons = [...simpsons];
    const indexOf = _simpsons.findIndex((char) => {
      return char.id === id;
    });
    _simpsons.splice(indexOf, 1);
    setSimpsons(_simpsons);
  };

  //ATTEMPT AT set direction here
  const onDirection = (id) => {
    const _simpsons = [...simpsons];
    const indexOf = _simpsons.findIndex((char) => {
      return char.id === id;
    });
    ///toggle liked property

    console.log(indexOf, id);
    // if (_simpsons[indexOf].characterDirection === "Left") {
    //   _simpsons[indexOf].characterDirection = "Right";
    // } else {
    //   _simpsons[indexOf].characterDirection = "Left";
    // }

    _simpsons[indexOf].characterDirection =
      _simpsons[indexOf].characterDirection === "Left" ? "Right" : "Left";

    setSimpsons(_simpsons);
  };

  const onCharacterInput = (value) => {
    setCharacterInput(value);
  };

  const onSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const onLikeDislikeInput = (e) => {
    // console.log("yo");
    setLiked(e.target.value);
  };

  //if nothing in state show "loading"
  if (!simpsons) return <Loading />;
  // console.log(simpsons); //check if data is in state

  if (simpsons.length === 0) return <p>You deleted everyone!</p>;

  //filter by search
  let simpsonsCopy = [...simpsons];
  if (search) {
    simpsonsCopy = simpsonsCopy.filter((item) => {
      console.log(item.character, search);
      if (item.character.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    });
  }
  //sort by liked/not liked
  // console.log(liked);
  if (liked === "liked") {
    simpsonsCopy.sort((itemOne, itemTwo) => {
      if (itemOne.liked === true) return -1;
      if (!itemTwo.liked) return 1;
    });
  } else if (liked === "notLiked") {
    simpsonsCopy.sort((itemOne, itemTwo) => {
      if (itemTwo.liked === true) return -1;
      if (!itemOne.liked) return 1;
    });
  }

  // calculate the total
  let total = 0;
  simpsonsCopy.forEach((char) => {
    if (char.liked) total++;
  });

  return (
    <>
      <div className="title">
        <img
          className="logo"
          src="src/assets/simpsons-logo-pink.svg"
          alt="simpsons logo"
        ></img>
        <h1>
          Total No of Liked Characters <span>&#128073; </span>
          {total}
        </h1>

        <Search
          characterInput={characterInput}
          onCharacterInput={onCharacterInput}
          onSearchInput={onSearchInput}
          onLikeDislikeInput={onLikeDislikeInput}
        />
      </div>
      <Simpsons
        simpsons={simpsonsCopy}
        onLikeToggle={onLikeToggle}
        onDelete={onDelete}
        onDirection={onDirection}
        setDirection={onDirection}
      />
    </>
  ); //must return HTML
};

export default App;

////////////////////////////////
// CONTEXT(low grade solution)

// import React from 'react';

// const ThemeContext = React.createContext("light")
// const App = () => {
//   return <ThemeContext.Provider value="dark">
//     <Child></Child>
//     </ThemeContext.Provider> ;
// }

// export default App;

// //////

// const Child = () => {
//   return ( <MyContext.Provider>
// /something consumed here.........
//   </MyContext.Provider> );
// }

// export default Child;
