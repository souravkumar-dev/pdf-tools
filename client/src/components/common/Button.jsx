function Button({ children, ...props }) {
    return (
      <button
        className="border rounded px-5 py-2 hover:bg-gray-100"
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;