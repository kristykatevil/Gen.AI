import Link from "next/link";

export function Nav() {
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">MeshMint Starter</Link>
        <div className="nav-links">
          <Link className="nav-pill" href="/app">Dashboard</Link>
          <Link className="nav-pill" href="/app/create">Create</Link>
        </div>
      </div>
    </div>
  );
}
