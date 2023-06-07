const Image = (props) => {
  const { image, character, liked } = props;
  // console.log(props);
  return (
    <>
      <div>
        <img
          className={liked ? "liked" : "notLiked"}
          src={image}
          alt={character}
        />
      </div>
    </>
  );
};

export default Image;
