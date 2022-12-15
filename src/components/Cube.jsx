import "./cube.css";

function Cube() {
  return (
    <>
      <div className="page-container">
        <div className="cube">
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="left"></div>
          <div className="right"></div>
          <div className="front"></div>
          <div className="back"></div>
          <div className="cube-shadow"></div>
        </div>
      </div>
    </>
  );
}

export default Cube;
