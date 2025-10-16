type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function Heading({ level = 1, className = "", children, ...props }: Props) {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };
  return (
    <Tag {...(props as any)} className={`${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
}



