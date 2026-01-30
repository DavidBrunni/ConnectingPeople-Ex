type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "lg" | "sm";
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variants = {
    default: "bg-cyan-500 text-white hover:bg-cyan-600",
    outline: "border-2 border-current bg-transparent hover:opacity-90",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-base",
    sm: "h-8 px-3 py-1.5 text-sm",
  };
  return (
    <button
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
