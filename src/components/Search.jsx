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

const Search = (props) => {
  const [errors, setErrors] = useState(null); //null mean no errors

  const onInput = async (e) => {
    props.onCharacterInput(e.target.value);

    //validate input

    // const res = await validate(characterInput);
    // setErrors(res);
    //OR

    setErrors(
      await validate({ [e.target.id]: e.target.value }, "characterSchema")
    );
  };

  return (
    <>
      <input
        value={props.characterInput}
        id="characterId"
        onInput={onInput}
        type="text"
        placeholder="start typing ..."
      />
      <p>{errors && errors.characterId}</p>
    </>
  );
};
export default Search;
