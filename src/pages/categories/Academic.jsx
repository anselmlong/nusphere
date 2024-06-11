import React from "react";
import Category from "../../components/Category";

const Academic = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            <h1>
                Academic Events:
                <Category category="Academic" />
            </h1>
        </div>
    );
};

export default Academic;