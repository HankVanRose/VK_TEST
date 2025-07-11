 

const LoremGenerator  = ({ paragraphs = 1 }) => {
  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

  return (
    <div>
      {Array.from({ length: paragraphs }).map((_, i) => (
        <span key={i}>{loremText}</span>
      ))}
    </div>
  );
};

export default LoremGenerator ;
