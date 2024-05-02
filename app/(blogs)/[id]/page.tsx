export default function Blog({ params }: { params: { id: string }}): React.ReactNode {
  return (
    <>
      {console.log(params)}
      <h1>ID: {params.id}</h1>
    </>
  );
}
