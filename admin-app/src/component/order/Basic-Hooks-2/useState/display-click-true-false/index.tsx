import { useState } from "react";
import { sculptureList } from "./data";

export function GalleryUseState() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasNext = index < sculptureList.length - 1;
  const hasPrev = index > 0;

  const handleClickNext = () => {
    return hasNext && setIndex(index + 1);
  };
  const handleClickPrev = () => {
    return hasPrev && setIndex(index - 1);
  };
  const handleShow = () => {
    setShowMore(!showMore);
  };
  const array = sculptureList[index];
  return (
    <>
      <button onClick={handleClickNext} disabled={!hasNext}>
        Next
      </button>
      <button onClick={handleClickPrev} disabled={!hasPrev}>
        Prev
      </button>
      <h2>
        <i>{array.name} </i>
        by {array.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleShow}>{showMore ? "Hide" : "Show"} details</button>
      {showMore && <p>{array.description}</p>}
      <img src={array.url} alt={array.alt} />
      <p>{array.description}</p>
    </>
  );
}
