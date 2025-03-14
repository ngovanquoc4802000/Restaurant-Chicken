interface IsPacking {
  packed?: boolean;
  name?: string;
  important: number;
}
/* cách 1: if else ? :*/
/* export default function Items({ packed, name }: IsPacking) {
  return <li className="item">{packed ? name + " ✅" : name + "❌"}</li>;
} */

/* cách 2: sử dụng && */
export default function Items({ important, name }: IsPacking) {
  return important > 0 ? (
    <li className="items">
      {name}
      <i>(Importance: {important})</i>
    </li>
  ) : (
    name
  );
}
