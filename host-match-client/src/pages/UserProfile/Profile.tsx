import React from "react";
import { connect } from "react-redux";
import { dateKeys, profileKeys } from ".";
import { getLabelFromKey } from "../../utilities";
import { IUserProfie } from "./Utilities";

interface IHMUserProfle {
    profile: IUserProfie;
};

const Profile = (props: IHMUserProfle): JSX.Element => {
    const { profile } = {...props};
    React.useEffect((): void => {
    }, []);
    
    return <>
            <div className="card user-profile">
            <img src={profile.photoURL} className="card-img-top" alt="..." />
            <div className="card-body">
                {profileKeys.map((key: string): JSX.Element | null => {
                    return profile[key] ? <div className='mb-2' key={key}>
                        <h5 className="card-title">{getLabelFromKey(key)}</h5>
                        <p className="card-text">{profile[key]}</p>
                    </div> : null;
                })}

            </div>
            </div>

    </>

};

const mapStateToProps = (state: any) => {
    return {
        profile: state.firebase.auth
    };
}


const HMUserProfile: any = connect(mapStateToProps)(Profile);
export { HMUserProfile };