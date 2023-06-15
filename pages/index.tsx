import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};

interface HomeProps {
  isSubmitted: boolean;
  searchQuery: string;
}

export default function Home({ isSubmitted, searchQuery }: HomeProps) {
  const [movies, setMovies] = useState<any[]>([]);
  const [movie, setMovie] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("isSubmitted => ", isSubmitted);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        const data = await response.json();
        if (!ignore) {
          setMovies(JSON.parse(JSON.stringify(data.results)));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const searchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=Fast&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();

        console.log("data =>", data);
        console.log("Search Movie Function");

        if (!ignore) {
          setMovie(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovies();

    if (isSubmitted) {
      searchMovie();
    }

    return () => {
      ignore = true;
    };
  }, [isSubmitted, searchQuery]);
  // console.log(movies);
  return (
    <main className=" bg-fuchsia-500 w-full h-full">
      <div className="space-y-4 ">
        <h1 className="text-white flex justify-center items-center text-[40px]">
          ALL trending movies
        </h1>

        <div>
          {isLoading ? (
            <div className="py-48 flex items-center justify-center bg-white">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="px-16 grid grid-cols-4 items-center gap-4 ">
              {movies &&
                movies.length > 0 &&
                movies.map((movie) => (
                  <div className="" key={movie.id}>
                    <Card
                      title={movie.title}
                      image={movie.poster_path}
                      overview={movie.overview}
                      id={movie.id}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
