type Props = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ type = "text", ...props }: Props) {
  return (
    <input
      type={type}
      className="placeholder-gray-400 text-gray-600 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}
