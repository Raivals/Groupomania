export const dateParser = (num) => {
    let options = {weekday: "long", year: "numeric", month: "short", day: "numeric"};

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return date.toString();
}

  //dans le back il y a une référence en ms qui permet de connaitre a date du commentaire
  export const timestampParser = (num) => {
    //note js date
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  }
  
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};