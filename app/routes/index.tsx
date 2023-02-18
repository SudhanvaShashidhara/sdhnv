import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="p-5">
      <h1 className="text-4xl text-center">SDHNV</h1>
      <hr />
      <Link to="/contact/">Contact Page</Link>
      <hr />
      <h2 className="text-2xl text-center">Home Page</h2>
    </div>
  );
}
