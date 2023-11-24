import { Link, useMatch, useResolvedPath } from "react-router-dom";

type ReactNode_Custom = boolean | null | undefined | React.ReactNode;
type TCustomLink = {
  to: string,
  children: ReactNode_Custom
  className?:string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const CustomLink = ({to, children, className='', onClick} : TCustomLink) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <span className={isActive ? "linkActive" : ""}>
      <Link to={to} className={`${className} `} onClick={onClick}>{children}</Link>
    </span>
  );
}

export default CustomLink