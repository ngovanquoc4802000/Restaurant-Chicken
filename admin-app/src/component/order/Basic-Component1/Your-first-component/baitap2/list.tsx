import { People } from "./data";

interface List {
  marginBottom: string;
  display: string;
  gridtemplatecolumns: string;
  alignItems: string;
  styleNone: string;
}

const styleList: List = {
  marginBottom: "10px",
  display: "gird",
  gridtemplatecolumns: "1fr 1fr",
  alignItems: "center",
  styleNone: "none",
};

export default function List() {
  const list = People.map((item, id) => (
    <>
      <li
        style={{
          display: styleList.display,
          alignItems: styleList.alignItems,
          gridTemplateColumns: styleList.gridtemplatecolumns,
          marginBottom: styleList.marginBottom,
          listStyle: styleList.styleNone,
        }}
        key={id}
      >
        <img src={`https://i.imgur.com/${item.imageId}s.jpg`} alt="" />
        <strong>{item.name}</strong>
      </li>
    </>
  ));
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{list}</ul>
    </article>
  );
}
