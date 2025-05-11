import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Machine data with GitHub themes
const machines = [
  {
    id: 1,
    name: "Octocat Pusher",
    description: "The classic GitHub mascot themed coin pusher",
    image: "/assets/coin-pusher.jpg",
    theme: "github-dark",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Contribution Graph",
    description: "Push coins to fill your contribution graph",
    image: "/assets/coin-pusher.jpg",
    theme: "github-light",
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Pull Request",
    description: "Merge your coins to win big rewards",
    image: "/assets/coin-pusher.jpg",
    theme: "github-purple",
    difficulty: "Hard"
  },
  {
    id: 4,
    name: "Issue Tracker",
    description: "Solve issues by pushing coins into the right slots",
    image: "/assets/coin-pusher.jpg",
    theme: "github-yellow",
    difficulty: "Medium"
  },
  {
    id: 5,
    name: "Fork & Clone",
    description: "Fork the repository of coins for massive payouts",
    image: "/assets/coin-pusher.jpg",
    theme: "github-accent",
    difficulty: "Expert"
  }
];

const MachineCarousel = ({ onSelectMachine }) => {
  const [selectedMachine, setSelectedMachine] = useState(machines[0]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (current, next) => setSelectedMachine(machines[next]),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  useEffect(() => {
    if (onSelectMachine) {
      onSelectMachine(selectedMachine);
    }
  }, [selectedMachine, onSelectMachine]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Your Machine</h2>
      
      <div className="bg-github-darker rounded-lg p-4 shadow-lg">
        <Slider {...settings}>
          {machines.map((machine) => (
            <div key={machine.id} className="px-2">
              <div className={`bg-${machine.theme} rounded-lg overflow-hidden border border-github-border`}>
                <div className="relative">
                  <img 
                    src={machine.image} 
                    alt={machine.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-github-dark px-3 py-1 rounded-full text-xs">
                    {machine.difficulty}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{machine.name}</h3>
                  <p className="text-github-text">{machine.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          className="bg-github-btn hover:bg-github-btn-hover text-white px-6 py-3 rounded-md font-medium"
          onClick={() => onSelectMachine && onSelectMachine(selectedMachine)}
        >
          Play {selectedMachine.name}
        </button>
      </div>
    </div>
  );
};

export default MachineCarousel;