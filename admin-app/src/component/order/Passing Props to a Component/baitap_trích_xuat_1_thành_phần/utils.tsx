interface GetUI {
  src: string;
  width: number;
  height: number;
  size: string;
  alt: string;
}

export function GetImageUrl({ src, size, alt, width, height }: GetUI) {
  return <img src={"https://i.imgur.com/" + src + size + ".jpg"} alt={alt} width={width} height={height} />;
}
