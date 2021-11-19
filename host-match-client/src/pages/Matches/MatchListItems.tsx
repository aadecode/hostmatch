import { Link } from "react-router-dom";
import { HMListItem } from "../../components/ListIttem";
import { IMatchDetails } from "../HostMatch";

export interface IMatchListItemProps {
  matches: IMatchDetails[];
}

const MatchListItems = (props: IMatchListItemProps) => {
  const { matches } = { ...props };
  return (
    <>
      {matches.map(
        (match: IMatchDetails): JSX.Element => (
          <Link to={`/match/${match.id}`} key={match.id}>
            <HMListItem
              location={match.location}
              time={match.time}
              smallHeading={`Match id - ${match.title}`}
              itemId={match.id || ""}
            >
              <>
                <div
                  className={`d-flex w-100 justify-content-between align-items-center mb-2`}
                >
                  <div
                    className={`d-flex w-100 justify-content-start align-items-center`}
                  >
                    <i className="fas fa-flag"></i>
                    <h6 className="mx-3 mb-0">{match.teams[0].value}</h6>
                  </div>
                  {/* <h6 className="mx-4">Score</h6> */}
                </div>
                <div
                  className={`d-flex w-100 justify-content-between align-items-center mb-2`}
                >
                  <div
                    className={`d-flex w-100 justify-content-start align-items-center`}
                  >
                    <i className="fas fa-flag-checkered"></i>
                    <h6 className="mx-3 mb-0">{match.teams[1].value}</h6>
                  </div>
                  {/* <h6 className="mx-4">Score</h6> */}
                </div>
              </>
            </HMListItem>
          </Link>
        )
      )}
    </>
  );
};

export { MatchListItems };
