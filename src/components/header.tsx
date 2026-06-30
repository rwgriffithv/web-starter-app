interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
