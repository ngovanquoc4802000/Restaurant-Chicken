import { GetImageUrl } from "./utils";

interface UIProfile {
  title: string;
  width: number;
  height: number;
  alt: string;
  src: string;
  awards: string[];
}

export function Profile({ awards, title, width, height, alt, src }: UIProfile) {
  return (
    <section className="profile">
      <h2>{title}</h2>
      <GetImageUrl size="s" src={src} width={width} height={height} alt={alt} />
      <GetImageUrl size="m" src={src} width={width} height={height} alt={alt} />
      <ul>
        <li>
          <b>Profession: </b>
          physicist and chemist
        </li>
        <li>
          <b>Awards: {awards.length} </b>({awards.join(", ")})
        </li>
        <li>
          <b>Discovered: </b>
          polonium (chemical element)
        </li>
      </ul>
    </section>
  );
}
