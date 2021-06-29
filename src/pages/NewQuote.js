import React,{useEffect} from "react";
import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);

  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status,history]);

  function addQuoteHandler(quoteData) {
    sendRequest(quoteData);
  }

  return (
    <div>
      <h1>New Quote</h1>
      <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
    </div>
  );
}

export default NewQuote;
