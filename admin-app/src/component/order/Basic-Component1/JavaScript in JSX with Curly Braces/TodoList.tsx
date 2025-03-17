export interface Todo {
  name: string;
  imageId: string;
  imageSize: string;
  theme: Theme;
}

export interface Theme {
  backgroundColor: string;
  color: string;
}
const baseUrl: string = "https://i.imgur.com/";
const person: Todo = {
  name: "Gregorio Y. Zara",
  imageId: "7vQD0fP",
  imageSize: "s",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <img className="avatar" src={baseUrl + person.imageId + person.imageSize + ".jpg"} alt={person.name} />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
