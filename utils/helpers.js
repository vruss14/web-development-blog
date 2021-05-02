module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    },

    format_img: () => {
        // This array is a series of IDs from Lorem Picsum that are technology related
        let pictureOptions = [201, 2, 366, 3, 370, 4, 445, 48, 532, 60, 668, 740];

        let randomId = pictureOptions[Math.floor(Math.random() * pictureOptions.length)];
        let randomImg = `https://picsum.photos/id/${randomId}/286/180?grayscale`;
        return randomImg;
    },
    format_largeimg: () => {
      let pictureOptions = [201, 2, 366, 3, 370, 4, 445, 48, 532, 60, 668, 740];
      let randomId = pictureOptions[Math.floor(Math.random() * pictureOptions.length)];
      let randomLargeImg = `https://picsum.photos/id/${randomId}/1800/360?grayscale`;
      return randomLargeImg;
  },
  };