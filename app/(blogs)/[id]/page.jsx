export default function Blog({ params }) {
  return (
    <>
      {console.log(params)}
      <h1>ID: {params.id}</h1>
    </>
  );
}
