import React from "react";

const MyEvents = ({ user }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            {user &&
                <h1>
                    {user.name}'s Events:
                </h1>
            }
        </div>
    );
};

export default MyEvents;