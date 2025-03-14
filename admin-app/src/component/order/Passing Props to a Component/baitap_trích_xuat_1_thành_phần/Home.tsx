import { Profile } from "./profile";

export default function Gallery() {
  const name: string = "Maria Skłodowska-Curie";
  const size: number = 100;
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        awards={["Nobel Prize in Physics", "Nobel Prize in Chemistry", "Davy Medal", "Matteucci Medal"]}
        src="szV5sdG"
        title={"Maria Skłodowska-Curie"}
        width={size}
        height={size}
        alt={name}
      />
      <Profile
        awards={["Miyake Prize for geochemistry", "Tanaka Prize"]}
        src="YfeOqp2"
        title={"Katsuko Saruhashi"}
        width={size}
        height={size}
        alt={name}
      />
    </div>
  );
}
