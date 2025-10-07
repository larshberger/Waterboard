// images.js
const icons = import.meta.glob('./icons/*.png', { eager: true });

const iconMap = Object.fromEntries(
  Object.entries(icons).map(([path, mod]) => {
    const key = parseInt(path.match(/(\d+)\.png$/)[1]); // henter tallet fra filnavnet
    return [key, mod.default];
  })
);

export default iconMap;
