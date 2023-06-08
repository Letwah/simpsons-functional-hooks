// const Search = (props) => {
//   const { onSearchInput, onLikeDislikeInput, onCharacterInput } = props;

import { useState } from "react";
import { validate } from "../validation";

//   return (
//     <>
//       <input
//         id="characterInput"
//         onInput={onCharacterInput}
//         type="text"
//         placeholder="start typing ..."
//       ></input>
//       <input
//         onInput={onSearchInput}
//         type="text"
//         placeholder="Search Characters ..."
//       />
//       {/* {" "} */}

//       <select onChange={onLikeDislikeInput}>
//         <option value="">Reset</option>
//         <option value="liked">Liked</option>
//         <option value="notLiked">Not Liked</option>
//       </select>
//     </>
//   );
// };

const Search = () => {
  const [characterInput, setCharacterInput] = useState({
    characterId: "",
  });
  const [errors, setErrors] = useState(null); //null mean no errors

  const onCharacterInput = async (e) => {
    const result = { ...characterInput, [e.target.id]: e.target.value };
    setCharacterInput(result);

    //validate input

    // const res = await validate(characterInput);
    // setErrors(res);
    //OR

    setErrors(await validate(result, "characterSchema"));
  };

  return (
    <>
      <input
        value={characterInput.characterId}
        id="characterId"
        onInput={onCharacterInput}
        type="text"
        placeholder="start typing ..."
      />
      <p>{errors && errors.characterId}</p>
    </>
  );
};
export default Search;
