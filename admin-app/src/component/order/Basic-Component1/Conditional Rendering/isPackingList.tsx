import Items from "./item";
interface NamePacked {
  ispackedTrue: boolean;
  ispackedFalse: boolean;
}

const name: NamePacked = {
  ispackedTrue: true,
  ispackedFalse: false,
};
export default function IsPackingList() {
  return (
    <section>
      <h1>
        <strong>Sally Ride's Packing List</strong>
      </h1>
      <ul>
        <Items important={9} packed={name.ispackedTrue} name="space suit" />
        <Items important={0} packed={name.ispackedTrue} name="Helmet with a golden leaf" />
        <Items important={6} packed={name.ispackedFalse} name="Photo of Tam" />
      </ul>
    </section>
  );
}
