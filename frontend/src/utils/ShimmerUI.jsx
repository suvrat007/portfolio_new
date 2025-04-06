import React from "react";

const ShimmerUI = () => {
    return (
        <div className="flex justify-center items-center h-32 space-x-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
        </div>
    );
};

export default ShimmerUI;
