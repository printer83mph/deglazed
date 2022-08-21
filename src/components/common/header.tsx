const Header = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <h2
    className={`select-none font-sans text-2xl font-semibold tracking-tight ${className}`}
  >
    {children}
  </h2>
)

export default Header
