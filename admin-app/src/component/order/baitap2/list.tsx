import { People } from "./data";

interface List {
  marginBottm: string;
  display: string;
  gridtemplatecolumns: string;
  alignItems: string;
  styleNone: string;
}

const styleList: List = {
  marginBottm: "10px",
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
          marginBottom: styleList.marginBottm,
          listStyle: styleList.styleNone,
        }}
        key={id}
      >
        <strong>{item.name}</strong>
      </li>
      <img src={item.imageId} alt="" />
    </>
  ));
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{list}</ul>
    </article>
  );
}
