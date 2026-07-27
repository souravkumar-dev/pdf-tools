function Button({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <>
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}

        <span>{children}</span>

        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </>
    </button>
  );
}

export default Button;
