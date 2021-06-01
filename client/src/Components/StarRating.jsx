import React from 'react';


function StarRating(props) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= props.rating){
            stars.push(<i className="fas fa-star text-warning"></i>);
        } else if (!Number.isInteger(props.rating) && i===Math.ceil(props.rating)) {
            stars.push(<i className="fas fa-star-half-alt text-warning"></i>);
        }else{
            stars.push(<i className="far fa-star text-warning"></i>);
        };
    };
    return (
        <>
           {stars}
        </>
    );
};

export default StarRating