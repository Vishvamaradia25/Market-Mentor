import mountain from "../assets/montain.png";
import aircraft from "../assets/aircraft.png";
import { MAIN_DATA1, MAIN_DATA2, MAIN_DATA3 } from "./Data";

const Main = () => {
    return (
        
        <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                   <div className="flex flex-col items-center lg:items-start">
                    <h1  className="pb-10 text-5xl font-thick tracking-tight lg:mt-14 lg:text-5xl text-white -mt-2">What HAL do?</h1>
                    <p className="text-white flex justify-center mb-2 -mt-4 "> {MAIN_DATA1}</p>
                     <p className="text-white gap-y-3 mb-3"> {MAIN_DATA2}</p>
                    <p className="text-white gap-y-3">{MAIN_DATA3}</p> 
                   </div>
                </div>
                <div className="flex-1 lg:w-1/2 flex justify-center lg:justify-end items-center relative" style={{width: '50vw', height: '80vh', }} >  

                   <img src={mountain} alt="mountain"
                    style={{width: '90%',height: '100%',objectFit: 'cover', }} 
                    />
               
                     <img src={aircraft} alt="aircraft"
                    style={{position: 'absolute',left: '10%', top: '30%', width: '300px', height: 'auto',transform: 'translateY(-50%)', }}
                      />
                </div>
         </div>
    );
};

export default Main;


