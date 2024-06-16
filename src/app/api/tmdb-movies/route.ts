export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const page = searchParams.get("page");
  const url = `${process.env.NEXT_PUBLIC_TMDB_URL}${type}?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  };

  const result = await (await fetch(url, options)).json();
  return Response.json(result);
}
