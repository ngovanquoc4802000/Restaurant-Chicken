import DrinkItems from "./drinkItem";
export type Root = Root2[];

export interface Root2 {
  id: number;
  title: string;
  part: string;
  caffeine: string;
  age: string;
}

const nameParent: Root = [
  {
    id: 0,
    title: "tea",
    part: "leaf",
    caffeine: "15–70 ",
    age: "4,000",
  },
  {
    id: 1,
    title: "coffee",
    part: "bean",
    caffeine: "80-185",
    age: "10,000",
  },
  {
    id: 2,
    title: "orange",
    part: "super",
    caffeine: "34-54 ",
    age: "15,000",
  },
  {
    id: 3,
    title: "map",
    part: "alo",
    caffeine: "34-54 ",
    age: "45,000",
  },
];

export default function DrinkList() {
  return (
    <div>
      <DrinkItems list={nameParent} />
    </div>
  );
}
