type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Container({ className = "", ...props }: Props) {
  return (
    <div
      {...props}
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    />
  );
}



