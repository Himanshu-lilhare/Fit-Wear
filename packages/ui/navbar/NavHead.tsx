import Link from "next/link"
const NavHead = () => {
  return <Link style={{textDecoration:"none",color:"var(--primary-textcolor)"}} href={"/"}><h1 className="nav-head">Fit-Wear</h1></Link>;
};

export default NavHead;
