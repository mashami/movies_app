import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  // Include other properties if necessary
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};

const MoviesDetailsPage = () => {
  const router = useRouter();
  const movieId = router.query.id;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );

        const data = await response.json();
        if (!ignore) {
          setMovie(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovie();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  return (
    <div className="bg-fuchsia-500 py-32 px-20 flex items-center justify-center w-full text-black h-full">
      {movie ? (
        <div className="flex flex-col items-center">
          <h1>{movie.title}</h1>
          <img
            className="rounded-2xl w-72 h-72 flex self-center "
            width={300}
            height={200}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt=""
          />
          <p>{movie.overview}</p>
        </div>
      ) : (
        <div className="py-48 flex items-center justify-center bg-white">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default MoviesDetailsPage;
