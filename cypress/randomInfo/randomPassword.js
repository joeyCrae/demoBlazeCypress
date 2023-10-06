const randomPassword = () => {
          const specialChars = ['*', '@', '!', '_', '-', '#', '$', '%'];
          const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
          const passwordLength = Math.floor(Math.random() * 3) + 8; // Random length between 8 and 10
          let password = '';
        
          for (let i = 0; i < passwordLength; i++) {
            if (i % 2 === 0) {
              // Use a special character
              const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
              password += randomSpecialChar;
            } else {
              // Use a letter or number
              const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
              password += randomChar;
            }
          }
        
          return password;
}

module.exports = randomPassword;