import Link from "next/link";

const SecondLinks = () => {
  return (
    <div className="second-links">
      <Link href={"/cart"}>Cart</Link>
      <Link href={"/Profile"} className="profile-link">
        Profile
      </Link>
    </div>
  );
};

export default SecondLinks;
