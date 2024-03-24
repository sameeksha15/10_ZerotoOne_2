import axios from "axios";

export const flaskRequest = async (content, res) => {
  const config = {
    method: "post",
    url: "http://127.0.0.1:5000/getPlantHealth",
    "Content-Type": "application/json",
    data: { content },
  };

  try {
    const response = await axios(config);
    if (response && response.status === 200) {
      if (response.data.success === true)
        res.status(200).send({ success: true, message: "file data updated" });
      else
        res
          .status(response.status)
          .send({ success: false, message: "Failed to update" });
    } else res.status(400).send({ success: false, message: "Filed to update" });
  } catch (error) {
    if (error.response)
      res.status(400).send({ success: false, message: error });
    else if (error.request) {
      res.status(400).send({
        success: false,
        message: "Check your internet connection and try again ",
      });
    }
  }
};
