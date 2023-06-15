import Head from "next/head";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function layout({
  children,
  isSubmitted,
  setIsSubmitted,
  searchQuery,
  setSearchQuery,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Movies</title>
        <meta
          name="description"
          content="A web app to show the latest movies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-inherit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitted(true);
          }}
        >
          <input
            type="search"
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </nav>

      <main>{children}</main>
    </div>
  );
}

export default layout;
