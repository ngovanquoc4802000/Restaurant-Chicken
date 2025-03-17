interface Person {
  src: string;
  style: object;
  alt: string;
}

export function Profile({ src, style, alt }: Person) {
  return <img style={style} src={src} alt={alt} />;
}
