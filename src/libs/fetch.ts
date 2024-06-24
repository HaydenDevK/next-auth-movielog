export const fetchThemedMovies = async (type: string, page = 1) =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/themed-movies?type=${type}&page=${page}`
    )
  ).json();
