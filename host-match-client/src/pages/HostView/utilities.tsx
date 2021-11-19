import { IHMListItemProps } from "../../components/ListIttem";
import { IHMOption } from "../../components/SearchSelect";
import { IPlayerDetails } from "../Players/utilities";

export const getPlayersAsOptions = (
  players: IPlayerDetails[]
): IHMListItemProps[] => {
  return players.map((player: IPlayerDetails): IHMListItemProps => {
    return {
      itemId: player.id,
      title: player.displayName,
    };
  });
};
