import Character from "./Character";

const Simpsons = (props) => {
  const {
    simpsons,
    onDelete,
    onLikeToggle,
    onLikeDislikeInput,
    onDirection,
    direction,
  } = props;
  return (
    <>
      {simpsons.map((item) => {
        return (
          <Character
            item={item}
            key={item.id}
            onDelete={onDelete}
            onLikeToggle={onLikeToggle}
            onLikeDislikeInput={onLikeDislikeInput}
            onDirection={onDirection}
            direction={direction}
          />
        );
      })}
    </>
  );
};

export default Simpsons;
