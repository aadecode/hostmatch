import * as React from "react";
import { ITeam } from ".";
import { EHMButtonKind, HMButton, HMForm, IAttrs } from "../../components";
import { EViewModes } from "../../utilities/enums";

export interface ITeamDetailsProps {
  myTeam?: ITeam;
  deleteTeam: () => void;
  handleSubmit: (e: any, mode: string) => void;
  attrs: IAttrs[];
}

const TeamDetails = (props: ITeamDetailsProps): JSX.Element => {
  const { myTeam, deleteTeam, handleSubmit, attrs } = { ...props };
  const [teamAttrsViewMode, setTeamAttrsViewMode] = React.useState<string>(
    myTeam && myTeam.id ? EViewModes.READ : EViewModes.CREATE
  );
  React.useEffect(() => {
    setTeamAttrsViewMode(
      myTeam && myTeam.id ? EViewModes.READ : EViewModes.CREATE
    );
  }, [myTeam]);

  const nextMode: string =
    teamAttrsViewMode === EViewModes.EDIT ? EViewModes.READ : EViewModes.EDIT;

  const onSubmit = (e: any) => {
    handleSubmit(e, teamAttrsViewMode);
    setTeamAttrsViewMode(EViewModes.READ);
  };
  const onDelete = () => {
    deleteTeam();
    setTeamAttrsViewMode(EViewModes.CREATE);
  };

  return (
    <>
      {teamAttrsViewMode !== EViewModes.CREATE && (
        <>
          <div className="d-flex justify-content-end mb-1">
            <HMButton
              onClick={(): void => setTeamAttrsViewMode(nextMode)}
              kind={
                nextMode === EViewModes.EDIT
                  ? EHMButtonKind.EDIT
                  : EHMButtonKind.CANCEL
              }
            />
            <HMButton onClick={onDelete} kind={EHMButtonKind.DELETE} />
          </div>
        </>
      )}
      <HMForm
        handleSubmit={onSubmit}
        attrs={attrs}
        viewMode={teamAttrsViewMode}
      />
    </>
  );
};

export { TeamDetails };
