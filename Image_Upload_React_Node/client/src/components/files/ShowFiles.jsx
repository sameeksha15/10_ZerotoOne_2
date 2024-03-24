import classes from "./ShowFiles.module.css";

function ShowFiles() {
  return (
    <div className={classes.insights_container}>
      <p>
        Predicted disease: <strong>bacterial blight</strong>
      </p>
      <h4>INSIGHTS</h4>

      <p>
        Bacterial blight is a common plant disease caused by various species of
        bacteria that infect a wide range of crops and plants. It is
        characterized by water-soaked lesions on leaves, stems, and fruits,
        often leading to wilting, necrosis, and ultimately plant death.
        Bacterial blight can be spread through infected seeds, contaminated
        tools, and equipment, as well as wind and water movement.
      </p>

      <h3>Causes of bacterial blight:</h3>
      <ol>
        <li>
          Warm and humid conditions favor the growth and spread of bacteria.
        </li>
        <li>
          Overhead irrigation can create ideal conditions for bacterial blight
          to thrive.
        </li>
        <li>
          Inadequate spacing between plants can promote the spread of the
          disease.
        </li>
        <li>
          Lack of crop rotation and poor sanitation practices can lead to the
          persistence of the bacteria in the soil.
        </li>
      </ol>

      <h3>Precautionary measures to prevent the spread of bacterial blight:</h3>
      <ul>
        <li>Use disease-resistant crop varieties whenever possible.</li>
        <li>
          Practice crop rotation and avoid planting susceptible crops in the
          same area consecutively.
        </li>
        <li>
          Maintain proper spacing between plants to improve air circulation and
          reduce humidity.
        </li>
        <li>
          Avoid working in the fields when plants are wet to prevent the spread
          of bacteria.
        </li>
        <li>
          Use clean and sterilized tools and equipment to minimize the risk of
          contamination.
        </li>
        <li>
          Implement proper irrigation methods such as drip irrigation to reduce
          water splash and minimize bacterial spread.
        </li>
      </ul>
    </div>
  );
}

export default ShowFiles;
