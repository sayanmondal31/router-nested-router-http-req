import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import QuoteDetail from "./QuoteDetail";
import { getAllQuotes } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Max",
    text: "here is the text",
  },
  {
    id: "q2",
    author: "Max 2",
    text: "here is the text 2",
  },
];

function AllQuote() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if(status === "pending"){
      return <div className="centered">
          <LoadingSpinner />
      </div>
  }

  if(error){
      return <p className='centered focused'>{error}</p>

  }

  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0) ){
      return <NoQuotesFound />
  }

  return (
    <div>
      <h1>All quotes</h1>

      <QuoteList quotes={loadedQuotes} />
    </div>
  );
}

export default AllQuote;
