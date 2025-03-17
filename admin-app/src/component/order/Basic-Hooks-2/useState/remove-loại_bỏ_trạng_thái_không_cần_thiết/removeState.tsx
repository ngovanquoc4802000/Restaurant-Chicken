export function RemoveState() {
  function handleClick() {
    /* đặt tên biến  */
    const name = prompt("What is your name?");
    alert(`Hello, ${name}!`);
  }

  return <button onClick={handleClick}>Greet</button>;
}
