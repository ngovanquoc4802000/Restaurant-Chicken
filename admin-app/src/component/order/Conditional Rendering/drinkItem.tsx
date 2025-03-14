import { Root } from "./drinkList";
interface Items {
  list: Root;
}

export default function DrinkItems({ list }: Items) {
  return (
    <ul>
      <h1>{list.length - 1 + 2}</h1>
      {list.map(({ age, part, caffeine, title, id }) => (
        <li key={id}>
          <strong>{title}</strong>{" "}
          <dl>
            <dt>Part of plant</dt>
            <dd>{part}</dd>
            <dt>Caffeine content</dt>
            <dd>{caffeine}</dd>
            <dt>Age</dt>
            <dd>{age}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}
