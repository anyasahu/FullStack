const express = require("express");
const app = express();


app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    
    if (!req.body || !req.body.data) {
      return res.status(400).json({
        is_success: false,
        error: "Missing 'data' field in request body",
      });
    }

    const data = req.body.data;

    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) { 
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const allAlpha = alphabets.join("");
    const reversed = allAlpha.split("").reverse().join("");
    let concatString = "";
    for (let i = 0; i < reversed.length; i++) {
      concatString += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
    }

    const response = {
      is_success: true,
      user_id: "anya_sahu_09102004", 
      email: "anya.sahu2022@vitstudent.ac.in",
      roll_number: "22BEC0205",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
