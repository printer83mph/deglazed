const Subtitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <h2
    className={`select-none font-sans text-2xl font-medium tracking-tight ${className}`}
  >
    {children}
  </h2>
)

export default Subtitle
