const NavLink = ({
  href,
  children,
  style,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  style: React.CSSProperties;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={`text-xs font-bold hover:opacity-80 transition-opacity ${className}`}
      style={style}
    >
      {children}
    </a>
  );
};

export default NavLink;
