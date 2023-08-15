// import {useEffect, useState} from "react";
// import {useData} from "../../contexts/DataContext";
// import {getMonth} from "../../helpers/Date";

// import "./style.scss";

// const Slider = () => {
//   const {data} = useData();
//   const [index, setIndex] = useState(0);
//   const byDateDesc = data?.focus.sort((evtA, evtB) =>
//     // inverser le signe de "<" vers ">" pour changer l'ordre des photos
//     new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
//   );
//   const nextCard = () => {
//     setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
//   };
//   useEffect(() => {
//     nextCard();
//   });

//   return (
//     <div className="SlideCardList">
//       {byDateDesc?.map((event, idx) => (
//         <>
//           <div
//             key={event.title}
//             className={`SlideCard SlideCard--${
//               index === idx ? "display" : "hide"
//             }`}>
//             <img src={event.cover} alt="forum" />
//             <div className="SlideCard__descriptionContainer">
//               <div className="SlideCard__description">
//                 <h3>{event.title}</h3>
//                 <p>{event.description}</p>
//                 <div>{getMonth(new Date(event.date))}</div>
//               </div>
//             </div>
//           </div>
//           <div className="SlideCard__paginationContainer">
//             <div className="SlideCard__pagination">
//               {byDateDesc.map((_, radioIdx) => (
//                 <input
//                   key={`${event.id}`}
//                   type="radio"
//                   name="radio-button"
//                   checked={idx === radioIdx}
//                 />
//               ))}
//             </div>
//           </div>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Slider;

import {useEffect, useState} from "react";
import {useData} from "../../contexts/DataContext";
import {getMonth} from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const {data} = useData();
  const [index, setIndex] = useState(0);

  // inverse of the sign from "<" to ">" to change the order of the photos
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    // added clean up function
    return () => clearInterval(interval);
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // modification of the fragment by a div with key
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
        // moved outside the main loop in order to display the radio box correctly
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((currentEvent, radioIdx) => (
            <input
              // add id in Json file
              key={currentEvent.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
