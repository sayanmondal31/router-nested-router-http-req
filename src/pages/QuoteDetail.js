import React,{useEffect} from "react";
import { Route, useParams, Link,useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


function QuoteDetail() {
  const params = useParams();
  const match = useRouteMatch()

  const {id} = params

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote,true)

  useEffect(() => {
     sendRequest(id)
  }, [sendRequest,id])

  if(status === "pending"){
      return <div className="centered" >
          <LoadingSpinner />
      </div>   
  }

  if(error){
      return <p className="centered">{error}</p>
  }

  if (!loadedQuote) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <h1>Quote Detail</h1>
        {console.log(loadedQuote)}
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      {/* Load comments will show only when "/quotes/qouteId" will be there
      * in case "/quotes/quoteId/comments" is the route then [ load comments ]
      * won't show
      */}
      <Route path={`${match.path}`} exact >
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments{" "}
          </Link>
        </div>
      </Route>

      {/* nested route */}
      {/* <Route path="/quotes/:id/comments">
                <Comments />
            </Route>  */}

      {/* Alternative */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
}

export default QuoteDetail;
