// Client / src / components / Button.jsx

const Button = ({
  text,
  children,
  onClick = () => {},
  className = "",
  style = {},
  type = "button",
  variant = "primary",
  size = "m",
  disabled = false,
  iconLeft,
  iconRight,
  color = "purple",
}) => {
  const colorVariants = {
    purple: "bg-purple-600 border-purple-600 hover:bg-purple-700",
    green: "bg-green-600 border-green-600 hover:bg-green-700",
    gray: "bg-gray-600 border-gray-600 hover:bg-gray-700",
  };

  const variants = {
    primary: `${colorVariants[color] || colorVariants.purple} text-white`,
    secondary: "bg-black text-white border-black hover:bg-gray-900",
    text: "bg-white text-black border-gray-200 hover:bg-gray-100",
  };

  const sizes = {
    s: "px-3 py-1.5 text-sm",
    m: "px-6 py-2",
    l: "px-8 py-3 text-base",
  };

  const baseClasses = `cursor-pointer rounded-md border transition-all hover:rounded-full disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 ${variants[variant] || variants.primary} ${sizes[size] || sizes.m} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={style}
      disabled={disabled}
    >
      {iconLeft}
      {children || text}
      {iconRight}
    </button>
  );
};

export default Button;
