const randomUsername = () => {
          const length = 6; // Define the desired length of the name
          let name = '';
        
          // Generate random letters and append them to the name
          for (let i = 0; i < length; i++) {
            const randomCharCode = 97 + Math.floor(Math.random() * 26); // Generate a random ASCII code for lowercase letters (97-122)
            const randomLetter = String.fromCharCode(randomCharCode); // Convert the ASCII code to a letter
            name += randomLetter; // Append the letter to the name
          }
        
          return name;
}

module.exports = randomUsername;