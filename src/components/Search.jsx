import { useState } from "react";
import { validate } from "../validation";

const Search = (props) => {
  const { onCharacterInput, characterInput, onLikeDislikeInput } = props;
  const [errors, setErrors] = useState(null); //null mean no errors

  const onInput = async (e) => {
    onCharacterInput(e.target.value);

    //validate input - can write like this

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
        value={characterInput}
        id="characterId"
        onInput={onInput}
        type="text"
        placeholder="start typing ..."
      />
      <p>{errors && errors.characterId}</p>

      <select onChange={onLikeDislikeInput}>
        <option value="">Reset</option>
        <option value="liked">Liked</option>
        <option value="notLiked">Not Liked</option>
      </select>
    </>
  );
};
export default Search;
