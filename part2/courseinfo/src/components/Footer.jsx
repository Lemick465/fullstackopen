const Footer = ({ courseParts }) => {
  return (
    <h3>
      total of {courseParts.reduce((total, part) =>
        total + part.exercises, 0)} exercises
    </h3>
  );
};

export default Footer;
