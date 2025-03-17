import { Profile } from "./Profile";
import { Object } from "../../mockup/profile/profile";

const profile: Object = {
  src: "https://i.imgur.com/MK3eW3As.jpg",
  px: "1rem",
  alt: "hình ảnh",
};
export default function ParentProfile() {
  return (
    <>
      <Profile style={{ padding: profile.px }} src={profile.src} alt={profile.alt} />
      <Profile style={{ padding: profile.px }} src={profile.src} alt={profile.alt} />
    </>
  );
}
