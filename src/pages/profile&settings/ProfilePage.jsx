import { useAuth } from "../storeing-data/auth"
import { VscVerifiedFilled } from "react-icons/vsc";


export const ProfilePage = () => {
    const { user, loading } = useAuth();


    console.log(user);
    return (
        <>
            <div className="view">
                <div className="d-clmn">
                    <p>{user.fullname}</p>
                    <p>{user.phone}</p>


                    <div className="d-row">
                        <div style={{ alignItems: "center" }} className="d-row">
                            <p>{user.email}</p>
                            {user.email_verified ?
                                <>
                                    {/* verification tick if email is verified */}

                                    <div style={{ color: "#13aa52", marginInlineStart: "0.2em" }} className="d-row">
                                        <VscVerifiedFilled />
                                    </div>
                                </>
                                :
                                <>
                                    <div style={{ color: "#13aa52", marginInlineStart: "0.2em" }} className="d-row">
                                        Verify email
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}